# IA {#ai}

Utilize esta demonstração com qualquer fornecedor compatível com OpenAI que disponibilize `/v1/chat/completions`. Os campos de endpoint, modelo e token são usados apenas durante a sessão desta página e não são guardados.

<InteractiveEditor
  ai-demo
  :items="['ai', '|', 'bold', 'italic', 'underline', '|', 'undo', 'redo']"
  placeholder="Escreva ou cole texto e, em seguida, utilize o botão de IA da barra de ferramentas..."
/>

## Modo de endpoint do backend {#backend-endpoint-mode}

Altere o campo **Modo** para **Endpoint do backend** para que o tiptapify comunique diretamente com o seu backend, sem um `aiProvider` personalizado. Envia um payload mínimo (`prompt`, `instruction` e os campos opcionais `stream`, `thinking`, `reasoning_effort`, `model`) para o endpoint e aceita uma resposta em JSON simples, `{ content }` ou em streaming SSE — consulte o [guia de IA](/pt/guide/ai#backend-generation-aiendpoint) para o contrato completo.

## LM Studio local {#local-lm-studio}

No caso do LM Studio, utilize um endpoint como:

```txt
http://localhost:1234/v1/chat/completions
```

Se o LM Studio estiver a ser executado noutra máquina, utilize o respetivo anfitrião, por exemplo:

```txt
http://192.168.0.107:1234/v1/chat/completions
```

Em demonstrações executadas no navegador, utilize um proxy de desenvolvimento se o seu fornecedor não permitir CORS.
