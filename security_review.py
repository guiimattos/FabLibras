#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Security Review CLI
--------------------
Roda uma varredura de seguranca basica em qualquer projeto de codigo,
independente de qual ferramenta/IA foi usada para criar o projeto.

Uso:
    python3 security_review.py /caminho/do/projeto
    python3 security_review.py /caminho/do/projeto --output outro-nome.md
    python3 security_review.py /caminho/do/projeto --exclude pasta1 pasta2

Gera um arquivo `security-report.md` na pasta do projeto com os achados.
Nao corrige nada automaticamente -- apenas relata. Correcoes ficam a
criterio de quem revisar o relatorio (ex: pedir pro Claude/ChatGPT
gerar o diff de correcao a partir do relatorio).

Todo I/O de arquivo usa encoding="utf-8" explicitamente, para funcionar
igual em Windows, Mac e Linux (no Windows, open() sem encoding explicito
usa o encoding padrao do sistema -- ex: cp1252 -- que quebra ao tentar
escrever emojis/acentos).
"""

import argparse
import os
import re
import shutil
import subprocess
import sys
from datetime import datetime

SEVERITY_ORDER = ["CRITICO", "ALTO", "MEDIO", "BAIXO"]
SEVERITY_EMOJI = {"CRITICO": "[CRITICO]", "ALTO": "[ALTO]", "MEDIO": "[MEDIO]", "BAIXO": "[BAIXO]"}

# Nome deste proprio arquivo, para nunca escanear a si mesmo
# (evita falso positivo: as regex abaixo contem os proprios padroes
# que elas procuram, ex: a string "eval(" bate na regex de eval()).
SELF_FILENAME = os.path.basename(__file__)

# ---------------------------------------------------------------------------
# Padroes de segredos/credenciais expostas
# ---------------------------------------------------------------------------
SECRET_PATTERNS = [
    (r"(?i)(api[_-]?key|apikey)\s*[:=]\s*['\"][A-Za-z0-9_\-]{16,}['\"]", "Possivel chave de API hardcoded"),
    (r"(?i)(secret|token)\s*[:=]\s*['\"][A-Za-z0-9_\-]{16,}['\"]", "Possivel token/segredo hardcoded"),
    (r"(?i)password\s*[:=]\s*['\"].{4,}['\"]", "Possivel senha hardcoded"),
    (r"sk-[A-Za-z0-9]{20,}", "Formato compativel com chave de API da OpenAI/Anthropic exposta no codigo"),
    (r"AIza[0-9A-Za-z_\-]{35}", "Formato compativel com chave de API do Google exposta no codigo"),
    (r"AKIA[0-9A-Z]{16}", "Formato compativel com AWS Access Key ID exposta no codigo"),
    (r"gh[pousr]_[A-Za-z0-9]{36,}", "Formato compativel com token de acesso do GitHub exposto no codigo"),
    (r"xox[baprs]-[A-Za-z0-9\-]{10,}", "Formato compativel com token do Slack exposto no codigo"),
    (r"sk_live_[A-Za-z0-9]{20,}", "Formato compativel com chave live do Stripe exposta no codigo (produção)"),
    (r"pk_live_[A-Za-z0-9]{20,}", "Formato compativel com chave publica live do Stripe exposta no codigo"),
    (r"eyJ[A-Za-z0-9_\-]+\.[A-Za-z0-9_\-]+\.[A-Za-z0-9_\-]+", "Possivel JWT hardcoded no codigo (pode conter dados sensiveis no payload)"),
    (r"-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----", "Chave privada exposta diretamente no codigo"),
    (r"(?i)postgres(ql)?://[^:]+:[^@\s]+@", "String de conexao com banco contendo usuario e senha em texto puro"),
    (r"(?i)supabase.{0,20}(service_role|service[_-]?key)\s*[:=]\s*['\"][A-Za-z0-9_\-\.]{20,}['\"]", "Possivel chave de service_role do Supabase exposta (bypassa Row Level Security)"),
]

# ---------------------------------------------------------------------------
# Padroes de codigo arriscado (nao sao segredos, sao praticas inseguras)
# ---------------------------------------------------------------------------
RISKY_CODE_PATTERNS = [
    (r"(?i)shell\s*=\s*True", "ALTO", "Uso de shell=True em subprocess -- risco de injecao de comando"),
    (r"\beval\(", "ALTO", "Uso de eval() -- pode executar codigo arbitrario se a entrada nao for confiavel"),
    (r"\bexec\(", "ALTO", "Uso de exec() -- mesmo risco do eval()"),
    (r"dangerouslySetInnerHTML", "ALTO", "Uso de dangerouslySetInnerHTML no React -- risco de XSS se o conteudo vier de dado nao confiavel"),
    (r"(?i)select \* from .* \+ ", "CRITICO", "Possivel SQL montado por concatenacao de string -- risco de SQL injection"),
    (r"pickle\.loads?\(", "ALTO", "Uso de pickle para desserializar dados -- risco de execucao de codigo arbitrario se a fonte nao for confiavel"),
    (r"yaml\.load\((?!.*Loader\s*=\s*yaml\.SafeLoader)", "MEDIO", "yaml.load() sem SafeLoader -- pode executar codigo arbitrario dependendo do conteudo do YAML"),
    (r"os\.system\(", "MEDIO", "Uso de os.system() -- prefira subprocess com lista de argumentos (sem shell) para evitar injecao de comando"),
    (r"(?i)access-control-allow-origin['\"]?\s*:\s*['\"]\*['\"]", "MEDIO", "CORS liberado para qualquer origem ('*') -- avalie se isso e realmente necessario"),
    (r"(?i)\bdebug\s*=\s*True\b", "MEDIO", "Modo debug ativado -- nunca deve ir para producao (pode expor stack trace e dados internos)"),
    (r"(?i)verify\s*=\s*False", "ALTO", "Verificacao de certificado SSL desativada -- expõe a chamadas man-in-the-middle"),
    (r"(?i)\bmd5\(|hashlib\.md5", "MEDIO", "Uso de MD5 -- inseguro para hash de senha ou dado sensivel, considere bcrypt/argon2"),
    (r"(?i)\bsha1\(|hashlib\.sha1", "MEDIO", "Uso de SHA1 -- inseguro para hash de senha, considere bcrypt/argon2"),
    (r"(?i)csrf_exempt", "MEDIO", "Protecao CSRF desativada explicitamente nesta rota"),
    (r"(?i)random\.random\(\)|Math\.random\(\)", "BAIXO", "Gerador de numero aleatorio nao criptografico usado -- nao use para gerar tokens/senhas, prefira secrets/crypto"),
]

# ---------------------------------------------------------------------------
# Configuracao de varredura
# ---------------------------------------------------------------------------
SCAN_EXTENSIONS = {".py", ".js", ".jsx", ".ts", ".tsx", ".env", ".yml", ".yaml", ".json", ".php", ".rb", ".go"}
IGNORE_DIRS = {"node_modules", ".git", "dist", "build", "__pycache__", "venv", ".venv", ".next", "coverage"}
IGNORE_FILES = {SELF_FILENAME, "security-report.md"}


def find_files(root, extra_ignore_dirs=None):
    ignore_dirs = IGNORE_DIRS | set(extra_ignore_dirs or [])
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [d for d in dirnames if d not in ignore_dirs]
        for f in filenames:
            if f in IGNORE_FILES:
                continue
            if os.path.splitext(f)[1] in SCAN_EXTENSIONS:
                yield os.path.join(dirpath, f)


def mask_secret(line):
    """Evita colocar o segredo real no relatorio -- mostra so os primeiros/ultimos caracteres."""
    line = line.strip()
    if len(line) > 100:
        line = line[:100] + "..."
    return line


def scan_file_patterns(path):
    findings = []
    try:
        with open(path, "r", encoding="utf-8", errors="ignore") as fh:
            lines = fh.readlines()
    except Exception:
        return findings

    for i, line in enumerate(lines, start=1):
        for pattern, desc in SECRET_PATTERNS:
            if re.search(pattern, line):
                findings.append(("CRITICO", desc, path, i, mask_secret(line)))
        for pattern, severity, desc in RISKY_CODE_PATTERNS:
            if re.search(pattern, line):
                findings.append((severity, desc, path, i, mask_secret(line)))
    return findings


def tool_available(name):
    return shutil.which(name) is not None


def run_tool(cmd, cwd):
    """Roda uma ferramenta externa e devolve (sucesso, saida, motivo_falha)."""
    try:
        result = subprocess.run(cmd, cwd=cwd, capture_output=True, text=True, timeout=180)
        output = (result.stdout or "") + (result.stderr or "")
        # muitas dessas ferramentas retornam codigo != 0 quando ENCONTRAM problema
        # (nao e uma falha de execucao) -- entao so tratamos como "falha real"
        # se nao veio saida nenhuma.
        if not output.strip():
            return False, "", f"comando rodou mas nao retornou saida (codigo {result.returncode})"
        return True, output, None
    except FileNotFoundError:
        return False, "", "comando nao encontrado no PATH"
    except subprocess.TimeoutExpired:
        return False, "", "excedeu o tempo limite (180s)"
    except Exception as e:
        return False, "", str(e)


def check_env_file_committed(root):
    findings = []
    gitignore_path = os.path.join(root, ".gitignore")
    env_path = os.path.join(root, ".env")
    if os.path.exists(env_path):
        ignored = False
        if os.path.exists(gitignore_path):
            with open(gitignore_path, "r", encoding="utf-8", errors="ignore") as fh:
                if ".env" in fh.read():
                    ignored = True
        if not ignored:
            findings.append(("CRITICO", "Arquivo .env existe mas nao esta no .gitignore -- pode ser commitado com segredos", env_path, 0, ""))
    return findings


def check_exposed_git_folder(root):
    findings = []
    if os.path.isdir(os.path.join(root, ".git")):
        findings.append(("BAIXO", "Pasta .git presente no projeto -- confirme que ela nao vai parar no deploy publico (pode expor historico de commits)", os.path.join(root, ".git"), 0, ""))
    return findings


def check_supabase_rls(root):
    """Checagem heuristica: procura mencao a RLS/policies em projetos que usam Supabase."""
    findings = []
    uses_supabase = False
    has_policy_reference = False
    for f in find_files(root):
        if "supabase" in f.lower():
            uses_supabase = True
        try:
            with open(f, "r", encoding="utf-8", errors="ignore") as fh:
                content = fh.read()
                if re.search(r"(?i)row level security|create policy|enable rls", content):
                    has_policy_reference = True
        except Exception:
            continue
    if uses_supabase and not has_policy_reference:
        findings.append((
            "ALTO",
            "Projeto parece usar Supabase mas nao encontrei nenhuma referencia a Row Level Security (RLS) ou policies no codigo -- confirme manualmente se RLS esta habilitado nas tabelas com dado sensivel",
            "supabase (verificacao heuristica)", 0, ""
        ))
    return findings


def check_package_json_scripts(root):
    """Scripts postinstall/preinstall podem ser vetor de supply-chain attack."""
    findings = []
    pkg_path = os.path.join(root, "package.json")
    if os.path.exists(pkg_path):
        try:
            import json
            with open(pkg_path, "r", encoding="utf-8", errors="ignore") as fh:
                data = json.load(fh)
            scripts = data.get("scripts", {})
            for hook in ("preinstall", "postinstall"):
                if hook in scripts:
                    findings.append((
                        "BAIXO",
                        f"package.json tem um script '{hook}' -- confirme que o conteudo e confiavel (scripts de instalacao sao um vetor comum de ataques de supply chain)",
                        pkg_path, 0, scripts[hook]
                    ))
        except Exception:
            pass
    return findings


def main():
    parser = argparse.ArgumentParser(description="Revisao de seguranca de projetos de codigo.")
    parser.add_argument("project_path", help="Caminho do projeto a ser analisado")
    parser.add_argument("--output", default="security-report.md", help="Nome do arquivo de relatorio (padrao: security-report.md)")
    parser.add_argument("--exclude", nargs="*", default=[], help="Pastas extras para ignorar na varredura")
    args = parser.parse_args()

    root = os.path.abspath(args.project_path)
    if not os.path.isdir(root):
        print(f"Pasta nao encontrada: {root}")
        sys.exit(1)

    print(f"Escaneando {root} ...")

    findings = []
    findings += check_env_file_committed(root)
    findings += check_exposed_git_folder(root)
    findings += check_supabase_rls(root)
    findings += check_package_json_scripts(root)

    files = list(find_files(root, extra_ignore_dirs=args.exclude))
    for f in files:
        findings += scan_file_patterns(f)

    # ---- ferramentas externas ----
    tool_status = {}  # nome -> (instalado?, sucesso?, saida, motivo_falha)

    def try_tool(name, available, cmd):
        if not available:
            tool_status[name] = (False, False, "", "nao instalado")
            return
        print(f"Rodando {name}...")
        ok, out, reason = run_tool(cmd, root)
        tool_status[name] = (True, ok, out, reason)

    try_tool("gitleaks", tool_available("gitleaks"), ["gitleaks", "detect", "--source", root, "--no-git", "-v"])
    try_tool("semgrep", tool_available("semgrep"), ["semgrep", "--config=auto", root])

    if os.path.exists(os.path.join(root, "package.json")):
        try_tool("npm audit", tool_available("npm"), ["npm", "audit"])
    if os.path.exists(os.path.join(root, "requirements.txt")):
        try_tool("pip-audit", tool_available("pip-audit"), ["pip-audit", "-r", "requirements.txt"])

    # ---- montar relatorio ----
    by_severity = {s: [] for s in SEVERITY_ORDER}
    for item in findings:
        severity, desc, path, line = item[0], item[1], item[2], item[3]
        snippet = item[4] if len(item) > 4 else ""
        rel_path = os.path.relpath(path, root) if os.path.isabs(path) else path
        loc = f"{rel_path}:{line}" if line else rel_path
        entry = f"- **{desc}** -- `{loc}`"
        if snippet:
            entry += f"\n  - Trecho: `{snippet}`"
        by_severity[severity].append(entry)

    report_lines = []
    report_lines.append("# Relatorio de Revisao de Seguranca\n")
    report_lines.append(f"Data: {datetime.now().strftime('%Y-%m-%d %H:%M')}\n")
    report_lines.append(f"Projeto: `{root}`\n")
    report_lines.append(f"Arquivos analisados: {len(files)}\n")

    report_lines.append("\n## Status das ferramentas externas\n")
    if not tool_status:
        report_lines.append("- Nenhuma ferramenta externa aplicavel a este projeto (sem package.json/requirements.txt detectados).\n")
    for name, (installed, ok, out, reason) in tool_status.items():
        if not installed:
            report_lines.append(f"- **{name}**: nao instalado -- essa checagem foi pulada. (instale para uma varredura mais completa)")
        elif not ok:
            report_lines.append(f"- **{name}**: instalado, mas nao retornou resultado utilizavel ({reason})")
        else:
            report_lines.append(f"- **{name}**: rodou com sucesso, saida incluida abaixo")

    total = sum(len(v) for v in by_severity.values())
    report_lines.append(f"\n## Resumo\nTotal de achados (varredura por padrao de texto + heuristicas): {total}\n")
    report_lines.append(
        "\n> Nota: itens marcados como ALTO/CRITICO que vierem de regex podem incluir falsos positivos "
        "(ex: a palavra 'eval(' aparecendo dentro de um comentario, ou dentro de outra regex/lista de padroes "
        "como este proprio script). Sempre confira o trecho antes de agir.\n"
    )

    for sev in SEVERITY_ORDER:
        emoji = SEVERITY_EMOJI[sev]
        report_lines.append(f"\n### {emoji} {sev.capitalize()}")
        if by_severity[sev]:
            # remove duplicatas exatas mantendo ordem
            seen = set()
            unique = []
            for item in by_severity[sev]:
                if item not in seen:
                    seen.add(item)
                    unique.append(item)
            report_lines.extend(unique)
        else:
            report_lines.append("- Nenhum achado nesta categoria")

    for name, (installed, ok, out, reason) in tool_status.items():
        if installed and ok and out:
            report_lines.append(f"\n## Saida completa: {name}\n```\n{out.strip()[:4000]}\n```")

    report_lines.append(
        "\n## Observacoes\n"
        "- Este relatorio NAO substitui uma revisao de seguranca formal/pentest.\n"
        "- A varredura por padrao de texto pode gerar falsos positivos/negativos -- revise manualmente os achados criticos e altos antes de agir.\n"
        "- Para propor correcoes, cole este relatorio numa conversa com uma IA (Claude, ChatGPT etc.) e peca o diff de correcao item por item -- este script nao aplica nenhuma correcao sozinho.\n"
    )

    report_path = os.path.join(root, args.output)
    with open(report_path, "w", encoding="utf-8") as fh:
        fh.write("\n".join(report_lines))

    print(f"\nRelatorio gerado em: {report_path}")
    print(f"Total de achados: {total}")


if __name__ == "__main__":
    main()
