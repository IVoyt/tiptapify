# AI {#ai}

Bu demoyu OpenAI uyumlu herhangi bir `/v1/chat/completions` sağlayıcısıyla kullanın. Uç nokta, model ve token alanları yalnızca bu sayfa oturumunda kullanılır ve saklanmaz.

<InteractiveEditor
  ai-demo
  :items="['ai', '|', 'bold', 'italic', 'underline', '|', 'undo', 'redo']"
  placeholder="Metin yazın veya yapıştırın, ardından AI araç çubuğu düğmesini kullanın..."
/>

## Backend uç noktası modu {#backend-endpoint-mode}

tiptapify'ın özel bir `aiProvider` olmadan doğrudan backend'inizle konuşmasını sağlamak için **Mod** alanını **Backend uç noktası** olarak değiştirin. Uç noktaya asgari bir yük (`prompt`, `instruction` ve isteğe bağlı `stream`, `thinking`, `reasoning_effort`, `model` alanları) gönderir; düz JSON, `{ content }` veya SSE akış yanıtını kabul eder — sözleşmenin tamamı için [AI kılavuzuna](/tr/guide/ai#backend-generation-aiendpoint) bakın.

## Yerel LM Studio {#local-lm-studio}

LM Studio için şuna benzer bir uç nokta kullanın:

```txt
http://localhost:1234/v1/chat/completions
```

LM Studio başka bir makinede çalışıyorsa bunun yerine o ana makineyi kullanın, örneğin:

```txt
http://192.168.0.107:1234/v1/chat/completions
```

Tarayıcı tabanlı demolarda, sağlayıcınız CORS'a izin vermiyorsa bir geliştirme proxy'si kullanın.
