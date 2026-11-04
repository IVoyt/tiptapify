# IA {#ai}

Use esta demo com qualquer provedor compatível com `/v1/chat/completions` da OpenAI. Os campos de endpoint, modelo e token são usados apenas durante esta sessão da página e não são armazenados.

<InteractiveEditor
  ai-demo
  :items="['ai', '|', 'bold', 'italic', 'underline', '|', 'undo', 'redo']"
  placeholder="Escreva ou cole um texto e use o botão de IA da barra de ferramentas..."
/>

## Modo de endpoint de backend {#backend-endpoint-mode}

Mude o campo **Modo** para **Endpoint de backend** para que o tiptapify se comunique diretamente com o seu backend, sem um `aiProvider` personalizado. Ele envia um payload mínimo (`prompt`, `instruction` e os campos opcionais `stream`, `thinking`, `reasoning_effort`, `model`) ao endpoint e aceita uma resposta JSON simples, `{ content }` ou em streaming SSE — veja o [guia de IA](/pt-br/guide/ai#backend-generation-aiendpoint) para o contrato completo.

## LM Studio local {#local-lm-studio}

Para o LM Studio, use um endpoint como:

```txt
http://localhost:1234/v1/chat/completions
```

Se o LM Studio estiver em outra máquina, use esse host no lugar, por exemplo:

```txt
http://192.168.0.107:1234/v1/chat/completions
```

Em demos executadas no navegador, use um proxy de desenvolvimento se o seu provedor não permitir CORS.
