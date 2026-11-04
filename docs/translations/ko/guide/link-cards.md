# 링크 카드 {#link-cards}

링크 카드는 메신저처럼 링크를 보여 줍니다. 페이지의 OpenGraph(`og:*`) 태그에서 읽어 온 이미지, 사이트 이름, 제목, 설명이 표시됩니다. 링크가 걸린 이미지가 아니라 독립적인 블록(`linkCard`)입니다. 카드와 관련된 모든 기능은 링크 도구에 있습니다. 카드를 클릭하면 선택되면서 툴바의 **링크** 버튼이 강조되고, 더블 클릭하면 카드가 포함된 링크 대화상자가 열립니다.

카드는 링크로 만듭니다.

- 빈 줄에 **URL을 붙여넣으면** 링크로 유지되며 그 옆에 **링크 / 카드**가 제안됩니다.
- **링크 대화상자**에는 **표시 형식: 링크 / 카드** 전환 스위치가 있습니다. **카드**를 선택하면 카드 필드가 표시됩니다. 주소를 입력하는 동안(또는 **데이터 새로 고침**을 누르면) 페이지 데이터를 불러오며, 이미지, 제목, 설명, 사이트 이름, 레이아웃(컴팩트, 크게, 이미지 없음)은 직접 바꿀 수 있습니다. 같은 스위치로 기존 링크를 카드로 바꿀 수도 있습니다.
- **선택한 카드**는 링크 대화상자(링크 버튼 또는 더블 클릭)에서 편집할 수 있으며, **표시 형식: 링크**를 선택하면 다시 링크로 돌아갑니다.

`linkPreview`가 설정된 에디터의 링크 대화상자로, 주소를 붙여넣었을 때 열리는 모습입니다. 이 필드는 읽기 전용입니다. 페이지 데이터는 주소가 아니라 데모 엔드포인트에서 가져옵니다. **표시 형식**과 카드 레이아웃을 바꿔 가며 대화상자가 어떻게 달라지는지 확인해 보세요.

<LinkCardDialogDemo />

레이아웃별로 카드가 에디터에서 어떻게 보이는지도 확인하세요.

**컴팩트**: 이미지가 왼쪽에 있습니다.

<LinkCardsPreview layout="compact" />

**크게**: 이미지가 위쪽에 있습니다.

<LinkCardsPreview layout="large" />

**이미지 없음**: 텍스트만 표시됩니다.

<LinkCardsPreview layout="text" />

## 백엔드 엔드포인트가 필요한 이유 {#why-a-backend-endpoint}

브라우저는 다른 사이트의 페이지를 읽을 수 없습니다. 해당 사이트가 허용하지 않으면 CORS가 요청을 차단하는데, 대부분의 사이트는 허용하지 않습니다. 그래서 tiptapify는 **사용자의** 엔드포인트에 요청하고, 엔드포인트가 서버에서 페이지를 내려받아 OpenGraph 데이터로 응답합니다.

```vue
<Tiptapify
  :link-preview="{ endpoint: '/api/link-preview', headers: { Authorization: `Bearer ${token}` } }"
/>
```

`linkPreview`가 없거나 엔드포인트가 핸드셰이크에 응답하지 않는 동안에는 카드가 제안되지 않습니다. URL을 붙여넣으면 일반 링크가 되고, 링크 대화상자에는 **표시 형식** 스위치가 없습니다. 콘텐츠에 이미 있는 카드는 계속 편집할 수 있습니다.

## 엔드포인트 규약 {#the-endpoint-contract}

하나의 엔드포인트가 두 가지 `GET` 요청에 응답합니다(`Accept: application/json` 헤더와 사용자의 `headers`가 함께 전송됨).

### 핸드셰이크 {#handshake}

`GET /api/link-preview` — `url` 없음. 에디터는 엔드포인트와 페이지 로드당 한 번(페이지의 모든 에디터가 공유) 이 요청을 보내며, 실패했다면 링크 대화상자를 열 때 한 번 더 보냅니다(그 사이 엔드포인트가 살아났을 수 있으므로). 이 요청에서는 어떤 페이지도 가져오지 않고 다음과 같이 응답해야 합니다.

```http
HTTP/1.1 200 OK
Content-Type: application/json

{ "tiptapifyLinkPreview": 1 }
```

`1`은 이 규약의 버전입니다. 일반적인 `200`이나 `204`만으로는 일부러 충분하지 않게 했습니다. SPA 폴백이나 로그인 페이지는 어떤 경로에도 `200`으로 응답하기 때문입니다.

### 미리보기 {#preview}

`GET /api/link-preview?url=https%3A%2F%2Fexample.com%2Fblog%2Fgetting-started`는 페이지 데이터로 응답합니다. `url`을 제외한 모든 필드는 선택 사항이며, 비어 있는 필드는 무시됩니다.

