# लिंक कार्ड {#link-cards}

लिंक कार्ड किसी लिंक को वैसे दिखाता है जैसे मैसेंजर दिखाते हैं: पेज की छवि, साइट का नाम, शीर्षक और विवरण, जो उसके OpenGraph (`og:*`) टैग से पढ़े जाते हैं। यह अपना अलग ब्लॉक (`linkCard`) है, लिंक वाला चित्र नहीं। कार्ड से जुड़ी हर चीज़ लिंक टूल में है: कार्ड पर क्लिक उसे चुनता है और टूलबार के **Link** बटन को हाइलाइट करता है, डबल क्लिक कार्ड के साथ लिंक डायलॉग खोलता है।

कार्ड किसी लिंक से बनता है:

- खाली पंक्ति में **URL पेस्ट करने** पर वह लिंक ही रहता है और उसके बगल में **लिंक / कार्ड** का विकल्प मिलता है।
- **लिंक डायलॉग** में **इस रूप में दिखाएँ: लिंक / कार्ड** स्विच होता है। **कार्ड** कार्ड के फ़ील्ड दिखाता है: पता टाइप करते समय (या **डेटा रीफ़्रेश करें** से) पेज का डेटा लोड होता है, और चित्र, शीर्षक, विवरण, साइट का नाम और लेआउट (संक्षिप्त, बड़ा, चित्र के बिना) हाथ से बदले जा सकते हैं। यही स्विच मौजूदा लिंक को कार्ड में बदल देता है।
- **चुना हुआ कार्ड** संपादन के लिए लिंक डायलॉग में खुलता है (Link बटन या डबल क्लिक से), और **इस रूप में दिखाएँ: लिंक** उसे वापस लिंक बना देता है।

`linkPreview` वाले एडिटर का लिंक डायलॉग, जैसा वह पेस्ट किए गए पते के लिए खुलता है। यहाँ फ़ील्ड केवल-पढ़ने वाले हैं: पेज का डेटा एक डेमो एंडपॉइंट से आता है, पते से नहीं। डायलॉग का बदलना देखने के लिए **इस रूप में दिखाएँ** और कार्ड का लेआउट बदलें:

<LinkCardDialogDemo />

और कार्ड एडिटर में हर लेआउट में कैसा दिखता है।

**संक्षिप्त**, चित्र बाईं ओर:

<LinkCardsPreview layout="compact" />

**बड़ा**, चित्र ऊपर:

<LinkCardsPreview layout="large" />

**चित्र के बिना**, केवल टेक्स्ट:

<LinkCardsPreview layout="text" />

## बैकएंड एंडपॉइंट क्यों {#why-a-backend-endpoint}

ब्राउज़र किसी दूसरी साइट का पेज नहीं पढ़ सकता: CORS अनुरोध को रोक देता है जब तक वह साइट अनुमति न दे, और ज़्यादातर साइटें नहीं देतीं। इसलिए tiptapify **आपके** एंडपॉइंट से पूछता है, जो सर्वर पर पेज डाउनलोड करता है और उसके OpenGraph डेटा के साथ उत्तर देता है।

```vue
<Tiptapify
  :link-preview="{ endpoint: '/api/link-preview', headers: { Authorization: `Bearer ${token}` } }"
/>
```

`linkPreview` के बिना, या जब तक उसका एंडपॉइंट हैंडशेक का उत्तर नहीं देता, कुछ भी कार्ड का विकल्प नहीं देता: URL पेस्ट करने पर साधारण लिंक बनता है और लिंक डायलॉग में **Display** स्विच नहीं होता। कंटेंट में पहले से मौजूद कार्ड संपादन योग्य रहते हैं।

## एंडपॉइंट अनुबंध {#the-endpoint-contract}

एक एंडपॉइंट दो `GET` अनुरोधों का उत्तर देता है (`Accept: application/json` और आपके `headers` के साथ भेजे गए)।

### हैंडशेक {#handshake}

