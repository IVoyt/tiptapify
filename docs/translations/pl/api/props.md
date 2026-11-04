# Właściwości {#props}

## Właściwości `<Tiptapify>` {#tiptapify-props}

### `content` {#content}

- **Typ:** `String | Object`
- **Domyślnie:** `''`

Początkowa treść edytora. Przyjmuje ciąg HTML lub obiekt JSON Tiptap.

```vue
<!-- HTML string -->
<Tiptapify :content="'<p>Hello world</p>'" />

<!-- Tiptap JSON -->
<Tiptapify :content="{ type: 'doc', content: [{ type: 'paragraph' }] }" />
```

`content` to wyłącznie **początkowa** treść; do wiązania dwukierunkowego użyj `v-model` (zobacz `modelValue`).

### `modelValue` {#modelvalue}

- **Typ:** `String | Object`
- **Domyślnie:** `''`

Wartość wiązania dwukierunkowego dla `v-model`. Użyj `v-model`, aby synchronizować reaktywną wartość z edytorem. Przy każdej edycji komponent emituje `update:modelValue` z najnowszym HTML, który `v-model` zapisuje z powrotem do Twojego ref. Gdy używane jest tylko `v-model` (bez `:content`), powiązana wartość jest początkową treścią edytora.

```vue
<script setup lang="ts">
import { ref } from 'vue'

const content = ref('<p>Hello, world!</p>')
</script>

<template>
  <Tiptapify v-model="content" placeholder="Write something..." />
</template>
```



### `placeholder` {#placeholder}

- **Typ:** `String`
- **Domyślnie:** `''`

Tekst zastępczy wyświetlany, gdy edytor jest pusty.

```vue
<Tiptapify placeholder="Start typing..." />
```

### `height` {#height}

- **Typ:** `Number`
- **Domyślnie:** `null`

Minimalna wysokość obszaru treści edytora w pikselach.

```vue
<Tiptapify :height="500" />
```

### `toolbar` {#toolbar}

- **Typ:** `Boolean`
- **Domyślnie:** `true`

Pokazuje lub ukrywa pasek narzędzi.

```vue
<Tiptapify :toolbar="false" />
```

### `items` {#items}

- **Typ:** `Array<String> | Object`
- **Domyślnie:** `[]`

Elementy paska narzędzi do wyświetlenia. Przekaż tablicę nazw elementów lub obiekt z nazwanymi sekcjami. Zobacz [Elementy paska narzędzi](/pl/api/toolbar-items).
W tablicy `'|'` dzieli elementy na grupy (w tej kolejności, niezależnie od sekcji, z których pochodzą przyciski), a `'~'` przesuwa elementy po nim na koniec paska narzędzi. W przypadku grup nazwa, która nie jest wbudowanym elementem, rezerwuje miejsce dla własnego przycisku o tej nazwie z `customExtensions`; bez takiego przycisku miejsce jest pomijane.

```vue
<!-- Array -->
<Tiptapify :items="['bold', 'italic', 'underline', '~', 'undo', 'redo']" />

<!-- Object with sections -->
<Tiptapify :items="{ format: ['bold', 'italic'], misc: ['undo', 'redo'] }" />
```

### `itemsExclude` {#itemsexclude}

- **Typ:** `Boolean`
- **Domyślnie:** `false`

Gdy `true`, właściwość `items` określa elementy do **wykluczenia**, a nie do uwzględnienia.

```vue
<Tiptapify
  :items="['source', 'preview', 'fullscreen']"
  :items-exclude="true"
/>
```

### `bubbleMenu` {#bubblemenu}

- **Typ:** `Boolean`
- **Domyślnie:** `true`

Pokazuje menu dymka po zaznaczeniu tekstu: jeden rząd przycisków z ikonami w grupach — pogrubienie, kursywa, podkreślenie, przekreślenie | indeks górny, indeks dolny | wyróżnienie, kod w wierszu | link | usuwanie formatowania. Każdy przycisk ma podpowiedź ze skrótem i pokazuje, gdy jego znacznik jest na zaznaczeniu. Menu ukrywa się dla zaznaczonego bloku (obraz, widżet), wewnątrz kodu i gdy zaznaczony jest cały dokument.