```json
{
  "url": "https://example.com/blog/getting-started",
  "title": "Getting started",
  "description": "Install the package and create your first page.",
  "image": "https://example.com/images/getting-started.png",
  "siteName": "Example"
}
```

오류는 `4xx`/`5xx` 상태와 `{ "error": "…" }`로 응답합니다. 대화상자는 해당 메시지를 표시하고 링크는 그대로 유지합니다. `GET`을 사용하므로 서버나 CDN이 `url` 기준으로 응답을 캐시할 수 있습니다.

[업로드 엔드포인트](/ko/guide/uploads)가 있으면 tiptapify는 페이지 이미지도 그곳에 저장합니다(페이지가 나중에 이미지를 바꾸거나 삭제할 수 있으므로). 브라우저는 호스트가 CORS를 허용할 때만 그 이미지를 읽을 수 있으며, 그렇지 않으면 카드는 원본 이미지를 링크합니다. 엔드포인트가 이미 직접 저장해 둔 `image`를 반환해도 됩니다.

## 저장되는 HTML {#saved-html}

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

`data-link-card`는 `compact`(이미지가 왼쪽), `large`(이미지가 위), `text`(이미지 없음) 중 하나입니다. 카드 전체가 하나의 링크이므로 스크립트가 없는 사이트에서도 동작합니다. 모양은 기본적으로 인라인 스타일로 HTML과 함께 제공되며, 클래스만 쓰는 경우 `tiptapify/content.css`에서 가져옵니다. [콘텐츠 스타일](/ko/guide/content-styles)을 참고하세요.

## 엔드포인트 예제 {#example-endpoints}

아래 예제는 모두 동일하게 동작하므로 사용 중인 스택에 맞는 것을 고르세요.

- `url` 없는 `GET`은 핸드셰이크에 응답하며 아무것도 가져오지 않습니다.
- 공개 `http(s)` 주소만 읽습니다(SSRF 방지). 호스트의 모든 주소가 공개 주소여야 하며, 사설 네트워크, 루프백, 링크 로컬(클라우드 메타데이터), 예약된 주소이면 `422`로 응답합니다.
- 리디렉션은 직접 최대 3번까지 따라가며, 매번 주소를 다시 검사합니다. PHP, Laravel, Node.js 예제는 검사한 바로 그 주소로 연결하므로 검사와 요청 사이에 DNS 응답이 바뀔 수 없습니다.
- 페이지는 5초 타임아웃으로, 처음 1메가바이트만 읽습니다(head만으로 충분하며, Laravel 예제는 5 MB를 넘는 페이지를 거부합니다).
- 데이터는 `og:*` 태그에서 가져오고, 없으면 `twitter:*`, `<meta name="description">`, `<title>`, 호스트 이름 순으로 사용합니다. 이미지는 절대 주소로 변환되며 `http(s)`인 경우에만 유지됩니다.
- 읽을 수 없는 페이지(오류 상태, 타임아웃, 내부 주소로의 리디렉션)에는 `502`로 응답합니다.

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

PHP는 `curl`과 `dom` 확장이 설치된 8.2 이상, Node.js는 18 이상, Python은 3.9 이상이 필요하며, 프레임워크 외에 추가로 필요한 패키지는 없습니다.

### 프로덕션 환경에서 {#in-production}

- **엔드포인트를 보호하세요.** 요청받은 어떤 페이지든 내려받으므로, 인증(에디터는 모든 요청에 `linkPreview`의 `headers`를 보냅니다)과 요청 속도 제한 뒤에 두세요. 위의 Laravel 라우트처럼 설정하면 됩니다.
- **응답을 캐시하세요.** Laravel 예제처럼 `url` 기준으로 캐시합니다. 에디터는 페이지의 카드를 만들거나 새로 고칠 때마다 다시 요청합니다.
- **동일 출처 또는 CORS.** 에디터와 같은 출처의 엔드포인트라면 추가 설정이 필요 없으며, 다른 출처라면 에디터의 출처와 전송하는 헤더를 허용하세요.
- **Python 예제**는 호스트를 검사한 뒤 `urllib`이 다시 이름을 확인하도록 두기 때문에, 두 번째에 다른 DNS 응답을 주는 호스트는 통과할 수 있습니다. 공개 서비스라면 검사한 주소로 직접 연결하거나(`httpx` 트랜스포트나 `requests` 어댑터로 가능) 내부 대역을 차단하는 이그레스 프록시를 통해 요청을 보내세요.
- **인코딩.** Python 예제는 `Content-Type`의 charset으로 페이지를 디코딩하고, PHP와 Node.js 예제는 UTF-8로 읽으며 대부분의 사이트에서는 이것으로 충분합니다. 오래된 인코딩의 페이지를 다룬다면 charset으로도 디코딩하세요.