`GET /api/link-preview` — बिना `url` के। एडिटर इसे हर एंडपॉइंट और पेज लोड पर एक बार भेजता है (पेज के सभी एडिटर इसे साझा करते हैं), और विफल होने पर लिंक डायलॉग खुलते समय एक बार और (एंडपॉइंट अब तक चालू हो सकता है)। इसे कोई पेज नहीं लाना चाहिए और यह उत्तर देना चाहिए:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{ "tiptapifyLinkPreview": 1 }
```

`1` इस अनुबंध का संस्करण है। साधारण `200` या `204` जानबूझकर काफ़ी नहीं है: SPA फ़ॉलबैक या लॉगिन पेज किसी भी पथ पर `200` देता है।

### पूर्वावलोकन {#preview}

`GET /api/link-preview?url=https%3A%2F%2Fexample.com%2Fblog%2Fgetting-started` पेज का डेटा लौटाता है। `url` को छोड़कर हर फ़ील्ड वैकल्पिक है; खाली फ़ील्ड अनदेखे कर दिए जाते हैं:

```json
{
  "url": "https://example.com/blog/getting-started",
  "title": "Getting started",
  "description": "Install the package and create your first page.",
  "image": "https://example.com/images/getting-started.png",
  "siteName": "Example"
}
```

त्रुटि `4xx`/`5xx` स्थिति के साथ `{ "error": "…" }` लौटाती है; डायलॉग वह संदेश दिखाता है और लिंक को जैसा है वैसा रखता है। `GET` आपके सर्वर या CDN को `url` के आधार पर उत्तर कैश करने देता है।

[अपलोड एंडपॉइंट](/hi/guide/uploads) के साथ tiptapify पेज की छवि भी उसी के साथ संग्रहीत करता है (पेज बाद में उसे बदल या हटा सकता है)। ब्राउज़र उस छवि को तभी पढ़ सकता है जब उसका होस्ट CORS की अनुमति दे; अन्यथा कार्ड मूल छवि से लिंक करता है। आपका एंडपॉइंट वह `image` भी लौटा सकता है जिसे उसने पहले ही खुद संग्रहीत कर लिया हो।

## सहेजा गया HTML {#saved-html}

```html
<a class="tiptapify-link-card" data-link-card="compact" href="https://example.com/blog/getting-started" target="_blank" rel="noopener noreferrer">
  <img class="tiptapify-link-card__image" src="https://example.com/images/getting-started.png" alt="">
  <span class="tiptapify-link-card__body">
    <span class="tiptapify-link-card__site">Example</span>
    <span class="tiptapify-link-card__title">Getting started</span>
    <span class="tiptapify-link-card__description">Install the package and create your first page.</span>
  </span>
</a>
```

`data-link-card` का मान `compact` (इमेज बाईं ओर), `large` (इमेज ऊपर) या `text` (बिना इमेज) होता है। पूरा कार्ड एक ही लिंक है, इसलिए यह बिना किसी स्क्रिप्ट वाली साइट पर भी काम करता है। इसका रूप डिफ़ॉल्ट रूप से HTML के साथ इनलाइन स्टाइल के रूप में आता है, या सिर्फ़ क्लास के लिए `tiptapify/content.css` से: देखें [कंटेंट स्टाइल](/hi/guide/content-styles)।

## उदाहरण एंडपॉइंट {#example-endpoints}

नीचे के उदाहरण एक जैसा व्यवहार करते हैं, इसलिए अपने स्टैक वाला चुनें:

- बिना `url` का `GET` हैंडशेक का उत्तर देता है और कुछ नहीं लाता।
- केवल सार्वजनिक `http(s)` पते पढ़े जाते हैं (SSRF नहीं): होस्ट का हर पता सार्वजनिक होना चाहिए, निजी नेटवर्क, लूपबैक, लिंक-लोकल (क्लाउड मेटाडेटा) या आरक्षित नहीं, अन्यथा उत्तर `422` है।
- रीडायरेक्ट हाथ से, अधिकतम 3 तक, फ़ॉलो किए जाते हैं और हर एक का पता दोबारा जाँचा जाता है। PHP, Laravel और Node.js उदाहरण ठीक उसी पते से जुड़ते हैं जिसे उन्होंने जाँचा था, इसलिए जाँच और अनुरोध के बीच DNS उत्तर बदल नहीं सकता।
- पेज 5 सेकंड के टाइमआउट के साथ, केवल उसका पहला मेगाबाइट पढ़ा जाता है (head काफ़ी है; Laravel उदाहरण 5 MB से बड़े पेज अस्वीकार करता है)।
- डेटा `og:*` टैग से आता है, फिर `twitter:*`, `<meta name="description">`, `<title>` और होस्ट नाम से; छवि को पूर्ण पता बनाया जाता है और केवल `http(s)` होने पर रखा जाता है।
- जो पेज पढ़ा न जा सके (त्रुटि स्थिति, टाइमआउट, आंतरिक पते पर रीडायरेक्ट) उस पर `502` आता है।

::: code-group

```php [PHP]
<?php