```vue
<Tiptapify :bubble-menu="false" />
```

### `floatingMenu` {#floatingmenu}

- **Typ:** `Boolean`
- **Domyślnie:** `true`

Pokazuje menu pływające w pustych wierszach: nagłówek 1, nagłówek 2 i lista punktowana, w tym samym rzędzie przycisków z ikonami co menu dymka.

```vue
<Tiptapify :floating-menu="false" />
```

### `slashCommands` {#slashcommands}

- **Typ:** `Boolean`
- **Domyślnie:** `true`

Włącza menu poleceń ukośnikowych (wpisz `/`, aby je wywołać).

```vue
<Tiptapify :slash-commands="false" />
```

### `showWordsCount` {#showwordscount}

- **Typ:** `Boolean`
- **Domyślnie:** `true`

Pokazuje liczbę słów w stopce edytora.

```vue
<Tiptapify :show-words-count="false" />
```

### `showCharactersCount` {#showcharacterscount}

- **Typ:** `Boolean`
- **Domyślnie:** `true`

Pokazuje liczbę znaków w stopce edytora.

```vue
<Tiptapify :show-characters-count="false" />
```

### `limit` {#limit}

- **Typ:** `Number | null`
- **Domyślnie:** `null`

Maksymalna liczba znaków dozwolona przez rozszerzenie Tiptap `CharacterCount`. Ustaw `null` lub pomiń właściwość, aby zachować nieograniczoną edycję. Gdy wartość jest większa niż `0`, stopka pokazuje okrągły wskaźnik postępu SVG z progami oznaczonymi kolorami.

```vue
<Tiptapify :limit="1000" />
```

### `limitDefaultColor` {#limitdefaultcolor}

- **Typ:** `String`
- **Domyślnie:** `'purple'`

Domyślny kolor okrągłego wskaźnika postępu wyświetlanego w stopce, gdy ustawiono `limit`.

```vue
<Tiptapify :limit="1000" limit-default-color="primary" />
```

### `limitAlertColor` {#limitalertcolor}

- **Typ:** `String`
- **Domyślnie:** `'orange'`

Kolor wskaźnika postępu, gdy zużycie przekracza 75% limitu.

```vue
<Tiptapify :limit="1000" limit-alert-color="warning" />
```

### `limitWarningColor` {#limitwarningcolor}

- **Typ:** `String`
- **Domyślnie:** `'red'`

Kolor wskaźnika postępu, gdy osiągnięto limit znaków.

```vue
<Tiptapify :limit="1000" limit-warning-color="error" />
```

### `footerAlignment` {#footeralignment}

- **Typ:** `TiptapifyFooterAlignment`
- **Domyślnie:** `'end'`

Wyrównanie elementów stanu w stopce. Przyjmuje `'start'`, `'center'` lub `'end'`.

```vue
<Tiptapify footer-alignment="center" />
```

### `ai` {#ai}

- **Typ:** `Boolean | TiptapifyAiOptions`
- **Domyślnie:** `false`

Włącza element paska narzędzi `ai`. Edytor buduje żądanie `/v1/chat/completions` zgodne z OpenAI i przekazuje je do `aiProvider`. Użyj callbacku dostawcy, aby wywołać swój backend, BFF, endpoint chroniony przez OAuth, LM Studio lub wrapper SDK.

```vue
<script setup lang="ts">
const ai = {
  async aiProvider(request) {
    const response = await fetch('/api/chat/endpoint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      throw new Error('AI request failed')
    }

    return response.json()
  },
}
</script>

<template>
  <Tiptapify :content="content" :ai="ai" :items="['ai']" />
</template>
```

Przykład z lokalnym LLM LM Studio:

```ts
const ai = {
  model: 'google/gemma-4-12b-qat',
  async aiProvider(request) {
    const response = await fetch('http://127.0.0.1:1234/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      throw new Error(await response.text())
    }

    return response.json()
  },
}
```

Strumieniowanie wyniku jest obsługiwane przez ustawienie `stream: true` i przekazywanie tokenów przez argument `stream` w `aiProvider`. Pole wyniku w oknie AI aktualizuje się na żywo w miarę napływu fragmentów, a przycisk **Zatrzymaj** anuluje żądanie w toku:

```ts
const ai = {
  stream: true,
  async aiProvider(request, context, stream) {
    const response = await fetch('/api/chat/endpoint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
      signal: stream?.signal,
    })

    if (!response.ok || !response.body) {
      throw new Error('AI request failed')
    }

    let content = ''
    let buffer = ''
    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    while (true) {
      const { done, value } = await reader.read()
      if (done) {
        break
      }

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() ?? ''

      for (const line of lines) {
        if (!line.startsWith('data: ') || line === 'data: [DONE]') {
          continue
        }

        const { choices } = JSON.parse(line.slice(6))
        const delta = choices?.[0]?.delta ?? {}

        if (delta.reasoning_content) {
          stream?.onReasoning(delta.reasoning_content)
        }

        const chunk = delta.content ?? ''

        if (chunk) {
          content += chunk
          stream?.onChunk(chunk)
        }
      }
    }

    return { content }
  },
}
```

Przekaż `stream.signal` do `fetch` (lub wywołania SDK), aby żądanie zostało anulowane, gdy użytkownik kliknie **Zatrzymaj** lub zamknie okno. Częściowo przesłana treść pozostaje w polu wyniku i można ją zastosować lub odrzucić. Dostawcy, którzy nie strumieniują, mogą całkowicie zignorować argument `stream` — jest opcjonalny i wstecznie kompatybilny.

Modele rozumujące (Qwen thinking, DeepSeek, seria o) strumieniują swoje „myśli” w osobnej delcie `reasoning_content`. Przekazuj te fragmenty przez `stream.onReasoning()` — przy `showReasoning: true` okno renderuje je w zwijanym panelu **Rozmyślanie** nad polem wyniku (panel jest domyślnie ukryty). Dane rozumowania służą tylko do wyświetlania i nigdy nie są wstawiane do edytora.

Aby umożliwić użytkownikowi przełączanie trybu myślenia modelu dla każdego żądania, ustaw `thinking: true` w opcjach AI. Okno pokazuje wtedy przełącznik **Rozmyślanie** (domyślnie włączony, resetowany przy każdym otwarciu); wtyczka zapisuje wartość przełącznika w żądaniu jako `enable_thinking: true | false`, więc nie musisz już (i nie powinieneś) ustawiać `enable_thinking` samodzielnie w `chatCompletionOptions`:

```vue
<Tiptapify
  :content="content"
  :ai="{
    aiProvider,
    model: 'qwen3.8-27b',
    stream: true,
    thinking: true,
  }"
/>
```

Gdy `thinking` ma wartość `false` lub jest pominięte, przełącznik nie jest pokazywany, a wtyczka wysyła `enable_thinking: false`, więc modele, które domyślnie myślą (Qwen3, DeepSeek, …), nie myślą.

Aby umożliwić użytkownikowi wybór stopnia rozumowania dla każdego żądania, ustaw `reasoningEffort` w opcjach AI. Okno pokazuje wtedy listę rozwijaną **Stopień rozumowania** wypełnioną z `options` — własnych poziomów (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`).
Rozszerzenie zawsze samo dodaje do listy element `default` (bazowy poziom trybu myślenia), więc nigdy nie wymieniasz `default` w konfiguracji; pole `default` opcji wstępnie wybiera jeden z Twoich własnych poziomów przy otwarciu okna (w przeciwnym razie wstępnie wybrany jest `default`), a wartość resetuje się przy każdym otwarciu.
Wybrana wartość decyduje, co wtyczka zapisuje w żądaniu: `default` zachowuje tryb myślenia — przełącznik **Rozmyślanie** pozostaje aktywny i steruje `enable_thinking`; każda inna wartość jest wysyłana zamiast tego jako `reasoning_effort`, a przełącznik Rozmyślanie jest wyłączony, dopóki ta wartość jest wybrana (dostawcy odrzucają `enable_thinking` i `reasoning_effort` w jednym żądaniu).
Lista jest pokazywana tylko wtedy, gdy `thinking` jest włączone, a przełącznik Rozmyślanie jest włączony — wyłączenie myślenia ją ukrywa, a `reasoning_effort` nie jest wysyłany (żądanie wraca do `enable_thinking: false`). Gdy `options` brakuje lub jest puste, lista nie jest w ogóle renderowana:

```vue
<Tiptapify
  :content="content"
  :ai="{
    aiProvider,
    model: 'qwen3.8-27b',
    stream: true,
    thinking: true,
    reasoningEffort: {
      options: ['low', 'medium', 'high', 'xhigh', 'max'],
    },
  }"
