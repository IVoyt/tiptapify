# Rozszerzenie AI {#ai-extension}

Rozszerzenie AI dodaje przycisk paska narzędzi, który otwiera okno zapytania, wysyła żądanie do wybranego przez Ciebie dostawcy, pokazuje wynik przesyłany strumieniowo i wstawia go do edytora za pomocą przycisku akcji zależnego od trybu (**Wstaw** / **Zastąp zaznaczenie** / **Dodaj na końcu**).

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

Właściwość `ai` przyjmuje `true` (opcje z wartościami domyślnymi) lub obiekt opcji (`TiptapifyAiOptions`). Element paska narzędzi `ai` jest zawsze rejestrowany, ale przycisk jest **wyłączony**, dopóki nie ustawisz `aiProvider`.

Działające demo znajdziesz w [przykładzie AI](/pl/examples/ai), a pełny opis opcji we [właściwościach](/pl/api/props#ai).

## Architektura {#architecture}

```
Tiptapify.vue            Toolbar item `ai`           Dialog.vue
  resolves the `ai`     ->  Button.vue               ->  builds the request
  prop into a resolved  ->  (disabled without        ->  calls aiProvider(request, context, stream)
  options object and    ->    aiProvider)           ->  streams chunks into result/reasoning fields
  provides it (inject   ->  opens the dialog        ->  the action button (Insert/Replace/Append) places the result into the editor
  'tiptapifyAi')
```

- `Tiptapify` normalizuje właściwość `ai`: `ai: true` staje się pustym obiektem opcji, `promptExamples` wraca do zlokalizowanych wartości domyślnych, a wynik jest udostępniany komponentom potomnym przez `inject('tiptapifyAi')` (`TiptapifyAiResolvedOptions` lub `false`).
- Element paska narzędzi (`src/components/Toolbar/ai.ts`) renderuje `Button.vue`. Przycisk sprawdza dostępność `aiProvider` i otwiera `Dialog.vue`.
- `Dialog.vue` odpowiada za cały cykl życia żądania: zbudowanie żądania, wywołanie dostawcy, strumieniowanie i wstawienie wyniku.

## Kontrakt dostawcy {#the-provider-contract}

```ts
type TiptapifyAiProvider = (
  request: TiptapifyAiRequest,
  context: TiptapifyAiEditorContext,
  stream?: TiptapifyAiStream,
) => Promise<TiptapifyAiResponse | TiptapifyAiOpenAiResponse | string>
```

Dostawca to zwykła funkcja asynchroniczna, którą implementujesz. tiptapify sam nie wywołuje żadnego API — działa wszystko, co potrafi obsłużyć obiekt `request` zgodny z OpenAI (fetch, SDK, adapter backendu). Wyjątkiem jest tryb backendu `aiEndpoint` (zobacz [Generowanie przez backend](#backend-generation-aiendpoint)), w którym tiptapify wysyła żądanie do Twojego endpointu.

**Żądanie** (`TiptapifyAiRequest`) jest rozwijane z Twoich `chatCompletionOptions`, a następnie uzupełniane przez wtyczkę:

| Pole | Źródło |
| --- | --- |
| `messages` | `createMessages(context)`, jeśli podano, w przeciwnym razie domyślna para: komunikat systemowy (Twój `systemPrompt` lub wbudowany domyślny) i komunikat użytkownika zawierający zapytanie oraz zaznaczony tekst edytora wraz z tekstem wokół niego i regułą, by odpowiadać tylko dla zaznaczenia (lub dla całego tekstu, gdy nic nie jest zaznaczone) |
| `model` | opcja `model`, jeśli ustawiona |
| `temperature` | opcja `temperature`, jeśli ustawiona |
| `stream` | opcja `stream` lub `chatCompletionOptions.stream` |
| `enable_thinking` / `reasoning_effort` | przełącznik rozmyślania / lista stopnia rozumowania — zobacz niżej |

**Kontekst** (`TiptapifyAiEditorContext`) daje dostawcy pełny stan edytora: `prompt`, `selectedText`, `textBefore` / `textAfter` (tekst akapitu z zaznaczeniem wokół niego, do 500 znaków z każdej strony), `text`, `html`, `json` oraz `mode` (`insert` / `replace` / `append`).

Zaznaczenie, które zaczyna się lub kończy wewnątrz słowa, obejmuje całe słowo, a domyślne komunikaty wysyłają tekst wokół zaznaczenia wraz z regułą, by odpowiadać tylko dla zaznaczenia: dostając sam fragment, model bierze go za cały tekst i go uzupełnia, a zastąpienie powtórzyłoby to, co następuje po zaznaczeniu.

**Odpowiedź**: dostawca może zwrócić treść jako zwykły `string`, jako `{ content }` (`TiptapifyAiResponse`) albo jako ładunek `choices` zgodny z OpenAI (`TiptapifyAiOpenAiResponse`). Okno wyodrębnia treść w tej kolejności i obcina początkowe białe znaki. Przy odrzuceniu komunikat błędu jest pokazywany w oknie (lub `ai.error`, gdy błąd nie jest instancją `Error`), a okno pozostaje otwarte.

## Generowanie przez backend (`aiEndpoint`) {#backend-generation-aiendpoint}

Zamiast implementować `aiProvider`, możesz skierować funkcję AI na endpoint backendowego LLM:

```ts
// example
const ai = {
  aiEndpoint: '/api/ai/generate',
  model: 'gpt-4.1-mini',
  stream: true,
}
```

tiptapify sam buduje wtedy żądanie i wysyła je do endpointu. Jawny `aiProvider` zawsze ma pierwszeństwo, gdy ustawiono oba.

**Żądanie** — minimalny ładunek JSON (`TiptapifyAiBackendRequest`):

| Pole | Wysyłane |
| --- | --- |
| `prompt` | zawsze — zapytanie wpisane w oknie |
| `instruction` | zawsze — Twój `systemPrompt`, komunikat systemowy własnego `createMessages` lub wbudowany domyślny |
| `stream` | tylko gdy `stream: true` |
| `thinking` | tylko gdy przełącznik **Rozmyślanie** w oknie jest włączony |
| `reasoning_effort` | tylko gdy użytkownik wybrał poziom (inny niż `default`) |
| `model` | tylko gdy ustawiono opcję `model` |

**Odpowiedź** — przyjmowana tolerancyjnie: zwykły ciąg znaków, obiekt `{ content }` lub ładunek `choices` zgodny z OpenAI.

**Strumieniowanie** — gdy żądanie ma `stream: true`, treść odpowiedzi jest czytana jako strumień SSE (wiersze `data:`, zakończone `data: [DONE]`). Akceptowane formaty fragmentów:

- W stylu OpenAI — `data: {"choices":[{"delta":{"content":"…", "reasoning_content":"…"}}]}`
- Prosty — `data: {"type":"content"|"reasoning","data":"…"}`
- Płaski — `data: {"content":"…","reasoning_content":"…"}`
- Zwykły tekst — `data: some text` (wiersz `data` niebędący JSON to fragment treści)

Fragmenty `content` aktualizują pole wyniku przez `onChunk`, a fragmenty `reasoning_content` zasilają panel **Rozmyślanie** przez `onReasoning`. Jeśli backend ignoruje `stream` i odpowiada zwykłą treścią, używana jest ta treść. Kliknięcie **Zatrzymaj** lub zamknięcie okna przerywa żądanie; częściowo przesłana treść pozostaje w polu wyniku.

**Nagłówki** — `aiHeaders` (`Record<string, string>`) są scalane z `Content-Type: application/json`. Nagłówek `Authorization` w `aiHeaders` jest zachowywany bez zmian; w przeciwnym razie token z `tokenProvider` jest wysyłany jako `Authorization: Bearer <token>`.

**Błędy** — odpowiedź inna niż OK pokazuje w oknie komunikat błędu backendu (JSON `{ error }` / `{ message }` lub surowa treść).

## Strumieniowanie {#streaming}

Gdy `stream: true` (lub `chatCompletionOptions.stream` ma wartość `true`), okno przekazuje obiekt `TiptapifyAiStream` jako trzeci argument:

```ts
type TiptapifyAiStream = {
  signal: AbortSignal,
  onChunk: (chunk: string) => void,
  onReasoning: (chunk: string) => void,
}
```

- **`signal`** — przekaż go do `fetch` (lub wywołania SDK). Przerywa się, gdy użytkownik kliknie **Zatrzymaj** lub zamknie okno, więc żądania w toku nie działają dalej.
- **`onChunk`** — dołączaj każdy fragment treści do pola wyniku. Podczas generowania pole wyniku jest tylko do odczytu, a częściowo przesłana treść jest zachowywana (możesz zatrzymać, a potem wstawić ją lub odrzucić).
- **`onReasoning`** — przekazuj dane rozumowania/myślenia modelu (np. delta `reasoning_content` w Qwen/DeepSeek/serii o) do zwijanego panelu **Rozmyślanie** nad wynikiem. Panel automatycznie rozwija się i przewija podczas strumieniowania. Dane rozumowania służą tylko do wyświetlania i nigdy nie są wstawiane do edytora.

Dostawcy, którzy nie strumieniują, ignorują argument `stream` — jest opcjonalny.

## Rozmyślanie i stopień rozumowania {#thinking-and-reasoning-effort}

Dwa elementy sterujące użytkownika w oknie odpowiadają polom żądania. Oba są włączane opcjami i należą do wtyczki — nie ustawiaj (i nie powinieneś ustawiać) tych pól samodzielnie w `chatCompletionOptions`.

- **`thinking: true`** pokazuje przełącznik **Rozmyślanie** (domyślnie włączony, resetowany przy każdym otwarciu okna). Wtyczka zapisuje wartość przełącznika w żądaniu jako `enable_thinking: true | false`.
- **`thinking` nieustawione lub `thinking: false`** ukrywa przełącznik, a wtyczka wysyła `enable_thinking: false`, więc modele, które domyślnie myślą, nie myślą.
- **`reasoningEffort: { options, default? }`** pokazuje listę rozwijaną **Stopień rozumowania**. `options` wymienia własne poziomy, które chcesz zaoferować (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`); rozszerzenie zawsze samo dodaje element `default` (bazowy poziom trybu myślenia), więc nigdy nie wymieniasz `default` w konfiguracji. Pole `default` wstępnie wybiera jeden z Twoich własnych poziomów przy otwarciu okna — gdy pominięte, wstępnie wybrany jest `default`. Wartość resetuje się przy każdym otwarciu. Lista jest renderowana tylko wtedy, gdy `options` jest niepustą listą, `thinking` jest włączone, a przełącznik Rozmyślanie jest włączony.
- **`showReasoning`** (domyślnie `false`) steruje zwijanym panelem **Rozmyślanie**, który strumieniuje proces rozumowania modelu (delta `reasoning_content`). Ustaw `showReasoning: true`, aby pokazać ten panel przy włączonym myśleniu — model nadal rozumuje, wynik jest stosowany tak samo, dodatkowo wyświetlane jest tylko rozumowanie krok po kroku.

Ponieważ dostawcy (zwłaszcza vLLM/LM Studio) odrzucają `enable_thinking` i `reasoning_effort` w jednym żądaniu, wtyczka wysyła dokładnie jedno z nich:

| Stan | Pole żądania |
| --- | --- |
| Myślenie włączone, stopień = `default` (lub brak skonfigurowanego stopnia) | `enable_thinking` (z przełącznika) |
| Myślenie włączone, stopień = `low` / `medium` / `high` / `xhigh` / `max` | `reasoning_effort` (z listy rozwijanej); przełącznik jest wyłączony |
| Myślenie wyłączone (przełącznik wyłączony lub `thinking` niewłączone w konfiguracji) | `enable_thinking: false`; `reasoning_effort` nie jest wysyłany |

## Błędy {#errors}

Okno wyjaśnia nieudane żądanie zamiast pokazywać surowy błąd, a po wyjaśnieniu dodaje własny komunikat usługi:

| Co się stało | Wyjaśnienie |
| --- | --- |
| Przeglądarka nie dostała odpowiedzi (`Failed to fetch`, `NetworkError…`, `Load failed`) | Usługa nie działa, jest nieosiągalna lub CORS zablokował odpowiedź; konsola przeglądarki pokaże, co jest przyczyną |
| `401` / `403` | Sprawdź klucz API lub uprawnienia dostępu |
| `404` | Sprawdź ścieżkę endpointu |
| `408` / `504` / przekroczenie czasu | Usługa nie odpowiedziała na czas |
| `429` | Zbyt wiele żądań |
| `5xx` | Usługa jest niedostępna (ładuje model lub jest zajęta) |

Przy `aiEndpoint` status pochodzi z odpowiedzi. Własny `aiProvider` otrzymuje te same wyjaśnienia, jeśli zgłosi błąd z `status`:

```ts
if (!response.ok) {
  const body = await response.json().catch(() => null)
  throw Object.assign(new Error(body?.error?.message ?? ''), { status: response.status })
}
```

Każdy inny błąd jest pokazywany z własnym komunikatem.

## Wstawianie wyniku {#inserting-the-result}

Za pomocą przycisku akcji — **Wstaw**, **Zastąp zaznaczenie** lub **Dodaj na końcu**, zależnie od trybu — okno umieszcza `result` w edytorze:

- **Tryb** — przycisk akcji okna jest przyciskiem dzielonym. Główna część stosuje wynik we wstępnie wybranym trybie (**Wstaw** / **Zastąp zaznaczenie** / **Dodaj na końcu**): wybiera go opcja `mode`, albo **Zastąp zaznaczenie**, gdy przy otwarciu okna był zaznaczony tekst, a w przeciwnym razie **Wstaw**. Mała sekcja „więcej” (⋮) po prawej stronie przycisku otwiera menu z pozostałymi trybami — kliknięcie jednego od razu stosuje wynik w tym trybie. **Wstaw** umieszcza wynik w miejscu kursora, **Zastąp zaznaczenie** zastępuje zaznaczony tekst (przechwycony w chwili kliknięcia **Generuj**), a **Dodaj na końcu** dopisuje go na końcu dokumentu.
- **Limit znaków** — gdy edytor ma skonfigurowane `limit` (rozszerzenie `CharacterCount` odrzuca każdą transakcję inną niż wklejenie, która powiększyłaby dokument ponad limit), pod polem wyniku wyświetlany jest licznik znaków `generated / limit` (na żywo podczas strumieniowania, w łagodnej czerwieni, gdy limit zostałby przekroczony), a okno pokazuje ostrzeżenie `ai.limit_exceeded` zaraz po wygenerowaniu, gdy wynik przekroczyłby limit. Przycisk **Wstaw** i jego menu trybów alternatywnych są wtedy wyłączone: wynik jest stosowany w całości albo wcale, więc trzeba go skrócić przed zastosowaniem.