// link-preview.php: GET /link-preview.php answers the handshake, GET /link-preview.php?url=… the page data.
// PHP 8.2+ with the curl and dom extensions.

declare(strict_types=1);

const TIMEOUT = 5;
const MAX_REDIRECTS = 3;
const MAX_BYTES = 1_000_000;

function reply(int $status, array $body): never
{
    http_response_code($status);
    header('Content-Type: application/json');
    echo json_encode($body, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

/**
 * The curl `RESOLVE` entry of a public http(s) URL, null for anything else. Never let the endpoint reach an
 * internal address (SSRF): every address of the host must be public, and curl connects to the one checked.
 */
function publicTarget(string $url): ?string
{
    $parts = parse_url($url);
    $scheme = strtolower($parts['scheme'] ?? '');
    $host = trim($parts['host'] ?? '', '[]');
    if (!in_array($scheme, ['http', 'https'], true) || $host === '') {
        return null;
    }

    $ips = filter_var($host, FILTER_VALIDATE_IP)
        ? [$host]
        : [...(gethostbynamel($host) ?: []), ...array_column(@dns_get_record($host, DNS_AAAA) ?: [], 'ipv6')];
    foreach ($ips as $ip) {
        if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_GLOBAL_RANGE) === false) {
            return null;
        }
    }
    if ($ips === []) {
        return null;
    }

    $port = $parts['port'] ?? ($scheme === 'https' ? 443 : 80);
    $ip = str_contains($ips[0], ':') ? "[{$ips[0]}]" : $ips[0];

    return "{$host}:{$port}:{$ip}";
}

/** The HTML of a page (its first MAX_BYTES) and its address after redirects, each redirect checked again */
function fetchPage(string $url): ?array
{
    for ($redirects = 0; $redirects <= MAX_REDIRECTS; $redirects++) {
        $target = publicTarget($url);
        if ($target === null) {
            return null;
        }

        $html = '';
        $curl = curl_init($url);
        curl_setopt_array($curl, [
            CURLOPT_RESOLVE => [$target],
            CURLOPT_FOLLOWLOCATION => false,
            CURLOPT_PROTOCOLS => CURLPROTO_HTTP | CURLPROTO_HTTPS,
            CURLOPT_TIMEOUT => TIMEOUT,
            CURLOPT_ENCODING => '',
            CURLOPT_USERAGENT => 'Mozilla/5.0 (compatible; LinkPreview/1.0)',
            CURLOPT_HTTPHEADER => ['Accept: text/html'],
            // The head of a page is enough: stop reading after MAX_BYTES (a shorter return aborts the transfer)
            CURLOPT_WRITEFUNCTION => function ($curl, string $chunk) use (&$html): int {
                $html .= $chunk;

                return strlen($html) > MAX_BYTES ? 0 : strlen($chunk);
            },
        ]);
        curl_exec($curl);
        $status = curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
        $location = curl_getinfo($curl, CURLINFO_REDIRECT_URL);

        if ($status >= 300 && $status < 400 && $location) {
            $url = $location;

            continue;
        }

        return $status === 200 ? [$html, $url] : null;
    }

    return null;
}

