# AI-laajennus {#ai-extension}

AI-laajennus lisää työkalurivin painikkeen, joka avaa kehotedialogin, lähettää pyynnön valitsemallesi palveluntarjoajalle, näyttää suoratoistetun tuloksen ja lisää sen editoriin tilakohtaisella toimintopainikkeella (**Lisää** / **Korvaa valinta** / **Lisää loppuun**).

```vue
<Tiptapify
  :content="content"
  :items="['ai', '|', 'bold', 'italic']"
  :ai="{
    aiProvider,
    model: 'gpt-4.1-mini',
    stream: true,
  }"
/>
```

`ai`-propsi hyväksyy arvon `true` (asetukset oletusarvoilla) tai asetusobjektin (`TiptapifyAiOptions`). Työkalurivin `ai`-kohde on aina rekisteröity, mutta painike on **pois käytöstä**, ellei `aiProvider` ole asetettu.

Katso ajettava demo [AI-esimerkistä](/fi/examples/ai) ja täydellinen asetusviite [Props-sivulta](/fi/api/props#ai).

## Arkkitehtuuri {#architecture}

```
Tiptapify.vue            Toolbar item `ai`           Dialog.vue
  resolves the `ai`     ->  Button.vue               ->  builds the request
  prop into a resolved  ->  (disabled without        ->  calls aiProvider(request, context, stream)
  options object and    ->    aiProvider)           ->  streams chunks into result/reasoning fields
  provides it (inject   ->  opens the dialog        ->  the action button (Insert/Replace/Append) places the result into the editor
  'tiptapifyAi')
```

- `Tiptapify` normalisoi `ai`-propsin: `ai: true` muuttuu tyhjäksi asetusobjektiksi, `promptExamples` palaa lokalisoituihin oletuksiin, ja tulos annetaan jälkeläisille `inject('tiptapifyAi')`-kutsulla (`TiptapifyAiResolvedOptions` tai `false`).
- Työkalurivin kohde (`src/components/Toolbar/ai.ts`) piirtää `Button.vue`-komponentin. Painike tarkistaa `aiProvider`-palveluntarjoajan saatavuuden ja avaa `Dialog.vue`-komponentin.
- `Dialog.vue` omistaa koko pyynnön elinkaaren: pyynnön rakentamisen, palveluntarjoajan kutsun, suoratoiston ja tuloksen lisäämisen.

## Palveluntarjoajan sopimus {#the-provider-contract}

```ts
type TiptapifyAiProvider = (
  request: TiptapifyAiRequest,
  context: TiptapifyAiEditorContext,
  stream?: TiptapifyAiStream,
) => Promise<TiptapifyAiResponse | TiptapifyAiOpenAiResponse | string>
```

Palveluntarjoaja on tavallinen asynkroninen funktio, jonka toteutat itse. tiptapify ei kutsu mitään API:a itse — kaikki, mikä osaa käsitellä OpenAI-yhteensopivan `request`-objektin, kelpaa (fetch, SDK, backend-adapteri). Poikkeus on `aiEndpoint`-backend-tila (katso [Backend-generointi](#backend-generation-aiendpoint)), jossa tiptapify lähettää pyynnön päätepisteeseesi.

**Pyyntö** (`TiptapifyAiRequest`) levitetään `chatCompletionOptions`-asetuksistasi ja sitä täydentää sitten plugin:

| Kenttä | Lähde |
| --- | --- |
| `messages` | `createMessages(context)`, jos annettu, muuten oletuspari: järjestelmäviesti (oma `systemPrompt` tai sisäänrakennettu oletus) ja käyttäjäviesti, joka sisältää kehotteen sekä valitun editoritekstin ympäröivine teksteineen ja säännön vastata vain valinnasta (tai koko tekstistä, kun mitään ei ole valittu) |
| `model` | `model`-asetus, kun se on asetettu |
| `temperature` | `temperature`-asetus, kun se on asetettu |
| `stream` | `stream`-asetus tai `chatCompletionOptions.stream` |
| `enable_thinking` / `reasoning_effort` | pohdintakytkin / tasovalikko — katso alla |

**Konteksti** (`TiptapifyAiEditorContext`) antaa palveluntarjoajalle editorin koko tilan: `prompt`, `selectedText`, `textBefore` / `textAfter` (valinnan kappaleen teksti sen ympärillä, enintään 500 merkkiä kumpikin), `text`, `html`, `json` ja `mode` (`insert` / `replace` / `append`).

Valinta, joka alkaa tai päättyy sanan sisällä, ottaa koko sanan, ja oletusviestit lähettävät valinnan ympärillä olevan tekstin sekä säännön vastata vain valinnasta: pelkän katkelman saanut malli luulee sitä koko tekstiksi ja täydentää sen, ja korvaus toistaisi sen, mikä seuraa valintaa.

**Vastaus**: palveluntarjoaja voi palauttaa sisällön tavallisena `string`-arvona, muodossa `{ content }` (`TiptapifyAiResponse`) tai OpenAI-yhteensopivana `choices`-payloadina (`TiptapifyAiOpenAiResponse`). Dialogi poimii sisällön tässä järjestyksessä ja poistaa alusta tyhjät merkit. Hylkäyksen yhteydessä virheviesti näytetään dialogissa (tai `ai.error`, kun virhe ei ole `Error`-instanssi) ja dialogi pysyy auki.

## Backend-generointi (`aiEndpoint`) {#backend-generation-aiendpoint}

`aiProvider`-toteutuksen sijaan voit osoittaa AI-toiminnon backendin LLM-päätepisteeseen:

```ts
// example
const ai = {
  aiEndpoint: '/api/ai/generate',
  model: 'gpt-4.1-mini',
  stream: true,
}
```

tiptapify rakentaa sitten pyynnön ja lähettää sen päätepisteeseen itse. Erikseen annettu `aiProvider` voittaa aina, kun molemmat on asetettu.

**Pyyntö** — minimaalinen JSON-payload (`TiptapifyAiBackendRequest`):

| Kenttä | Lähetetään |
| --- | --- |
| `prompt` | aina — dialogiin kirjoitettu pyyntö |
| `instruction` | aina — oma `systemPrompt`, oman `createMessages`-funktion järjestelmäviesti tai sisäänrakennettu oletus |
| `stream` | vain kun `stream: true` |
| `thinking` | vain kun dialogin **Pohdinta**-kytkin on päällä |
| `reasoning_effort` | vain kun käyttäjä valitsi tason (ei `default`) |
| `model` | vain kun `model`-asetus on asetettu |

**Vastaus** — hyväksytään väljästi: tavallinen merkkijono, `{ content }`-objekti tai OpenAI-yhteensopiva `choices`-payload.

**Suoratoisto** — kun pyynnössä on `stream: true`, vastauksen runko luetaan SSE-virtana (`data:`-rivit, päättyen `data: [DONE]`). Hyväksytyt chunk-muodot:

- OpenAI-tyyli — `data: {"choices":[{"delta":{"content":"…", "reasoning_content":"…"}}]}`
- Yksinkertainen — `data: {"type":"content"|"reasoning","data":"…"}`
- Litteä — `data: {"content":"…","reasoning_content":"…"}`
- Pelkkä teksti — `data: some text` (ei-JSON-`data`-rivi on sisältö-chunk)

`content`-chunkit päivittävät tulos-kenttää `onChunk`-takaisinkutsun kautta, `reasoning_content`-chunkit syöttävät **Pohdinta**-paneelia `onReasoning`-takaisinkutsun kautta. Jos backend ohittaa `stream`-asetuksen ja vastaa tavallisella rungolla, sitä runkoa käytetään sen sijaan. **Pysäytä**-napsautus tai dialogin sulkeminen keskeyttää pyynnön; osittain suoratoistettu sisältö säilyy tulos-kentässä.

**Otsakkeet** — `aiHeaders` (`Record<string, string>`) yhdistetään otsakkeen `Content-Type: application/json` päälle. `aiHeaders`-kentän `Authorization`-otsake säilytetään sellaisenaan; muuten `tokenProvider`-funktion token lähetetään muodossa `Authorization: Bearer <token>`.

**Virheet** — ei-OK-vastaus tuo backendin virheviestin (JSON `{ error }` / `{ message }` tai raaka runko) näkyviin dialogissa.

## Suoratoisto {#streaming}

Kun `stream: true` (tai `chatCompletionOptions.stream` on `true`), dialogi antaa `TiptapifyAiStream`-objektin kolmantena argumenttina:

```ts
type TiptapifyAiStream = {
  signal: AbortSignal,
  onChunk: (chunk: string) => void,
  onReasoning: (chunk: string) => void,
}
```

- **`signal`** — anna se `fetch`-kutsulle (tai SDK-kutsullesi). Se keskeytyy, kun käyttäjä napsauttaa **Pysäytä** tai sulkee dialogin, joten käynnissä olevat pyynnöt eivät jää pyörimään.
- **`onChunk`** — lisää jokainen sisältö-chunk tulos-kenttään. Generoinnin aikana tulos-kenttä on vain luku -tilassa ja osittain suoratoistettu sisältö säilyy (voit pysäyttää ja sitten lisätä tai hylätä sen).
- **`onReasoning`** — välitä mallin päättely-/pohdintatuloste (esim. Qwenin/DeepSeekin/o-sarjan `reasoning_content`-delta) tuloksen yläpuolella olevaan laajennettavaan **Pohdinta**-paneeliin. Paneeli laajenee ja vierittyy automaattisesti suoratoiston aikana. Pohdintatuloste on vain näytettävää, eikä sitä koskaan lisätä editoriin.

Palveluntarjoajat, jotka eivät suoratoista, ohittavat `stream`-argumentin — se on valinnainen.

## Pohdinta ja pohdinnan taso {#thinking-and-reasoning-effort}

Kaksi dialogin käyttäjän säädintä vastaa pyynnön kenttiä. Molemmat otetaan käyttöön asetuksilla ja plugin omistaa ne — et aseta (etkä saa asettaa) näitä kenttiä itse `chatCompletionOptions`-asetuksissa.

- **`thinking: true`** näyttää **Pohdinta**-kytkimen (oletuksena päällä, nollautuu jokaisella dialogin avauksella). Plugin kirjoittaa kytkimen arvon pyyntöön muodossa `enable_thinking: true | false`.
- **`thinking` puuttuu tai `thinking: false`** piilottaa kytkimen, ja plugin lähettää `enable_thinking: false`, jolloin oletuksena pohtivat mallit eivät pohdi.
- **`reasoningEffort: { options, default? }`** näyttää **Pohdinnan taso** -pudotusvalikon. `options` luettelee tarjottavat mukautetut tasot (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`); laajennus lisää aina itse `default`-kohteen (pohdintatilan perustason), joten et koskaan luettele `default`-arvoa määrityksessäsi. `default`-kenttä esivalitsee yhden mukautetuista tasoistasi dialogin avautuessa — kun se puuttuu, `default` on esivalittu. Arvo nollautuu jokaisella avauksella. Pudotusvalikko piirretään vain, kun `options` on ei-tyhjä lista, `thinking` on käytössä ja Pohdinta-kytkin on päällä.
- **`showReasoning`** (oletus `false`) ohjaa laajennettavaa **Pohdinta**-paneelia, joka suoratoistaa mallin päättelyprosessin (`reasoning_content`-delta). Aseta `showReasoning: true` näyttääksesi paneelin pohdinnan pysyessä päällä — malli päättelee edelleen, tulos otetaan käyttöön samalla tavalla, vain vaihe vaiheelta etenevä päättely näytetään lisäksi.

Koska palveluntarjoajat (erityisesti vLLM/LM Studio) hylkäävät `enable_thinking`- ja `reasoning_effort`-kentät samassa pyynnössä, plugin lähettää täsmälleen toisen kahdesta:

| Tila | Pyynnön kenttä |
| --- | --- |
| Pohdinta päällä, taso = `default` (tai tasoa ei ole määritetty) | `enable_thinking` (kytkimestä) |
| Pohdinta päällä, taso = `low` / `medium` / `high` / `xhigh` / `max` | `reasoning_effort` (pudotusvalikosta); kytkin on pois käytöstä |
| Pohdinta pois (kytkin pois tai `thinking` ei ole käytössä määrityksessä) | `enable_thinking: false`; `reasoning_effort` ei lähde |

## Virheet {#errors}

Dialogi selittää epäonnistuneen pyynnön raa'an virheen näyttämisen sijaan ja lisää sen perään palvelun oman viestin:

| Mitä tapahtui | Selitys |
| --- | --- |
| Selain ei saanut vastausta (`Failed to fetch`, `NetworkError…`, `Load failed`) | Palvelu on alhaalla, tavoittamattomissa tai CORS esti vastauksen; selaimen konsoli kertoo, mikä |
| `401` / `403` | Tarkista API-avain tai käyttöoikeudet |
| `404` | Tarkista päätepisteen polku |
| `408` / `504` / aikakatkaisu | Palvelu ei vastannut ajoissa |
| `429` | Liikaa pyyntöjä |
| `5xx` | Palvelu ei ole käytettävissä (lataa mallia, varattu) |

`aiEndpoint`-tilassa tila tulee vastauksesta. Oma `aiProvider` saa samat selitykset heittämällä virheen, jossa on `status`:

```ts
if (!response.ok) {
  const body = await response.json().catch(() => null)
  throw Object.assign(new Error(body?.error?.message ?? ''), { status: response.status })
}
```

Mikä tahansa muu virhe näytetään omalla viestillään.

## Tuloksen lisääminen {#inserting-the-result}

Toimintopainikkeella — **Lisää**, **Korvaa valinta** tai **Lisää loppuun** tilasta riippuen — dialogi sijoittaa `result`-arvon editoriin:

- **Tila** — dialogin toimintopainike on jaettu painike. Pääosa ottaa tuloksen käyttöön esivalitussa tilassa (**Lisää** / **Korvaa valinta** / **Lisää loppuun**): `mode`-asetus esivalitsee sen, tai **Korvaa valinta**, kun tekstiä oli valittuna dialogia avattaessa, ja muuten **Lisää**. Pieni "lisää"-osa (⋮) painikkeen oikealla puolella avaa valikon muista tiloista — yhden napsautus ottaa tuloksen heti käyttöön siinä tilassa. **Lisää** sijoittaa tuloksen kohdistimen kohdalle, **Korvaa valinta** korvaa valitun tekstin (tallennettu, kun **Generoi** napsautettiin) ja **Lisää loppuun** lisää sen dokumentin loppuun.
- **Merkkiraja** — kun editori on määritetty `limit`-asetuksella (`CharacterCount`-laajennus hylkää kaikki muut kuin liittämistapahtumat, jotka kasvattaisivat dokumentin rajan yli), tulos-kentän alla näkyy `generated / limit` -merkkilaskuri (reaaliaikainen suoratoiston aikana, pehmeän punainen, kun raja ylittyisi) ja dialogi näyttää `ai.limit_exceeded`-varoituksen heti generoinnin jälkeen, kun tulos ylittäisi rajan. **Lisää**-painike ja sen vaihtoehtoisten tilojen valikko poistetaan silloin käytöstä: tulos otetaan käyttöön kokonaan tai ei lainkaan, joten sinun on lyhennettävä sitä ennen käyttöönottoa.