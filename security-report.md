# Relatorio de Revisao de Seguranca

Data: 2026-07-06 11:12

Projeto: `C:\Users\guilherme.mattos\FabLibras-1`

Arquivos analisados: 70


## Status das ferramentas externas

- **gitleaks**: nao instalado -- essa checagem foi pulada. (instale para uma varredura mais completa)
- **semgrep**: nao instalado -- essa checagem foi pulada. (instale para uma varredura mais completa)
- **npm audit**: instalado, mas nao retornou resultado utilizavel (comando nao encontrado no PATH)

## Resumo
Total de achados (varredura por padrao de texto + heuristicas): 4


> Nota: itens marcados como ALTO/CRITICO que vierem de regex podem incluir falsos positivos (ex: a palavra 'eval(' aparecendo dentro de um comentario, ou dentro de outra regex/lista de padroes como este proprio script). Sempre confira o trecho antes de agir.


### [CRITICO] Critico
- Nenhum achado nesta categoria

### [ALTO] Alto
- **Uso de dangerouslySetInnerHTML no React -- risco de XSS se o conteudo vier de dado nao confiavel** -- `src\components\ui\chart.tsx:66`
  - Trecho: `// (e.g. via "</style><img onerror=...>") when set through dangerouslySetInnerHTML.`
- **Uso de dangerouslySetInnerHTML no React -- risco de XSS se o conteudo vier de dado nao confiavel** -- `src\components\ui\chart.tsx:81`
  - Trecho: `dangerouslySetInnerHTML={{`

### [MEDIO] Medio
- Nenhum achado nesta categoria

### [BAIXO] Baixo
- **Pasta .git presente no projeto -- confirme que ela nao vai parar no deploy publico (pode expor historico de commits)** -- `.git`
- **Gerador de numero aleatorio nao criptografico usado -- nao use para gerar tokens/senhas, prefira secrets/crypto** -- `src\components\ui\sidebar.tsx:643`
  - Trecho: `return `${Math.floor(Math.random() * 40) + 50}%`;`

## Observacoes
- Este relatorio NAO substitui uma revisao de seguranca formal/pentest.
- A varredura por padrao de texto pode gerar falsos positivos/negativos -- revise manualmente os achados criticos e altos antes de agir.
- Para propor correcoes, cole este relatorio numa conversa com uma IA (Claude, ChatGPT etc.) e peca o diff de correcao item por item -- este script nao aplica nenhuma correcao sozinho.