/>
```

Panel **Rozmyślanie** jest domyślnie ukryty (`showReasoning` ma domyślnie wartość `false`). Ustaw `showReasoning: true`, aby pokazać zwijany panel, który strumieniuje proces rozumowania modelu (delta `reasoning_content`) przy włączonym myśleniu — model nadal rozumuje, a wynik jest stosowany tak samo, dodatkowo wyświetlane jest tylko rozumowanie krok po kroku:

```vue
<Tiptapify
  :content="content"
  :ai="{
    aiProvider,
    model: 'qwen3.8-27b',
    stream: true,
    thinking: true,
    showReasoning: true,
  }"
/>
```

Własne przykłady zapytań zastępują zlokalizowane wartości domyślne:

```vue
<Tiptapify
  :content="content"
  :ai="{
    aiProvider,
    model: 'gpt-4.1-mini',
    promptExamples: [
      { title: 'Rewrite', prompt: 'Rewrite this in a direct tone.' },
      { title: 'Shorten', prompt: 'Make this shorter.' },
      { title: 'Explain', prompt: 'Explain this for a beginner.' },
    ],
  }"
/>
```

`tokenProvider` i `storage` to opcjonalne hooki należące do konsumenta, przeznaczone do bezpośrednich integracji w przeglądarce. Klucze API lub tokeny dostawców umieszczone w kodzie przeglądarki lub jej magazynie są widoczne dla użytkowników i nie wolno traktować ich jako sekretów. W środowisku produkcyjnym preferuj opisany wyżej wzorzec adaptera backendu dla sekretów.

Użyj `mode: 'insert' | 'replace' | 'append'`, aby wstępnie wybrać tryb wstawiania na przycisku akcji okna (**Wstaw** / **Zastąp zaznaczenie** / **Dodaj na końcu**). Bez `mode` przycisk domyślnie ma **Zastąp zaznaczenie**, gdy przy otwarciu okna zaznaczony był tekst, a w przeciwnym razie **Wstaw**. Przycisk akcji jest przyciskiem dzielonym: główna część stosuje wynik we wstępnie wybranym trybie, a mała sekcja „więcej” (⋮) po jego prawej stronie otwiera menu z pozostałymi trybami — kliknięcie jednego od razu stosuje wynik w tym trybie.

Gdy edytor ma `limit` (limit liczby znaków), pod polem wyniku zaraz po wygenerowaniu wyniku wyświetlany jest licznik znaków `generated / limit` (aktualizuje się na żywo podczas strumieniowania i przyjmuje łagodną czerwień, gdy limit zostałby przekroczony).
Okno pokazuje też ostrzeżenie `ai.limit_exceeded` zaraz po generowaniu, jeśli wynik AI przekroczyłby limit.
W tym stanie przycisk **Wstaw** i jego menu trybów alternatywnych są wyłączone — rozszerzenie `CharacterCount` odrzuca każde wstawienie, które powiększyłoby dokument ponad limit, więc wynik jest stosowany w całości albo wcale: wstawiany w pełni, gdy się mieści, lub wcale, gdy przekracza limit.
Skróć wynik, aby ponownie włączyć akcję:

```vue
<Tiptapify
  :content="content"
  :limit="300"
  :ai="{
    aiProvider,
    model: 'gpt-4.1-mini',
  }"
