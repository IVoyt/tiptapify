# การ์ดลิงก์ {#link-cards}

การ์ดลิงก์แสดงลิงก์แบบเดียวกับแอปแชต คือรูปภาพ ชื่อเว็บไซต์ หัวข้อ และคำอธิบายของหน้า ซึ่งอ่านจากแท็ก OpenGraph (`og:*`) เป็นบล็อกของตัวเอง (`linkCard`) ไม่ใช่รูปภาพที่มีลิงก์ ทุกอย่างเกี่ยวกับการ์ดอยู่ในเครื่องมือลิงก์: คลิกที่การ์ดเพื่อเลือกและไฮไลต์ปุ่ม **ลิงก์** บนแถบเครื่องมือ ดับเบิลคลิกเพื่อเปิดกล่องโต้ตอบลิงก์พร้อมการ์ด

การ์ดสร้างจากลิงก์ได้ดังนี้:

- **การวาง URL** ลงในบรรทัดว่างจะคงไว้เป็นลิงก์ และมีตัวเลือก **ลิงก์ / การ์ด** ให้เลือกถัดจากลิงก์
- **กล่องโต้ตอบลิงก์** มีสวิตช์ **แสดงเป็น: ลิงก์ / การ์ด** เมื่อเลือก **การ์ด** จะแสดงฟิลด์ของการ์ด: ข้อมูลของหน้าจะโหลดขณะที่พิมพ์ที่อยู่ (หรือด้วย **รีเฟรชข้อมูล**) และสามารถแก้ไขรูปภาพ หัวข้อ คำอธิบาย ชื่อเว็บไซต์ และเลย์เอาต์ (กะทัดรัด ขนาดใหญ่ ไม่มีรูปภาพ) ด้วยตนเองได้ สวิตช์เดียวกันนี้ใช้เปลี่ยนลิงก์ที่มีอยู่เป็นการ์ดได้
- **การ์ดที่เลือก** จะเปิดในกล่องโต้ตอบลิงก์ (ปุ่มลิงก์หรือดับเบิลคลิก) เพื่อแก้ไข และ **แสดงเป็น: ลิงก์** จะเปลี่ยนกลับเป็นลิงก์

กล่องโต้ตอบลิงก์ของเอดิเตอร์ที่ใช้ `linkPreview` ตามที่เปิดขึ้นสำหรับที่อยู่ที่วาง ฟิลด์ในที่นี้เป็นแบบอ่านอย่างเดียว: ข้อมูลของหน้ามาจาก endpoint เดโม ไม่ได้มาจากที่อยู่ ลองสลับ **แสดงเป็น** และเลย์เอาต์ของการ์ดเพื่อดูการเปลี่ยนแปลงของกล่องโต้ตอบ:

<LinkCardDialogDemo />

และหน้าตาของการ์ดในเอดิเตอร์ในแต่ละเลย์เอาต์

**กะทัดรัด** รูปภาพอยู่ทางซ้าย:

<LinkCardsPreview layout="compact" />

**ขนาดใหญ่** รูปภาพอยู่ด้านบน:

<LinkCardsPreview layout="large" />

**ไม่มีรูปภาพ** เฉพาะข้อความ:

<LinkCardsPreview layout="text" />

## ทำไมต้องมี endpoint ฝั่งแบ็กเอนด์ {#why-a-backend-endpoint}

เบราว์เซอร์อ่านหน้าของเว็บไซต์อื่นไม่ได้: CORS จะบล็อกคำขอ เว้นแต่เว็บไซต์นั้นอนุญาต ซึ่งส่วนใหญ่ไม่อนุญาต tiptapify จึงถาม endpoint ของ**คุณ** ซึ่งดาวน์โหลดหน้าบนเซิร์ฟเวอร์แล้วตอบกลับด้วยข้อมูล OpenGraph ของหน้านั้น

```vue
<Tiptapify
  :link-preview="{ endpoint: '/api/link-preview', headers: { Authorization: `Bearer ${token}` } }"
/>
```

