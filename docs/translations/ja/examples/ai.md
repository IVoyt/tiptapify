# AI {#ai}

このデモは、OpenAI 互換の `/v1/chat/completions` に対応していればどのプロバイダーでも使えます。エンドポイント、モデル、トークンの各フィールドはこのページのセッション中のみ使用され、保存されません。

<InteractiveEditor
  ai-demo
  :items="['ai', '|', 'bold', 'italic', 'underline', '|', 'undo', 'redo']"
  placeholder="テキストを入力または貼り付けて、AI ツールバーボタンを使ってみましょう..."
/>

## バックエンドエンドポイントモード {#backend-endpoint-mode}

**モード**フィールドを**バックエンドエンドポイント**に切り替えると、カスタムの `aiProvider` を使わずに tiptapify がバックエンドと直接やり取りします。最小限のペイロード（`prompt`、`instruction`、および任意の `stream`、`thinking`、`reasoning_effort`、`model` フィールド）をエンドポイントに POST し、プレーンな JSON、`{ content }`、または SSE ストリーミングのレスポンスを受け付けます。詳しい仕様は [AI ガイド](/ja/guide/ai#backend-generation-aiendpoint)をご覧ください。

## ローカルの LM Studio {#local-lm-studio}

LM Studio の場合は、次のようなエンドポイントを使います。

```txt
http://localhost:1234/v1/chat/completions
```

LM Studio が別のマシンで動いている場合は、そのホストを指定します。例:

```txt
http://192.168.0.107:1234/v1/chat/completions
```

ブラウザーベースのデモで、プロバイダーが CORS を許可していない場合は、開発用プロキシを使ってください。