/>
```

Użyj `systemPrompt`, `temperature`, `chatCompletionOptions` lub `createMessages(context)`, aby dostosować żądanie chat-completions zgodne z OpenAI. `context` zawiera `{ prompt, selectedText, textBefore, textAfter, text, html, json, mode }`: `textBefore` / `textAfter` to tekst akapitu z zaznaczeniem wokół niego (do 500 znaków z każdej strony, puste bez zaznaczenia) — wysyłaj je razem z zaznaczeniem, bo w przeciwnym razie model weźmie fragment za cały tekst i go uzupełni.

### `ai.aiEndpoint` {#ai-aiendpoint}

- **Typ:** `String`
- **Domyślnie:** `undefined`

Alternatywa dla własnego `aiProvider`: skieruj funkcję AI na endpoint backendowego LLM, a tiptapify sam zbuduje i wyśle żądanie. Backend otrzymuje minimalny ładunek JSON:

- **Zawsze:** `prompt` (zapytanie wpisane w oknie) i `instruction` (Twój `systemPrompt`, komunikat systemowy własnego `createMessages` lub wbudowany domyślny).
- **Opcjonalnie, wysyłane tylko po ustawieniu:** `stream` (tylko `true`), `thinking` (przełącznik **Rozmyślanie** w oknie, tylko `true`), `reasoning_effort` (wybrany poziom) oraz `model`.

Odpowiedź jest przyjmowana tolerancyjnie: zwykły ciąg znaków, obiekt `{ content }` lub ładunek `choices` zgodny z OpenAI. Gdy żądanie ma `stream: true`, treść odpowiedzi jest czytana jako strumień SSE (wiersze `data:`, zakończone `data: [DONE]`): akceptowane są delty w stylu OpenAI (`choices[0].delta.content` / `.reasoning_content`), prosty fragment `{ type: 'content' | 'reasoning', data }`, płaski fragment `{ content, reasoning_content }` oraz wiersze `data` ze zwykłym tekstem. Jeśli backend ignoruje `stream` i odpowiada zwykłą treścią, używana jest ta treść. Odpowiedź inna niż OK pokazuje w oknie komunikat błędu backendu (JSON `{ error }` / `{ message }` lub surowa treść). Przycisk **Zatrzymaj** i zamknięcie okna przerywają żądanie w toku; częściowo przesłana treść pozostaje w polu wyniku.

Jeśli ustawiono zarówno `aiProvider`, jak i `aiEndpoint`, pierwszeństwo ma `aiProvider`.

```vue
<script setup lang="ts">
const ai = {
  aiEndpoint: '/api/ai/generate',
  model: 'gpt-4.1-mini',
  stream: true,
  thinking: true,
}
</script>

<template>
  <Tiptapify :content="content" :ai="ai" :items="['ai']" />
</template>
```

### `ai.aiHeaders` {#ai-aiheaders}

- **Typ:** `Record<string, string>`
- **Domyślnie:** `undefined`

Dodatkowe nagłówki wysyłane z żądaniem `aiEndpoint`, scalane z `Content-Type: application/json`. Ustawiony tu nagłówek `Authorization` jest zachowywany bez zmian; w przeciwnym razie token z `tokenProvider` (jeśli ustawiony) jest wysyłany jako `Authorization: Bearer <token>`.

```vue
<Tiptapify
  :content="content"
  :ai="{
    aiEndpoint: '/api/ai/generate',
    aiHeaders: { 'X-Api-Key': '…' },
  }"
  :items="['ai']"
