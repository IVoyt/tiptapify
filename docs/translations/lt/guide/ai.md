# DI plėtinys {#ai-extension}

DI plėtinys prideda įrankių juostos mygtuką, kuris atidaro užklausos dialogą, siunčia užklausą jūsų pasirinktam tiekėjui, parodo srautu gaunamą rezultatą ir įterpia jį į redaktorių per režimui būdingą veiksmo mygtuką (**Įterpimas** / **Pakeisti** / **Pridėti pabaigoje**).

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

Savybė `ai` priima `true` (parinktys su numatytosiomis reikšmėmis) arba parinkčių objektą (`TiptapifyAiOptions`). Įrankių juostos elementas `ai` registruojamas visada, tačiau mygtukas yra **išjungtas**, nebent nustatytas `aiProvider`.

Veikiančią demonstraciją rasite [DI pavyzdyje](/lt/examples/ai), o pilną parinkčių nuorodą – skyriuje [Savybės](/lt/api/props#ai).

## Architektūra {#architecture}

```
Tiptapify.vue            Toolbar item `ai`           Dialog.vue
  resolves the `ai`     ->  Button.vue               ->  builds the request
  prop into a resolved  ->  (disabled without        ->  calls aiProvider(request, context, stream)
  options object and    ->    aiProvider)           ->  streams chunks into result/reasoning fields
  provides it (inject   ->  opens the dialog        ->  the action button (Insert/Replace/Append) places the result into the editor
  'tiptapifyAi')
```

- `Tiptapify` normalizuoja savybę `ai`: `ai: true` tampa tuščiu parinkčių objektu, `promptExamples` grįžta prie lokalizuotų numatytųjų reikšmių, o rezultatas pateikiamas palikuonims per `inject('tiptapifyAi')` (`TiptapifyAiResolvedOptions` arba `false`).
- Įrankių juostos elementas (`src/components/Toolbar/ai.ts`) atvaizduoja `Button.vue`. Mygtukas tikrina `aiProvider` prieinamumą ir atidaro `Dialog.vue`.
- `Dialog.vue` valdo visą užklausos gyvavimo ciklą: užklausos sudarymą, tiekėjo iškvietimą, srautinį perdavimą ir rezultato įterpimą.

## Tiekėjo sutartis {#the-provider-contract}

```ts
type TiptapifyAiProvider = (
  request: TiptapifyAiRequest,
  context: TiptapifyAiEditorContext,
  stream?: TiptapifyAiStream,
) => Promise<TiptapifyAiResponse | TiptapifyAiOpenAiResponse | string>
```

Tiekėjas yra paprasta asinchroninė funkcija, kurią įgyvendinate jūs. tiptapify pats jokio API nekviečia – tinka bet kas, kas gali apdoroti su OpenAI suderinamą `request` objektą (fetch, SDK, serverio adapteris). Išimtis yra serverio režimas `aiEndpoint` (žr. [Generavimas serveryje](#backend-generation-aiendpoint)), kai tiptapify siunčia užklausą jūsų galiniam taškui.

**Užklausa** (`TiptapifyAiRequest`) paskleidžiama iš jūsų `chatCompletionOptions`, tada papildoma įskiepio:

| Laukas | Šaltinis |
| --- | --- |
| `messages` | `createMessages(context)`, jei pateiktas, kitu atveju numatytoji pora: sisteminis pranešimas (jūsų `systemPrompt` arba įtaisytasis numatytasis) ir naudotojo pranešimas, kuriame yra užklausa, pažymėtas redaktoriaus tekstas su tekstu aplink jį ir taisyklė atsakyti tik dėl pažymėtos dalies (arba dėl viso teksto, kai nieko nepažymėta) |
| `model` | parinktis `model`, kai nustatyta |
| `temperature` | parinktis `temperature`, kai nustatyta |
| `stream` | parinktis `stream` arba `chatCompletionOptions.stream` |
| `enable_thinking` / `reasoning_effort` | mąstymo jungiklis / lygio išskleidžiamasis sąrašas – žr. toliau |

**Kontekstas** (`TiptapifyAiEditorContext`) suteikia tiekėjui pilną redaktoriaus būseną: `prompt`, `selectedText`, `textBefore` / `textAfter` (pažymėtos dalies pastraipos tekstas aplink ją, iki 500 simbolių kiekvienoje pusėje), `text`, `html`, `json` ir `mode` (`insert` / `replace` / `append`).

Žodžio viduje prasidedantis ar pasibaigiantis pažymėjimas apima visą žodį, o numatytieji pranešimai siunčia tekstą aplink pažymėtą dalį su taisykle atsakyti tik dėl pažymėtos dalies: gavęs tik fragmentą, modelis palaiko jį visu tekstu ir jį užbaigia, o pakeitimas pakartotų tai, kas eina po pažymėtos dalies.

**Atsakymas**: tiekėjas gali grąžinti turinį kaip paprastą `string`, kaip `{ content }` (`TiptapifyAiResponse`) arba kaip su OpenAI suderinamą `choices` apkrovą (`TiptapifyAiOpenAiResponse`). Dialogas turinį išgauna šia tvarka ir nukerpa pradinius tarpus. Įvykus atmetimui, dialoge rodomas klaidos pranešimas (arba `ai.error`, kai klaida nėra `Error` egzempliorius), ir dialogas lieka atidarytas.

## Generavimas serveryje (`aiEndpoint`) {#backend-generation-aiendpoint}

Užuot įgyvendinę `aiProvider`, nukreipkite DI funkciją į serverio LLM galinį tašką:

```ts
// example
const ai = {
  aiEndpoint: '/api/ai/generate',
  model: 'gpt-4.1-mini',
  stream: true,
}
```

Tada tiptapify pats sudaro užklausą ir išsiunčia ją į galinį tašką. Aiškiai nurodytas `aiProvider` visada turi pirmenybę, kai nustatyta abu.

**Užklausa** – minimali JSON apkrova (`TiptapifyAiBackendRequest`):

| Laukas | Siunčiama |
| --- | --- |
| `prompt` | visada – dialoge įvesta užklausa |
| `instruction` | visada – jūsų `systemPrompt`, pasirinktinio `createMessages` sisteminis pranešimas arba įtaisytasis numatytasis |
| `stream` | tik kai `stream: true` |
| `thinking` | tik kai dialogo jungiklis **Mąstymas** įjungtas |
| `reasoning_effort` | tik kai naudotojas pasirinko lygį (ne `default`) |
| `model` | tik kai nustatyta parinktis `model` |

**Atsakymas** – priimamas lanksčiai: paprasta eilutė, objektas `{ content }` arba su OpenAI suderinama `choices` apkrova.

**Srautinis perdavimas** – kai užklausa turi `stream: true`, atsakymo turinys skaitomas kaip SSE srautas (`data:` eilutės, užbaigiamos `data: [DONE]`). Priimami šie dalių formatai:

- OpenAI stiliaus — `data: {"choices":[{"delta":{"content":"…", "reasoning_content":"…"}}]}`
- Paprastas — `data: {"type":"content"|"reasoning","data":"…"}`
- Plokščias — `data: {"content":"…","reasoning_content":"…"}`
- Paprastas tekstas — `data: some text` (ne JSON `data` eilutė yra turinio dalis)

`content` dalys atnaujina rezultato lauką per `onChunk`, `reasoning_content` dalys maitina skydelį **Mąstymas** per `onReasoning`. Jei serveris ignoruoja `stream` ir atsako paprastu turiniu, naudojamas tas turinys. Paspaudus **Sustabdyti** arba uždarius dialogą, užklausa nutraukiama; iš dalies gautas turinys paliekamas rezultato lauke.

**Antraštės** – `aiHeaders` (`Record<string, string>`) suliejamos virš `Content-Type: application/json`. `Authorization` antraštė iš `aiHeaders` paliekama tokia, kokia yra; kitu atveju prieigos raktas iš `tokenProvider` siunčiamas kaip `Authorization: Bearer <token>`.

**Klaidos** – ne OK atsakymas dialoge parodo serverio klaidos pranešimą (JSON `{ error }` / `{ message }` arba neapdorotą turinį).

## Srautinis perdavimas {#streaming}

Kai `stream: true` (arba `chatCompletionOptions.stream` yra `true`), dialogas kaip trečiąjį argumentą perduoda `TiptapifyAiStream` objektą:

```ts
type TiptapifyAiStream = {
  signal: AbortSignal,
  onChunk: (chunk: string) => void,
  onReasoning: (chunk: string) => void,
}
```

- **`signal`** – perduokite jį `fetch` (arba savo SDK iškvietimui). Jis nutraukiamas, kai naudotojas paspaudžia **Sustabdyti** arba uždaro dialogą, todėl vykdomos užklausos nebetęsiamos.
- **`onChunk`** – pridėkite kiekvieną turinio dalį prie rezultato lauko. Generuojant rezultato laukas yra tik skaitymo, o iš dalies gautas turinys išsaugomas (galite sustabdyti, tada įterpti arba atmesti).
- **`onReasoning`** – persiųskite modelio samprotavimo / mąstymo išvestį (pvz., Qwen/DeepSeek/o serijos `reasoning_content` delta) į sutraukiamą skydelį **Mąstymas** virš rezultato. Skydelis perdavimo metu automatiškai išsiplečia ir automatiškai slenka. Samprotavimo išvestis skirta tik rodymui ir niekada neįterpiama į redaktorių.

Tiekėjai, kurie nesrautuoja, `stream` argumentą ignoruoja – jis neprivalomas.

## Mąstymas ir mąstymo lygis {#thinking-and-reasoning-effort}

Du dialogo naudotojo valdikliai atitinka užklausos laukus. Abu įjungiami parinktimis ir priklauso įskiepiui – šių laukų patys `chatCompletionOptions` nenustatote (ir nedera nustatyti).

- **`thinking: true`** parodo jungiklį **Mąstymas** (pagal numatytuosius nustatymus įjungtas, kiekvieną kartą atidarius dialogą atstatomas). Įskiepis jungiklio reikšmę įrašo į užklausą kaip `enable_thinking: true | false`.
- **Nenurodytas `thinking` arba `thinking: false`** paslepia jungiklį, o įskiepis siunčia `enable_thinking: false`, todėl modeliai, kurie pagal numatytuosius nustatymus mąsto, nemąsto.
- **`reasoningEffort: { options, default? }`** parodo išskleidžiamąjį sąrašą **Mąstymo lygis**. `options` išvardija pasirinktinius lygius, kuriuos norite pasiūlyti (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`); plėtinys pats visada prideda elementą `default` (mąstymo režimo bazinį lygį), todėl `default` savo konfigūracijoje niekada neišvardijate. Laukas `default` iš anksto pasirenka vieną iš jūsų pasirinktinių lygių atidarius dialogą – kai nenurodytas, iš anksto pasirenkamas `default`. Reikšmė atstatoma kiekvieną kartą atidarius. Išskleidžiamasis sąrašas atvaizduojamas tik tada, kai `options` yra netuščias sąrašas, `thinking` įjungtas ir jungiklis Mąstymas yra įjungtas.
- **`showReasoning`** (numatytasis `false`) valdo sutraukiamą skydelį **Mąstymas**, kuriame srautu rodomas modelio samprotavimo procesas (`reasoning_content` delta). Nustatykite `showReasoning: true`, kad skydelis būtų rodomas ir mąstymas liktų įjungtas – modelis vis tiek samprotauja, rezultatas taikomas taip pat, tik papildomai rodomas žingsnis po žingsnio samprotavimas.

Kadangi tiekėjai (ypač vLLM/LM Studio) vienoje užklausoje atmeta ir `enable_thinking`, ir `reasoning_effort`, įskiepis siunčia lygiai vieną iš dviejų:

| Būsena | Užklausos laukas |
| --- | --- |
| Mąstymas įjungtas, lygis = `default` (arba lygis nesukonfigūruotas) | `enable_thinking` (iš jungiklio) |
| Mąstymas įjungtas, lygis = `low` / `medium` / `high` / `xhigh` / `max` | `reasoning_effort` (iš išskleidžiamojo sąrašo); jungiklis išjungtas |
| Mąstymas išjungtas (jungiklis išjungtas arba `thinking` konfigūracijoje neįjungtas) | `enable_thinking: false`; `reasoning_effort` nesiunčiamas |

## Klaidos {#errors}

Nepavykusią užklausą dialogas paaiškina, užuot rodęs neapdorotą klaidą, ir po paaiškinimo prideda paties serviso pranešimą:

| Kas įvyko | Paaiškinimas |
| --- | --- |
| Naršyklė negavo atsakymo (`Failed to fetch`, `NetworkError…`, `Load failed`) | Paslauga neveikia, nepasiekiama arba CORS užblokavo atsakymą; priežastį rodo naršyklės konsolė |
| `401` / `403` | Patikrinkite API raktą arba prieigos teises |
| `404` | Patikrinkite galinio taško kelią |
| `408` / `504` / skirtasis laikas | Paslauga neatsakė laiku |
| `429` | Per daug užklausų |
| `5xx` | Paslauga nepasiekiama (įkelia modelį, užimta) |

Naudojant `aiEndpoint`, būsena imama iš atsakymo. Pasirinktinis `aiProvider` gauna tuos pačius paaiškinimus, išmesdamas klaidą su `status`:

```ts
if (!response.ok) {
  const body = await response.json().catch(() => null)
  throw Object.assign(new Error(body?.error?.message ?? ''), { status: response.status })
}
```

Bet kuri kita klaida rodoma su jos pačios pranešimu.

## Rezultato įterpimas {#inserting-the-result}

Paspaudus veiksmo mygtuką – **Įterpimas**, **Pakeisti** arba **Pridėti pabaigoje**, priklausomai nuo režimo – dialogas `result` patalpina į redaktorių:

- **Režimas** – dialogo veiksmo mygtukas yra skaidomasis mygtukas. Pagrindinė dalis pritaiko rezultatą iš anksto pasirinktu režimu (**Įterpimas** / **Pakeisti** / **Pridėti pabaigoje**): jį iš anksto parenka parinktis `mode`, arba **Pakeisti**, kai atidarant dialogą buvo pažymėtas tekstas, o kitu atveju **Įterpimas**. Maža „daugiau“ (⋮) dalis mygtuko dešinėje atidaro likusių režimų meniu – spustelėjus vieną, rezultatas iškart pritaikomas tuo režimu. **Įterpimas** padeda rezultatą žymeklio vietoje, **Pakeisti** pakeičia pažymėtą tekstą (užfiksuotą paspaudus **Generuoti**), o **Pridėti pabaigoje** prideda jį dokumento pabaigoje.
- **Simbolių limitas** – kai redaktorius sukonfigūruotas su `limit` (plėtinys `CharacterCount` atmeta bet kokią ne įklijavimo transakciją, dėl kurios dokumentas viršytų limitą), po rezultato lauku rodomas simbolių skaitiklis `generated / limit` (generuojant atnaujinamas gyvai, švelniai raudonas, kai limitas būtų viršytas), o dialogas iškart po generavimo parodo įspėjimą `ai.limit_exceeded`, jei rezultatas viršytų limitą. Tada mygtukas **Įterpimas** ir jo alternatyvių režimų meniu išjungiami: rezultatas pritaikomas viskas arba nieko, todėl prieš taikant jį reikia sutrumpinti.