/** An address of the page made absolute; an empty string for anything but http(s) */
function absoluteUrl(string $href, string $base): string
{
    if ($href === '' || preg_match('~^https?://~i', $href)) {
        return $href;
    }

    $parts = parse_url($base);
    $origin = $parts['scheme'].'://'.$parts['host'].(isset($parts['port']) ? ':'.$parts['port'] : '');

    return match (true) {
        str_starts_with($href, '//') => $parts['scheme'].':'.$href,
        str_starts_with($href, '/') => $origin.$href,
        (bool) preg_match('~^[a-z][a-z0-9+.-]*:~i', $href) => '',
        default => $origin.preg_replace('~/[^/]*$~', '/', $parts['path'] ?? '/').$href,
    };
}

/** @return array<string, string> */
function openGraph(string $html, string $url): array
{
    $document = new DOMDocument();
    @$document->loadHTML('<?xml encoding="utf-8" ?>'.$html, LIBXML_NONET);

    $meta = [];
    foreach ($document->getElementsByTagName('meta') as $tag) {
        $key = strtolower($tag->getAttribute('property') ?: $tag->getAttribute('name'));
        $content = trim($tag->getAttribute('content'));
        if ($key !== '' && $content !== '') {
            $meta[$key] ??= $content;
        }
    }
    $title = trim((string) $document->getElementsByTagName('title')->item(0)?->textContent);

    return array_filter([
        'title' => $meta['og:title'] ?? $meta['twitter:title'] ?? $title,
        'description' => $meta['og:description'] ?? $meta['twitter:description'] ?? $meta['description'] ?? '',
        'image' => absoluteUrl($meta['og:image'] ?? $meta['twitter:image'] ?? '', $url),
        'siteName' => $meta['og:site_name'] ?? (string) parse_url($url, PHP_URL_HOST),
    ]);
}

$url = trim((string) ($_GET['url'] ?? ''));

// The handshake: no url, no page fetched
if ($url === '') {
    reply(200, ['tiptapifyLinkPreview' => 1]);
}

if (publicTarget($url) === null) {
    reply(422, ['error' => 'Only public http(s) pages have a preview.']);
}

$page = fetchPage($url);
if ($page === null) {
    reply(502, ['error' => 'The page did not answer.']);
}

[$html, $pageUrl] = $page;
reply(200, ['url' => $url] + openGraph($html, $pageUrl));
```

```php [Laravel]
<?php

// routes/api.php:
// Route::get('/link-preview', LinkPreviewController::class)->middleware(['auth:sanctum', 'throttle:60,1']);

declare(strict_types=1);

namespace App\Http\Controllers;

use GuzzleHttp\Psr7\Uri;
use GuzzleHttp\Psr7\UriResolver;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

final class LinkPreviewController
{
    private const MAX_REDIRECTS = 3;

    private const MAX_BYTES = 5_000_000;

    public function __invoke(Request $request): JsonResponse
    {
        // The handshake: no url, no page fetched
        if (! $request->filled('url')) {
            return response()->json(['tiptapifyLinkPreview' => 1]);
        }

        $url = (string) $request->query('url');
        if ($this->publicTarget($url) === null) {
            return response()->json(['error' => 'Only public http(s) pages have a preview.'], 422);
        }

        // The page data is cached, not the response; a failed page (null) is asked again next time
        $preview = Cache::remember('link-preview:'.sha1($url), now()->addDay(), fn (): ?array => $this->preview($url));

        return $preview === null
            ? response()->json(['error' => 'The page did not answer.'], 502)
            : response()->json(['url' => $url] + $preview);
    }