หากไม่มี `linkPreview` หรือขณะที่ endpoint ยังไม่ตอบ handshake จะไม่มีตัวเลือกการ์ดใด ๆ: การวาง URL จะได้ลิงก์ธรรมดา และกล่องโต้ตอบลิงก์ไม่มีสวิตช์ **การแสดงผล** การ์ดที่มีอยู่แล้วในเนื้อหายังแก้ไขได้

## สัญญาของ endpoint {#the-endpoint-contract}

endpoint เดียวตอบคำขอ `GET` สองแบบ (ส่งพร้อม `Accept: application/json` และ `headers` ของคุณ)

### Handshake {#handshake}

`GET /api/link-preview` — ไม่มี `url` เอดิเตอร์ส่งหนึ่งครั้งต่อ endpoint และต่อการโหลดหน้า (เอดิเตอร์ทุกตัวในหน้าใช้ร่วมกัน) และส่งอีกครั้งเมื่อเปิดกล่องโต้ตอบลิงก์หากครั้งก่อนล้มเหลว (ตอนนี้ endpoint อาจพร้อมแล้ว) ห้ามดึงหน้าใด ๆ และต้องตอบ:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{ "tiptapifyLinkPreview": 1 }
```

`1` คือเวอร์ชันของสัญญานี้ `200` หรือ `204` เฉย ๆ ไม่เพียงพอโดยเจตนา: SPA fallback หรือหน้าเข้าสู่ระบบจะตอบ `200` กับทุกพาธ

### Preview {#preview}

`GET /api/link-preview?url=https%3A%2F%2Fexample.com%2Fblog%2Fgetting-started` ตอบกลับด้วยข้อมูลของหน้า ทุกฟิลด์ยกเว้น `url` เป็นทางเลือก ฟิลด์ว่างจะถูกข้าม:

```json
{
  "url": "https://example.com/blog/getting-started",
  "title": "Getting started",
  "description": "Install the package and create your first page.",
  "image": "https://example.com/images/getting-started.png",
  "siteName": "Example"
}
```

ข้อผิดพลาดตอบด้วยสถานะ `4xx`/`5xx` พร้อม `{ "error": "…" }` กล่องโต้ตอบจะแสดงข้อความและคงลิงก์ไว้ตามเดิม `GET` ช่วยให้เซิร์ฟเวอร์หรือ CDN ของคุณแคชคำตอบตาม `url` ได้

เมื่อมี[endpoint สำหรับอัปโหลด](/th/guide/uploads) tiptapify จะจัดเก็บรูปภาพของหน้าไว้ที่นั่นด้วย (หน้าเว็บอาจเปลี่ยนหรือลบรูปภายหลัง) เบราว์เซอร์อ่านรูปภาพนั้นได้เมื่อโฮสต์อนุญาต CORS เท่านั้น มิฉะนั้นการ์ดจะลิงก์ไปยังรูปภาพต้นฉบับ endpoint ของคุณจะส่งคืน `image` ที่จัดเก็บไว้เองแล้วก็ได้

## HTML ที่บันทึก {#saved-html}

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

`data-link-card` มีค่าเป็น `compact` (รูปอยู่ด้านซ้าย), `large` (รูปอยู่ด้านบน) หรือ `text` (ไม่มีรูป) การ์ดทั้งใบเป็นลิงก์เดียว จึงใช้งานได้บนเว็บไซต์ที่ไม่มีสคริปต์ใดเลย โดยค่าเริ่มต้น รูปลักษณ์จะมาพร้อมกับ HTML เป็นอินไลน์สไตล์ หรือมาจาก `tiptapify/content.css` หากใช้เฉพาะคลาส: ดู [สไตล์เนื้อหา](/th/guide/content-styles)

## ตัวอย่าง endpoint {#example-endpoints}

ตัวอย่างด้านล่างทำงานเหมือนกัน ให้เลือกตัวอย่างที่ตรงกับสแตกของคุณ:

- `GET` ที่ไม่มี `url` ตอบ handshake และไม่ดึงข้อมูลใด ๆ
- อ่านเฉพาะที่อยู่ `http(s)` สาธารณะ (ป้องกัน SSRF): ทุกที่อยู่ของโฮสต์ต้องเป็นสาธารณะ ไม่ใช่เครือข่ายส่วนตัว loopback link-local (เมทาดาทาของคลาวด์) หรือที่อยู่สงวน มิฉะนั้นจะตอบ `422`
- การรีไดเรกต์ทำด้วยตนเอง สูงสุด 3 ครั้ง และตรวจที่อยู่ของแต่ละครั้งอีกรอบ ตัวอย่าง PHP, Laravel และ Node.js เชื่อมต่อไปยังที่อยู่ที่ตรวจสอบแล้วโดยตรง คำตอบ DNS จึงเปลี่ยนระหว่างการตรวจกับการส่งคำขอไม่ได้
- อ่านหน้าด้วย timeout 5 วินาที และอ่านเฉพาะเมกะไบต์แรก (ส่วน head ก็เพียงพอ ตัวอย่าง Laravel ปฏิเสธหน้าที่เกิน 5 MB)
- ข้อมูลมาจากแท็ก `og:*` จากนั้น `twitter:*`, `<meta name="description">`, `<title>` และชื่อโฮสต์ รูปภาพจะถูกแปลงเป็นที่อยู่แบบสมบูรณ์และเก็บไว้เฉพาะเมื่อเป็น `http(s)`
- หน้าที่อ่านไม่ได้ (สถานะผิดพลาด timeout การรีไดเรกต์ไปยังที่อยู่ภายใน) จะตอบ `502`

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

PHP ต้องเป็นเวอร์ชัน 8.2+ พร้อมส่วนขยาย `curl` และ `dom`, Node.js 18+, Python 3.9+ ทั้งหมดไม่ต้องใช้แพ็กเกจเพิ่มเติมนอกจากเฟรมเวิร์ก

### ใน production {#in-production}

- **ปกป้อง endpoint** เพราะจะดาวน์โหลดทุกหน้าที่ถูกขอ: ใส่ไว้หลังระบบยืนยันตัวตนของคุณ (เอดิเตอร์ส่ง `headers` ของ `linkPreview` ไปกับทุกคำขอ) และกำหนดขีดจำกัดอัตราคำขอ เหมือนกับเส้นทาง Laravel ข้างต้น
- **แคชคำตอบ** ตาม `url` เหมือนที่ตัวอย่าง Laravel ทำ: เอดิเตอร์จะถามอีกครั้งทุกครั้งที่สร้างหรือรีเฟรชการ์ดของหน้า
- **Origin เดียวกันหรือ CORS** endpoint บน origin เดียวกับเอดิเตอร์ไม่ต้องตั้งค่าเพิ่ม ส่วน origin อื่นต้องอนุญาต origin ของเอดิเตอร์และ headers ที่คุณส่ง
- **ตัวอย่าง Python** ตรวจโฮสต์แล้วปล่อยให้ `urllib` แปลงที่อยู่อีกรอบ โฮสต์ที่ตอบ DNS ต่างออกไปในครั้งที่สองจึงอาจหลุดผ่านได้ สำหรับบริการสาธารณะ ให้เชื่อมต่อไปยังที่อยู่ที่ตรวจแล้ว (ทรานสปอร์ต `httpx` หรืออะแดปเตอร์ `requests` ทำได้) หรือส่งคำขอผ่าน egress proxy ที่บล็อกช่วงที่อยู่ภายใน
- **การเข้ารหัส** ตัวอย่าง Python ถอดรหัสหน้าตาม charset ของ `Content-Type` ส่วนตัวอย่าง PHP และ Node.js อ่านเป็น UTF-8 ซึ่งครอบคลุมเว็บไซต์ส่วนใหญ่ ควรถอดรหัสตาม charset ด้วยหากแสดงหน้าที่ใช้การเข้ารหัสแบบเก่า
