# DI {#ai}

Naudokite šią demonstraciją su bet kuriuo su OpenAI suderinamu `/v1/chat/completions` tiekėju. Galinio taško, modelio ir prieigos rakto laukai naudojami tik šio puslapio sesijos metu ir nėra saugomi.

<InteractiveEditor
  ai-demo
  :items="['ai', '|', 'bold', 'italic', 'underline', '|', 'undo', 'redo']"
  placeholder="Parašykite arba įklijuokite tekstą, tada naudokite DI mygtuką įrankių juostoje..."
/>

## Serverio galinio taško režimas {#backend-endpoint-mode}

Perjunkite lauką **Režimas** į **Serverio galinis taškas**, kad tiptapify kalbėtų tiesiogiai su jūsų serveriu, be pasirinktinio `aiProvider`. Jis siunčia minimalią apkrovą (`prompt`, `instruction` ir neprivalomus laukus `stream`, `thinking`, `reasoning_effort`, `model`) į galinį tašką ir priima paprastą JSON, `{ content }` arba SSE srautinį atsakymą – visą sutartį rasite [DI vadove](/lt/guide/ai#backend-generation-aiendpoint).

## Vietinis LM Studio {#local-lm-studio}

LM Studio atveju naudokite tokį galinį tašką:

```txt
http://localhost:1234/v1/chat/completions
```

Jei LM Studio veikia kitame kompiuteryje, naudokite tą kompiuterį, pavyzdžiui:

```txt
http://192.168.0.107:1234/v1/chat/completions
```

Naršyklėje veikiančioms demonstracijoms naudokite kūrimo tarpinį serverį (proxy), jei jūsų tiekėjas neleidžia CORS.