    /** @return array<string, string>|null */
    private function preview(string $url): ?array
    {
        for ($redirects = 0; $redirects <= self::MAX_REDIRECTS; $redirects++) {
            // Every redirect is checked again, and curl connects to the address checked
            $target = $this->publicTarget($url);
            if ($target === null) {
                return null;
            }

            try {
                $response = Http::timeout(5)
                    ->withUserAgent('Mozilla/5.0 (compatible; LinkPreview/1.0)')
                    ->accept('text/html')
                    ->withOptions([
                        'allow_redirects' => false,
                        'curl' => [CURLOPT_RESOLVE => [$target], CURLOPT_MAXFILESIZE => self::MAX_BYTES],
                    ])
                    ->get($url);
            } catch (ConnectionException) {
                return null;
            }

            if ($response->redirect() && $response->header('Location') !== '') {
                $url = (string) UriResolver::resolve(new Uri($url), new Uri($response->header('Location')));

                continue;
            }

            return $response->successful() ? $this->openGraph($response->body(), $url) : null;
        }

        return null;
    }

    /**
     * The curl `RESOLVE` entry of a public http(s) URL, null for anything else. Never let the endpoint reach
     * an internal address (SSRF): every address of the host must be public.
     */
    private function publicTarget(string $url): ?string
    {
        $parts = parse_url($url);
        $scheme = strtolower($parts['scheme'] ?? '');
        $host = trim($parts['host'] ?? '', '[]');
        if (! in_array($scheme, ['http', 'https'], true) || $host === '') {
            return null;
        }

        $ips = filter_var($host, FILTER_VALIDATE_IP)
            ? [$host]
            : [...(gethostbynamel($host) ?: []), ...array_column(@dns_get_record($host, DNS_AAAA) ?: [], 'ipv6')];
        if ($ips === [] || in_array(false, array_map(fn (string $ip) => filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_GLOBAL_RANGE), $ips), true)) {
            return null;
        }

        $port = $parts['port'] ?? ($scheme === 'https' ? 443 : 80);
        $ip = str_contains($ips[0], ':') ? "[{$ips[0]}]" : $ips[0];

        return "{$host}:{$port}:{$ip}";
    }

    /** @return array<string, string> */
    private function openGraph(string $html, string $url): array
    {
        $document = new \DOMDocument();
        @$document->loadHTML('<?xml encoding="utf-8" ?>'.$html, LIBXML_NONET);

        $meta = [];
        foreach ($document->getElementsByTagName('meta') as $tag) {
            $key = strtolower($tag->getAttribute('property') ?: $tag->getAttribute('name'));
            $content = trim($tag->getAttribute('content'));
            if ($key !== '' && $content !== '') {
                $meta[$key] ??= $content;
            }
        }
        $title = trim((string) $document->getElementsByTagName('title')->item(0)?->textContent);
        $image = $meta['og:image'] ?? $meta['twitter:image'] ?? null;
        $image = $image === null ? '' : (string) UriResolver::resolve(new Uri($url), new Uri($image));

        return array_filter([
            'title' => $meta['og:title'] ?? $meta['twitter:title'] ?? $title,
            'description' => $meta['og:description'] ?? $meta['twitter:description'] ?? $meta['description'] ?? '',
            'image' => preg_match('~^https?://~i', $image) ? $image : '',
            'siteName' => $meta['og:site_name'] ?? (string) parse_url($url, PHP_URL_HOST),
        ]);
    }
}
```

```js [Node.js]
// link-preview.mjs: `node link-preview.mjs`, then GET http://localhost:3001/link-preview[?url=…]. Node 18+, no packages.
import dns from 'node:dns'
import http from 'node:http'
import https from 'node:https'
import net from 'node:net'

const TIMEOUT = 5000
const MAX_REDIRECTS = 3
const MAX_BYTES = 1_000_000