/>
```

### `defaultFontFamily` {#defaultfontfamily}

- **Typ:** `String`
- **Domyślnie:** `'Inter'`

Domyślna rodzina czcionek treści edytora.

```vue
<Tiptapify default-font-family="Georgia" />
```

### `fontMeasure` {#fontmeasure}

- **Typ:** `String`
- **Domyślnie:** `'px'`

Jednostka miary wartości rozmiaru czcionki.

```vue
<Tiptapify font-measure="px" />
```

### `rounded` {#rounded}

- **Typ:** `String`
- **Domyślnie:** `'0'`

Promień obramowania kontenera edytora. Przyjmuje wartości promienia Vuetify (`sm`, `md`, `lg`, `xl`, `pill` itd.).

```vue
<Tiptapify rounded="lg" />
```

### `variantBtn` {#variantbtn}

- **Typ:** `variantBtnTypes`
- **Domyślnie:** `'tonal'`

Wariant przycisku Vuetify dla przycisków paska narzędzi. Wartość jest współdzielona ze wszystkimi komponentami paska narzędzi przez konfigurację edytora — własne komponenty mogą ją odczytać za pomocą [`useTiptapifyConfig`](/pl/api/types#usetiptapifyconfig). Zobacz [`variantBtnTypes`](/pl/api/types#variantbtntypes).

```vue
<Tiptapify variant-btn="outlined" />
```

### `variantField` {#variantfield}

- **Typ:** `variantFieldTypes`
- **Domyślnie:** `'outlined'`

Wariant Vuetify dla pól rozwijanych paska narzędzi. Wartość jest współdzielona ze wszystkimi komponentami paska narzędzi przez konfigurację edytora — własne komponenty mogą ją odczytać za pomocą [`useTiptapifyConfig`](/pl/api/types#usetiptapifyconfig). Zobacz [`variantFieldTypes`](/pl/api/types#variantfieldtypes).

```vue
<Tiptapify variant-field="filled" />
```

### `customExtensions` {#customextensions}

- **Typ:** `Array<toolbarSections>`
- **Domyślnie:** `[]`

Udostępnia własne sekcje paska narzędzi, aby rozszerzyć go lub dodać elementy. Komponenty każdej sekcji mogą odczytywać wspólną konfigurację edytora za pomocą [`useTiptapifyConfig`](/pl/api/types#usetiptapifyconfig). Zobacz [Własny pasek narzędzi](/pl/examples/custom-toolbar#custom-toolbar-components).

```vue
<Tiptapify :custom-extensions="customExtensions" />
```

### `interactiveStyles` {#interactivestyles}

- **Typ:** `Boolean`
- **Domyślnie:** `true`

Włącza interaktywne stosowanie stylów.

```vue
<Tiptapify :interactive-styles="false" />
```

### `loading` {#loading}

- **Typ:** `Boolean`
- **Domyślnie:** `false`

Pokazuje nieokreślony pasek postępu podczas ładowania edytora.

```vue
<Tiptapify loading />
```

### `loadingColor` {#loadingcolor}

- **Typ:** `String`
- **Domyślnie:** `'default'`

Kolor paska postępu ładowania. Przyjmuje wartości kolorów motywu Vuetify.

```vue
<Tiptapify loading-color="primary" />
```

### `loadingHeight` {#loadingheight}

- **Typ:** `String`
- **Domyślnie:** `'1px'`

Wysokość paska postępu ładowania.

```vue
<Tiptapify :loading-height="'4px'" />
```

### `imageSlider` {#imageslider}

- **Typ:** `Number`
- **Domyślnie:** `0`

Od tylu obrazów w jednym rzędzie (bez niczego między nimi) edytor układa je w numerowaną siatkę o trzech kolumnach, dla witryn, które pokazują takie obrazy jako slider. `0` to wyłącza.

```vue
<Tiptapify :image-slider="3" />
```

### `skin` {#skin}

- **Typ:** `string | TiptapifySkinConfig` ([`TiptapifySkinInput`](/pl/api/types#tiptapifyskininput))
- **Domyślnie:** `'default'`

Wygląd elementów interfejsu edytora: paska narzędzi, menu dymków, list rozwijanych, okien dialogowych, stopki.

- `default` — klasyczny wygląd: wypukły pasek narzędzi, grupy przycisków jako wypukłe pola, przyciski Vuetify z głównym kolorem w stanie wciśniętym.
- `pastel` — stonowany wygląd: płaski, zabarwiony pasek narzędzi pod cienką linią, przyciski typu ghost z neutralnym stanem wciśnięcia, jasne listy rozwijane, miękkie okna dialogowe.

Funkcje (podpisy obrazów, slidery, lista rozwijana wyrównania, style list) działają tak samo w obu skórkach.

```vue
<Tiptapify skin="pastel" />
```

Możesz też przekazać obiekt skórki inline: nadpisania tokenów (`colors` / `metrics`) i flagi kształtu, opcjonalnie `extends` zarejestrowanej skórki. Jest rozwiązywany na bazie `default` (lub jej podstawy), renderowany z klasą `tiptapify-skin-inline` (`tiptapify-skin-{name}`, gdy obiekt zawiera `name`), a jego tokeny trafiają do korzenia edytora jako zmienne CSS `--tf-*`. Własne nazwy pochodzą z `registerSkin('mint', { … })` — tabelę tokenów i receptury znajdziesz w [przewodniku po skórkach](/pl/guide/skins).

```vue
<Tiptapify :skin="{ extends: 'pastel', colors: { toolbarBg: 'rgba(0, 128, 0, 0.05)' } }" />
```

### `upload` {#upload}

- **Typ:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyUploadOptions`](/pl/api/types#tiptapifyuploadoptions))
- **Domyślnie:** `null`

Endpoint [przesyłania plików](/pl/guide/uploads): pliki wybrane w oknach obrazu i wideo (oraz okładka wideo, obraz karty linku) są do niego wysyłane przez `POST {endpoint}` (multipart `file` i `kind`), a dokument zachowuje URL, którym endpoint odpowiada (`{ "url": … }`).

Bez niego okno obrazu nadal przyjmuje plik: wybrany obraz (i okładka wideo) jest osadzany w dokumencie jako base64 data URL, a obrazy base64 są zachowywane przy wczytywaniu dokumentu. Okno wideo oferuje **Prześlij** tylko z tą właściwością. Gdy ustawiono `upload`, obrazy base64 są usuwane przy wczytywaniu dokumentu.

```vue
<Tiptapify :upload="{ endpoint: '/api/uploads', headers: { Authorization: `Bearer ${token}` } }" />
```

### `contentStyles` {#contentstyles}

- **Typ:** `'inline' | 'classes'` ([`TiptapifyContentStyles`](/pl/api/types#tiptapifycontentstyles))
- **Domyślnie:** `'inline'`

Sposób, w jaki zapisany HTML niesie wygląd kart linków, obrazów z podpisami, filmów, osadzeń i list zadań (zobacz [Style treści](/pl/guide/content-styles)): `inline` zapisuje go w atrybutach `style` tych elementów, dzięki czemu strona wyświetla HTML takim, jaki jest; `classes` zachowuje tylko klasy, dla strony, która ładuje `tiptapify/content.css`. Edytor ignoruje te style przy wczytywaniu HTML, więc oba rodzaje HTML wczytują się tak samo.

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

### `linkPreview` {#linkpreview}

- **Typ:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyLinkPreviewOptions`](/pl/api/types#tiptapifylinkpreviewoptions))
- **Domyślnie:** `null`

Endpoint backendu dla [kart linków](/pl/guide/link-cards): odczytuje dane OpenGraph stron, czego przeglądarka nie potrafi (CORS). Edytor sprawdza go handshake'iem przy starcie (`GET {endpoint}` musi odpowiedzieć `200 { "tiptapifyLinkPreview": 1 }`); dopóki nie odpowie, nic nie oferuje karty.

```vue
<Tiptapify :link-preview="{ endpoint: '/api/link-preview' }" />
```

## Zdarzenia {#events}

### `editor-ready` {#editor-ready}

Wywoływane, gdy instancja edytora jest gotowa.

```typescript
interface EditorReadyPayload {
  editor: TiptapifyEditor  // Tiptapify Editor instance
  getHTML: () => string  // Get current HTML content
  getJSON: () => object  // Get current JSON content
}
```

```vue
<script setup lang="ts">
const onEditorReady = (payload) => {
  console.log(payload.editor)
  console.log(payload.getHTML())
  console.log(payload.getJSON())
}
</script>

<template>
  <Tiptapify @editor-ready="onEditorReady" />
</template>
```

### `content-changed` {#content-changed}

Wywoływane, gdy zmienia się treść edytora.

```typescript
interface ContentChangedPayload {
  html: string   // Current HTML content
  json: object   // Current JSON content
}
```

```vue
<script setup lang="ts">
const onContentChanged = ({ html, json }) => {
  console.log('HTML:', html)
  console.log('JSON:', json)
}
</script>

<template>
  <Tiptapify @content-changed="onContentChanged" />
</template>
```

### `update:modelValue` {#update-modelvalue}

Obsługuje wiązanie `v-model`.

```vue
<script setup lang="ts">
import { ref } from 'vue'
const content = ref('<p>Hello</p>')
</script>

<template>
  <Tiptapify v-model="content" />
</template>
```

## Provide / Inject {#provide-inject}

Instancja edytora i funkcja `t` są dostępne przez provide/inject Vue:

```typescript
import { inject } from 'vue'

const editor = inject('tiptapifyEditor')
const { t } = inject('tiptapifyI18n')
```
