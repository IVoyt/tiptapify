# IA {#ai}

Utilisez cette démo avec n'importe quel fournisseur compatible OpenAI exposant `/v1/chat/completions`. Les champs du point de terminaison, du modèle et du jeton ne sont utilisés que pendant la session de cette page et ne sont pas enregistrés.

<InteractiveEditor
  ai-demo
  :items="['ai', '|', 'bold', 'italic', 'underline', '|', 'undo', 'redo']"
  placeholder="Écrivez ou collez du texte, puis utilisez le bouton IA de la barre d'outils..."
/>

## Mode point de terminaison backend {#backend-endpoint-mode}

Basculez le champ **Mode** sur **Backend endpoint** pour que tiptapify communique directement avec votre backend, sans `aiProvider` personnalisé. Il envoie une charge utile minimale (`prompt`, `instruction`, ainsi que les champs facultatifs `stream`, `thinking`, `reasoning_effort` et `model`) au point de terminaison, et accepte une réponse JSON simple, `{ content }` ou en streaming SSE — consultez le [guide IA](/fr/guide/ai#backend-generation-aiendpoint) pour le contrat complet.

## LM Studio en local {#local-lm-studio}

Pour LM Studio, utilisez un point de terminaison comme :

```txt
http://localhost:1234/v1/chat/completions
```

Si LM Studio s'exécute sur une autre machine, utilisez plutôt son hôte, par exemple :

```txt
http://192.168.0.107:1234/v1/chat/completions
```

Pour les démos dans le navigateur, utilisez un proxy de développement si votre fournisseur n'autorise pas CORS.