// Never let the endpoint reach an internal address (SSRF): private, loopback, link-local and reserved ranges
// (an IPv4-mapped IPv6 address, ::ffff:127.0.0.1, is checked against the IPv4 ranges)
const blocked = new net.BlockList()
for (const [address, prefix] of [
  ['0.0.0.0', 8], ['10.0.0.0', 8], ['100.64.0.0', 10], ['127.0.0.0', 8], ['169.254.0.0', 16], ['172.16.0.0', 12],
  ['192.0.0.0', 24], ['192.168.0.0', 16], ['198.18.0.0', 15], ['224.0.0.0', 3],
]) {
  blocked.addSubnet(address, prefix, 'ipv4')
}
for (const [address, prefix] of [['::', 127], ['64:ff9b::', 96], ['fc00::', 7], ['fe80::', 10], ['ff00::', 8]]) {
  blocked.addSubnet(address, prefix, 'ipv6')
}

const isPublic = (address, family) => !blocked.check(address, family === 6 || family === 'ipv6' ? 'ipv6' : 'ipv4')

// The DNS lookup of every request: it refuses a host with an internal address, so the address checked is the one used
function publicLookup(hostname, options, callback) {
  dns.lookup(hostname, { ...options, all: true }, (error, addresses) => {
    if (error) {
      return callback(error)
    }
    if (!addresses.length || !addresses.every(({ address, family }) => isPublic(address, family))) {
      return callback(Object.assign(new Error(`${hostname} is not a public host`), { code: 'ENOTPUBLIC' }))
    }

    return options.all ? callback(null, addresses) : callback(null, addresses[0].address, addresses[0].family)
  })
}

// A public http(s) address, or null (a host given as an IP skips the lookup, so it is checked here)
function publicUrl(value, base) {
  try {
    const url = new URL(value, base)
    const host = url.hostname.replace(/^\[|\]$/g, '')
    if (!['http:', 'https:'].includes(url.protocol) || (net.isIP(host) && !isPublic(host, net.isIP(host)))) {
      return null
    }

    return url
  } catch {
    return null
  }
}

// One request: a redirect, or the first MAX_BYTES of the page
function request(url) {
  return new Promise((resolve, reject) => {
    const client = url.protocol === 'https:' ? https : http
    const headers = { 'User-Agent': 'Mozilla/5.0 (compatible; LinkPreview/1.0)', Accept: 'text/html' }
    const req = client.get(url, { headers, lookup: publicLookup, timeout: TIMEOUT }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume()

        return resolve({ location: res.headers.location })
      }
      if (res.statusCode !== 200) {
        res.resume()

        return reject(new Error(`The page answered ${res.statusCode}.`))
      }

      let html = ''
      res.setEncoding('utf8')
      res.on('data', (chunk) => {
        html += chunk
        // The head of a page is enough
        if (html.length > MAX_BYTES) {
          res.destroy()
        }
      })
      res.on('close', () => resolve({ html }))
    })
    req.on('timeout', () => req.destroy(new Error('The page did not answer in time.')))
    req.on('error', reject)
  })
}

// The HTML of a page and its address after redirects, each redirect checked again. A redirect to an internal
// address fails like a page that does not answer: the address asked for was public
async function fetchPage(url) {
  for (let redirects = 0; redirects <= MAX_REDIRECTS; redirects++) {
    const { location, html } = await request(url).catch((error) => {
      throw redirects && error.code === 'ENOTPUBLIC' ? new Error('The page redirects to an internal address.') : error
    })
    if (html !== undefined) {
      return { html, url }
    }

    url = publicUrl(location, url)
    if (!url) {
      throw new Error('The page redirects to an internal address.')
    }
  }

  throw new Error('Too many redirects.')
}

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: '\'', nbsp: ' ' }

const decode = text => text.replace(/&(?:#(\d+)|#x([\da-f]+)|(\w+));/gi, (entity, decimal, hex, name) => (
  decimal ? String.fromCodePoint(Number(decimal)) : hex ? String.fromCodePoint(parseInt(hex, 16)) : ENTITIES[name.toLowerCase()] ?? entity
))

