"""
ARQUIVO DE TESTE -- NAO E UM SEGREDO REAL.
Use isso so para confirmar que o workflow de seguranca (gitleaks/semgrep)
esta detectando corretamente. Depois de ver o resultado, DELETE este
arquivo e reverta o commit -- nao deixe isso no repositorio de verdade.
"""

# Teste 1: formato de chave da OpenAI/Anthropic (valor fake, nao funcional)
FAKE_API_KEY = "sk-test1234567890abcdefghijklmnopqrstuv"

# Teste 2: formato de AWS Access Key ID (valor fake, nao funcional)
FAKE_AWS_KEY = "AKIAFAKEEXAMPLE12345"

# Teste 3: senha hardcoded (proposital, para teste)
password = "SenhaDeTeste123!"

# Teste 4: uso de eval (pratica insegura, so para o scanner de codigo pegar)
def calcular(expressao_usuario):
    return eval(expressao_usuario)