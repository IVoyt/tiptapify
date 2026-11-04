# AI {#ai}

Ta predstavitev deluje s katerim koli ponudnikom, združljivim z OpenAI, ki podpira `/v1/chat/completions`. Polja za končno točko, model in žeton se uporabljajo samo v seji te strani in se ne shranjujejo.

<InteractiveEditor
  ai-demo
  :items="['ai', '|', 'bold', 'italic', 'underline', '|', 'undo', 'redo']"
  placeholder="Napišite ali prilepite besedilo, nato uporabite gumb AI v orodni vrstici..."
/>

## Način zaledne končne točke {#backend-endpoint-mode}

Polje **Način** preklopite na **Končna točka zaledja**, da Tiptapify komunicira neposredno z vašim zaledjem, brez lastnega `aiProvider`. Na končno točko pošlje minimalno vsebino (`prompt`, `instruction` ter neobvezna polja `stream`, `thinking`, `reasoning_effort`, `model`) in sprejme navaden JSON, `{ content }` ali pretočni odgovor SSE — celotno pogodbo najdete v [vodniku za AI](/sl/guide/ai#backend-generation-aiendpoint).

## Lokalni LM Studio {#local-lm-studio}

Za LM Studio uporabite končno točko, kot je:

```txt
http://localhost:1234/v1/chat/completions
```

Če LM Studio teče na drugem računalniku, uporabite tisti gostitelj, na primer:

```txt
http://192.168.0.107:1234/v1/chat/completions
```

Za predstavitve v brskalniku uporabite razvojni posredniški strežnik, če vaš ponudnik ne dovoljuje CORS.