function openGraph(html, url) {
  const meta = {}
  for (const [tag] of html.matchAll(/<meta\b[^>]*>/gi)) {
    const attrs = {}
    for (const [, name, double, single, bare] of tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+))/g)) {
      attrs[name.toLowerCase()] = double ?? single ?? bare
    }
    const key = (attrs.property || attrs.name || '').toLowerCase()
    const content = decode(attrs.content ?? '').trim()
    if (key && content && !(key in meta)) {
      meta[key] = content
    }
  }
  const title = decode(html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] ?? '').trim()
  const image = meta['og:image'] || meta['twitter:image']

  return Object.fromEntries(Object.entries({
    title: meta['og:title'] || meta['twitter:title'] || title,
    description: meta['og:description'] || meta['twitter:description'] || meta.description,
    image: image && publicUrl(image, url) ? new URL(image, url).href : undefined,
    siteName: meta['og:site_name'] || url.hostname,
  }).filter(([, value]) => value))
}

http.createServer(async (req, res) => {
  const send = (status, body) => {
    res.writeHead(status, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(body))
  }
  const { pathname, searchParams } = new URL(req.url, 'http://localhost')
  if (req.method !== 'GET' || pathname !== '/link-preview') {
    return send(404, { error: 'Not found.' })
  }

  // The handshake: no url, no page fetched
  const value = searchParams.get('url')
  if (!value) {
    return send(200, { tiptapifyLinkPreview: 1 })
  }

  const url = publicUrl(value)
  if (!url) {
    return send(422, { error: 'Only public http(s) pages have a preview.' })
  }

  try {
    const page = await fetchPage(url)
    send(200, { url: value, ...openGraph(page.html, page.url) })
  } catch (error) {
    error.code === 'ENOTPUBLIC'
      ? send(422, { error: 'Only public http(s) pages have a preview.' })
      : send(502, { error: 'The page did not answer.' })
  }
}).listen(3001)
```

```python [Python]
# link_preview.py: `python3 link_preview.py`, then GET http://localhost:3002/link-preview[?url=…]. Python 3.9+, no packages.
import ipaddress
import json
import socket
import urllib.error
import urllib.request
from html.parser import HTMLParser
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, urljoin, urlsplit

TIMEOUT = 5
MAX_REDIRECTS = 3
MAX_BYTES = 1_000_000


def is_public_url(url):
    """Never let the endpoint reach an internal address (SSRF): every address of the host must be global."""
    parts = urlsplit(url)
    if parts.scheme not in ('http', 'https') or not parts.hostname:
        return False
    try:
        addresses = {info[4][0] for info in socket.getaddrinfo(parts.hostname, parts.port or None)}
    except (socket.gaierror, UnicodeError, ValueError):
        return False

    return bool(addresses) and all(ipaddress.ip_address(address.split('%')[0]).is_global for address in addresses)


class NoRedirects(urllib.request.HTTPRedirectHandler):
    """Redirects come back as a response, so the address each one points to is checked first."""

    def redirect_request(self, *args, **kwargs):
        return None


opener = urllib.request.build_opener(NoRedirects)


def fetch_page(url):
    """The HTML of a page (its first MAX_BYTES) and its address after redirects, each redirect checked again.
    A redirect to an internal address fails like a page that does not answer: the address asked for was public."""
    for redirects in range(MAX_REDIRECTS + 1):
        if not is_public_url(url):
            raise OSError('The page redirects to an internal address.') if redirects else PermissionError(url)

        request = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (compatible; LinkPreview/1.0)',
            'Accept': 'text/html',
        })
        try:
            with opener.open(request, timeout=TIMEOUT) as response:
                charset = response.headers.get_content_charset() or 'utf-8'

                return response.read(MAX_BYTES).decode(charset, errors='replace'), url
        except urllib.error.HTTPError as error:
            location = error.headers.get('Location')
            if not (300 <= error.code < 400 and location):
                raise
            url = urljoin(url, location)

    raise OSError('Too many redirects.')


class OpenGraph(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.meta = {}
        self.title = ''
        self.in_title = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'meta':
            key = (attrs.get('property') or attrs.get('name') or '').lower()
            content = (attrs.get('content') or '').strip()
            if key and content:
                self.meta.setdefault(key, content)
        self.in_title = tag == 'title'

    def handle_endtag(self, tag):
        if tag == 'title':
            self.in_title = False

    def handle_data(self, data):
        if self.in_title:
            self.title += data


def open_graph(html, url):
    parser = OpenGraph()
    parser.feed(html)
    meta = parser.meta
    image = meta.get('og:image') or meta.get('twitter:image')
    image = urljoin(url, image) if image else ''

    preview = {
        'title': meta.get('og:title') or meta.get('twitter:title') or parser.title.strip(),
        'description': meta.get('og:description') or meta.get('twitter:description') or meta.get('description'),
        'image': image if urlsplit(image).scheme in ('http', 'https') else '',
        'siteName': meta.get('og:site_name') or urlsplit(url).hostname,
    }

    return {key: value for key, value in preview.items() if value}


class LinkPreview(BaseHTTPRequestHandler):
    def send(self, status, body):
        payload = json.dumps(body, ensure_ascii=False).encode()
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)

    def do_GET(self):
        parts = urlsplit(self.path)
        if parts.path != '/link-preview':
            return self.send(404, {'error': 'Not found.'})

        # The handshake: no url, no page fetched
        url = parse_qs(parts.query).get('url', [''])[0].strip()
        if not url:
            return self.send(200, {'tiptapifyLinkPreview': 1})

        try:
            html, page_url = fetch_page(url)
        except PermissionError:
            return self.send(422, {'error': 'Only public http(s) pages have a preview.'})
        except (OSError, ValueError):
            return self.send(502, {'error': 'The page did not answer.'})

        self.send(200, {'url': url, **open_graph(html, page_url)})


ThreadingHTTPServer(('', 3002), LinkPreview).serve_forever()
```

:::

PHP के लिए `curl` और `dom` एक्सटेंशन के साथ 8.2+, Node.js 18+, Python 3.9+ चाहिए; किसी को भी फ़्रेमवर्क के अलावा कोई पैकेज नहीं चाहिए।

### प्रोडक्शन में {#in-production}

- **एंडपॉइंट की सुरक्षा करें।** यह जो भी पेज माँगा जाए उसे डाउनलोड करता है: उसे अपने प्रमाणीकरण (एडिटर हर अनुरोध के साथ `linkPreview` के `headers` भेजता है) और रेट लिमिट के पीछे रखें, जैसा ऊपर के Laravel रूट में है।
- **उत्तर कैश करें** `url` के आधार पर, जैसा Laravel उदाहरण करता है: पेज का कोई कार्ड बनने या रीफ़्रेश होने पर एडिटर फिर पूछता है।
- **एक ही ओरिजिन या CORS।** एडिटर के अपने ओरिजिन पर मौजूद एंडपॉइंट को और कुछ नहीं चाहिए; दूसरे ओरिजिन पर एडिटर का ओरिजिन और आपके भेजे हेडर की अनुमति दें।
- **Python उदाहरण** होस्ट जाँचता है और फिर `urllib` को उसे दोबारा रिज़ॉल्व करने देता है, इसलिए जो होस्ट दूसरी बार DNS में अलग उत्तर दे वह निकल सकता है। सार्वजनिक सेवा के लिए जाँचे गए पते से जुड़ें (`httpx` ट्रांसपोर्ट या `requests` एडेप्टर यह कर सकता है) या अनुरोध ऐसे egress प्रॉक्सी से भेजें जो आंतरिक रेंज को रोकता हो।
- **एन्कोडिंग।** Python उदाहरण पेज को उसके `Content-Type` के charset से डिकोड करता है; PHP और Node.js वाले उसे UTF-8 के रूप में पढ़ते हैं, जो ज़्यादातर साइटों के लिए काफ़ी है। अगर आप पुरानी एन्कोडिंग वाले पेज दिखाते हैं तो charset से डिकोड करना भी जोड़ें।
