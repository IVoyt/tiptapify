# अपलोड {#uploads}

चित्र और वीडियो डायलॉग लिंक के साथ-साथ कंप्यूटर से फ़ाइल भी लेते हैं। एडिटर का अपना कोई स्टोरेज नहीं है, इसलिए चुनी गई फ़ाइल कहाँ जाएगी, यह `upload` prop पर निर्भर करता है:

| | `upload` के बिना | `upload` के साथ |
|---|---|---|
| **चित्र** (और वीडियो पोस्टर) | base64 डेटा URL के रूप में दस्तावेज़ में एम्बेड | आपके एंडपॉइंट पर भेजा जाता है; दस्तावेज़ में उसका URL रहता है |
| **वीडियो फ़ाइल** | कोई अपलोड नहीं: वीडियो उसके लिंक (YouTube, Vimeo, फ़ाइल URL) से डाला जाता है | आपके एंडपॉइंट पर भेजा जाता है; दस्तावेज़ में उसका URL रहता है |
| **लिंक कार्ड का चित्र** | कार्ड पेज की अपनी छवि से लिंक करता है | वह भी आपके एंडपॉइंट के साथ संग्रहीत होता है (पेज अपनी छवि बदल या हटा सकता है) |

`upload` सेट होने पर दस्तावेज़ लोड होते समय base64 चित्र हटा दिए जाते हैं, इसलिए कंटेंट में केवल लिंक रहते हैं।

```vue
<Tiptapify
  :upload="{ endpoint: '/api/uploads', headers: { Authorization: `Bearer ${token}` } }"
/>
```

वीडियो डायलॉग का **अपलोड** विकल्प `upload` में `endpoint` होते ही दिखने लगता है; चित्र डायलॉग में यह हमेशा होता है।

## एंडपॉइंट अनुबंध {#the-endpoint-contract}

`POST {endpoint}` दो फ़ील्ड वाली `multipart/form-data` बॉडी के साथ, `Accept: application/json` और आपके `headers` के साथ भेजा जाता है:

| फ़ील्ड | मान |
|---|---|
| `file` | चुनी गई फ़ाइल |
| `kind` | `image` या `video` |

डायलॉग की प्रगति पट्टी अनुरोध के अपलोड को दर्शाती है, और **रद्द करें** उसे रोक देता है।

संग्रहीत फ़ाइल `2xx` स्थिति के साथ अपना URL लौटाती है, जो दस्तावेज़ में जैसा है वैसा चला जाता है (पूर्ण URL या आपकी साइट का पथ):

```http
HTTP/1.1 201 Created
Content-Type: application/json

{ "url": "https://example.com/uploads/3ebff0ac73c2db524d009ad01d2c6e00.png" }
```

अस्वीकृत फ़ाइल `4xx`/`5xx` स्थिति के साथ `{ "error": "…" }` लौटाती है (बहुत बड़ी फ़ाइल के लिए `413`, अनुमति-रहित प्रकार के लिए `422`)। डायलॉग वह संदेश दिखाता है और खुला रहता है; संदेश न होने पर (या एंडपॉइंट के उत्तर न देने पर) वह अपनी भाषा में बताता है कि फ़ाइल अपलोड नहीं हो सकी।

## उदाहरण एंडपॉइंट {#example-endpoints}

नीचे के उदाहरण एक जैसा व्यवहार करते हैं, इसलिए अपने स्टैक वाला चुनें:

- फ़ाइल **अपनी सामग्री** के आधार पर स्वीकार की जाती है, नाम या ब्राउज़र द्वारा भेजे गए प्रकार के आधार पर नहीं: `photo.png` नाम का HTML पेज अस्वीकार कर दिया जाता है। चित्र: JPEG, PNG, GIF, WebP, AVIF (SVG नहीं, उसमें स्क्रिप्ट हो सकती है)। वीडियो: MP4, WebM, Ogg, QuickTime।
- चित्र 10 MB तक, वीडियो 200 MB तक; इससे बड़ी फ़ाइल पर `413` आता है।
- फ़ाइल उसके प्रकार के एक्सटेंशन वाले **यादृच्छिक नाम** से संग्रहीत होती है, उस नाम से कभी नहीं जिससे वह आई थी।
- उत्तर `201 { "url": … }` होता है; गायब फ़ील्ड या अस्वीकृत प्रकार पर `422` आता है।
- Node.js और Python के उदाहरण संग्रहीत फ़ाइलें भी परोसते हैं (`GET /uploads/<name>`, `X-Content-Type-Options: nosniff` के साथ); PHP और Laravel में यह काम वेब सर्वर पर छोड़ा गया है।

::: code-group

```php [PHP]
<?php

// upload.php: POST /upload.php (multipart `file` and `kind`) stores the file in ./uploads and answers its URL.
// PHP 8.2+ with the fileinfo extension.

declare(strict_types=1);

// The types a file may have, by what it contains (not by its name), and the extension it is stored with
const TYPES = [
    'image' => ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/gif' => 'gif', 'image/webp' => 'webp', 'image/avif' => 'avif'],
    'video' => ['video/mp4' => 'mp4', 'video/webm' => 'webm', 'video/ogg' => 'ogv', 'video/quicktime' => 'mov'],
];
const MAX_BYTES = ['image' => 10_000_000, 'video' => 200_000_000];
const UPLOADS = __DIR__.'/uploads';

function reply(int $status, array $body): never
{
    http_response_code($status);
    header('Content-Type: application/json');
    echo json_encode($body, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    reply(405, ['error' => 'POST a file.']);
}

// A body over post_max_size reaches PHP empty
if ($_POST === [] && $_FILES === [] && (int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 0) {
    reply(413, ['error' => 'The file is too large.']);
}

$kind = (string) ($_POST['kind'] ?? '');
$file = $_FILES['file'] ?? null;
if (!isset(TYPES[$kind]) || !is_array($file) || is_array($file['error'])) {
    reply(422, ['error' => 'Send a file and its kind: image or video.']);
}

if (in_array($file['error'], [UPLOAD_ERR_INI_SIZE, UPLOAD_ERR_FORM_SIZE], true) || $file['size'] > MAX_BYTES[$kind]) {
    reply(413, ['error' => 'The file is too large.']);
}

if ($file['error'] !== UPLOAD_ERR_OK) {
    reply(422, ['error' => 'The file did not arrive.']);
}

$type = (new finfo(FILEINFO_MIME_TYPE))->file($file['tmp_name']);
$extension = TYPES[$kind][$type] ?? null;
if ($extension === null) {
    reply(422, ['error' => "Not an allowed {$kind} file."]);
}

// A random name: never the name the file came with
$name = bin2hex(random_bytes(16)).'.'.$extension;
if (!is_dir(UPLOADS) && !mkdir(UPLOADS, 0755, true) || !move_uploaded_file($file['tmp_name'], UPLOADS.'/'.$name)) {
    reply(500, ['error' => 'The file could not be stored.']);
}

$scheme = !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' ? 'https' : 'http';
$directory = rtrim(str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'])), '/');

reply(201, ['url' => "{$scheme}://{$_SERVER['HTTP_HOST']}{$directory}/uploads/{$name}"]);
```

```php [Laravel]
<?php

// routes/api.php:
// Route::post('/uploads', UploadController::class)->middleware(['auth:sanctum', 'throttle:30,1']);
// The files go to the `public` disk: run `php artisan storage:link` once

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

final class UploadController
{
    // The types a file may have, by what it contains (not by its name)
    private const TYPES = [
        'image' => 'mimetypes:image/jpeg,image/png,image/gif,image/webp,image/avif',
        'video' => 'mimetypes:video/mp4,video/webm,video/ogg,video/quicktime',
    ];

    private const MAX_KILOBYTES = ['image' => 10_000, 'video' => 200_000];

    public function __invoke(Request $request): JsonResponse
    {
        $kind = (string) $request->input('kind');
        if (! isset(self::TYPES[$kind])) {
            return response()->json(['error' => 'Send a file and its kind: image or video.'], 422);
        }

        $validator = Validator::make($request->all(), [
            'file' => ['required', 'file', self::TYPES[$kind], 'max:'.self::MAX_KILOBYTES[$kind]],
        ]);
        if ($validator->fails()) {
            $tooLarge = isset($validator->failed()['file']['Max']);

            return response()->json(['error' => $validator->errors()->first('file')], $tooLarge ? 413 : 422);
        }

        // A random name with the extension of the file's type: never the name it came with
        $path = $request->file('file')->store('uploads', 'public');

        return response()->json(['url' => Storage::disk('public')->url($path)], 201);
    }
}
```

```js [Node.js]
// upload.mjs: `node upload.mjs`, then POST http://localhost:3003/uploads (multipart `file` and `kind`).
// It stores the file in ./uploads and serves it at /uploads/<name>. Node 20+, no packages.
import { randomBytes } from 'node:crypto'
import { createReadStream } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import http from 'node:http'
import path from 'node:path'
import { Readable } from 'node:stream'

// The types a file may have and the extension it is stored with
const TYPES = {
  image: { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/gif': 'gif', 'image/webp': 'webp', 'image/avif': 'avif' },
  video: { 'video/mp4': 'mp4', 'video/webm': 'webm', 'video/ogg': 'ogv', 'video/quicktime': 'mov' },
}
const MAX_BYTES = { image: 10_000_000, video: 200_000_000 }
const UPLOADS = path.resolve('uploads')
const CONTENT_TYPES = Object.fromEntries(Object.values(TYPES).flatMap(types => Object.entries(types).map(([type, extension]) => [extension, type])))

// The type of a file by its first bytes: the type a browser sends is only what the file name suggests
function sniff(bytes) {
  const ascii = (start, end) => String.fromCharCode(...bytes.subarray(start, end))
  if (bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF) return 'image/jpeg'
  if (ascii(0, 8) === '\x89PNG\r\n\x1A\n') return 'image/png'
  if (ascii(0, 4) === 'GIF8') return 'image/gif'
  if (ascii(0, 4) === 'RIFF' && ascii(8, 12) === 'WEBP') return 'image/webp'
  if (ascii(0, 4) === '\x1A\x45\xDF\xA3') return 'video/webm'
  if (ascii(0, 4) === 'OggS') return 'video/ogg'
  if (ascii(4, 8) === 'ftyp') {
    const brand = ascii(8, 12)
    if (brand === 'avif' || brand === 'avis') return 'image/avif'

    return brand === 'qt  ' ? 'video/quicktime' : 'video/mp4'
  }

  return null
}

function send(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(body))
}

async function upload(req, res) {
  const length = Number(req.headers['content-length'] ?? 0)
  if (length > MAX_BYTES.video + 1_000_000) {
    return send(res, 413, { error: 'The file is too large.' })
  }

  let form
  try {
    const request = new Request('http://localhost', {
      method: 'POST',
      headers: { 'content-type': req.headers['content-type'] ?? '' },
      body: Readable.toWeb(req),
      duplex: 'half',
    })
    form = await request.formData()
  } catch {
    return send(res, 422, { error: 'Send a file and its kind: image or video.' })
  }

  const kind = form.get('kind')
  const file = form.get('file')
  if (!Object.hasOwn(TYPES, kind) || !(file instanceof File)) {
    return send(res, 422, { error: 'Send a file and its kind: image or video.' })
  }
  if (file.size > MAX_BYTES[kind]) {
    return send(res, 413, { error: 'The file is too large.' })
  }

  const bytes = new Uint8Array(await file.arrayBuffer())
  const extension = TYPES[kind][sniff(bytes)]
  if (!extension) {
    return send(res, 422, { error: `Not an allowed ${kind} file.` })
  }

  // A random name: never the name the file came with
  const name = `${randomBytes(16).toString('hex')}.${extension}`
  await mkdir(UPLOADS, { recursive: true })
  await writeFile(path.join(UPLOADS, name), bytes)

  send(res, 201, { url: `http://${req.headers.host}/uploads/${name}` })
}

// The stored files, by the names this endpoint gives only
function serve(res, name) {
  const extension = /^[a-f\d]{32}\.([a-z\d]+)$/.exec(name)?.[1]
  if (!CONTENT_TYPES[extension]) {
    return send(res, 404, { error: 'Not found.' })
  }

  const stream = createReadStream(path.join(UPLOADS, name))
  stream.on('open', () => {
    res.writeHead(200, { 'Content-Type': CONTENT_TYPES[extension], 'X-Content-Type-Options': 'nosniff' })
    stream.pipe(res)
  })
  stream.on('error', () => send(res, 404, { error: 'Not found.' }))
}

http.createServer((req, res) => {
  const { pathname } = new URL(req.url, 'http://localhost')

  if (pathname === '/uploads' && req.method === 'POST') {
    return upload(req, res).catch(() => send(res, 500, { error: 'The file could not be stored.' }))
  }
  if (pathname === '/uploads') {
    return send(res, 405, { error: 'POST a file.' })
  }
  if (pathname.startsWith('/uploads/') && req.method === 'GET') {
    return serve(res, pathname.slice('/uploads/'.length))
  }

  send(res, 404, { error: 'Not found.' })
}).listen(3003)
```

```python [Python]
# upload.py: `python3 upload.py`, then POST http://localhost:3004/uploads (multipart `file` and `kind`).
# It stores the file in ./uploads and serves it at /uploads/<name>. Python 3.9+, no packages.
import json
import re
import secrets
from email.parser import BytesParser
from email.policy import default
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit

# The types a file may have and the extension it is stored with
TYPES = {
    'image': {'image/jpeg': 'jpg', 'image/png': 'png', 'image/gif': 'gif', 'image/webp': 'webp', 'image/avif': 'avif'},
    'video': {'video/mp4': 'mp4', 'video/webm': 'webm', 'video/ogg': 'ogv', 'video/quicktime': 'mov'},
}
MAX_BYTES = {'image': 10_000_000, 'video': 200_000_000}
UPLOADS = Path('uploads').resolve()
CONTENT_TYPES = {extension: type_ for types in TYPES.values() for type_, extension in types.items()}


def sniff(data):
    """The type of a file by its first bytes: the type a browser sends is only what the file name suggests."""
    if data[:3] == b'\xff\xd8\xff':
        return 'image/jpeg'
    if data[:8] == b'\x89PNG\r\n\x1a\n':
        return 'image/png'
    if data[:4] == b'GIF8':
        return 'image/gif'
    if data[:4] == b'RIFF' and data[8:12] == b'WEBP':
        return 'image/webp'
    if data[:4] == b'\x1a\x45\xdf\xa3':
        return 'video/webm'
    if data[:4] == b'OggS':
        return 'video/ogg'
    if data[4:8] == b'ftyp':
        brand = data[8:12]
        if brand in (b'avif', b'avis'):
            return 'image/avif'
        return 'video/quicktime' if brand == b'qt  ' else 'video/mp4'
    return None


def multipart_fields(content_type, body):
    """The fields of a multipart/form-data body: name -> (file name, bytes)."""
    message = BytesParser(policy=default).parsebytes(b'Content-Type: ' + content_type.encode('latin-1') + b'\r\n\r\n' + body)
    if not message.is_multipart():
        return {}
    return {
        part.get_param('name', header='content-disposition'): (part.get_filename(), part.get_payload(decode=True) or b'')
        for part in message.iter_parts()
    }


class Upload(BaseHTTPRequestHandler):
    def send(self, status, body):
        payload = json.dumps(body).encode()
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)

    def do_POST(self):
        if urlsplit(self.path).path != '/uploads':
            return self.send(404, {'error': 'Not found.'})

        length = int(self.headers.get('Content-Length') or 0)
        if length > MAX_BYTES['video'] + 1_000_000:
            return self.send(413, {'error': 'The file is too large.'})

        fields = multipart_fields(self.headers.get('Content-Type', ''), self.rfile.read(length))
        kind = fields.get('kind', (None, b''))[1].decode(errors='replace')
        filename, data = fields.get('file', (None, b''))
        if kind not in TYPES or filename is None:
            return self.send(422, {'error': 'Send a file and its kind: image or video.'})
        if len(data) > MAX_BYTES[kind]:
            return self.send(413, {'error': 'The file is too large.'})

        extension = TYPES[kind].get(sniff(data))
        if extension is None:
            return self.send(422, {'error': f'Not an allowed {kind} file.'})

        # A random name: never the name the file came with
        name = f'{secrets.token_hex(16)}.{extension}'
        UPLOADS.mkdir(exist_ok=True)
        (UPLOADS / name).write_bytes(data)

        self.send(201, {'url': f'http://{self.headers["Host"]}/uploads/{name}'})

    def do_GET(self):
        path = urlsplit(self.path).path
        if path == '/uploads':
            return self.send(405, {'error': 'POST a file.'})

        # The stored files, by the names this endpoint gives only
        match = re.fullmatch(r'/uploads/([a-f\d]{32})\.([a-z\d]+)', path)
        file = UPLOADS / f'{match[1]}.{match[2]}' if match and match[2] in CONTENT_TYPES else None
        if file is None or not file.is_file():
            return self.send(404, {'error': 'Not found.'})

        data = file.read_bytes()
        self.send_response(200)
        self.send_header('Content-Type', CONTENT_TYPES[match[2]])
        self.send_header('Content-Length', str(len(data)))
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.end_headers()
        self.wfile.write(data)


ThreadingHTTPServer(('', 3004), Upload).serve_forever()
```

:::

PHP के लिए `fileinfo` एक्सटेंशन के साथ 8.2+, Node.js 20+, Python 3.9+ चाहिए; किसी को भी फ़्रेमवर्क के अलावा कोई पैकेज नहीं चाहिए।

### प्रोडक्शन में {#in-production}

- **एंडपॉइंट की सुरक्षा करें।** यह भेजी गई हर अनुमत फ़ाइल को संग्रहीत करता है: उसे अपने प्रमाणीकरण (एडिटर हर अनुरोध के साथ `upload` के `headers` भेजता है) और रेट लिमिट के पीछे रखें, जैसा ऊपर के Laravel रूट में है।
- **सर्वर की सीमाएँ।** वेब सर्वर और PHP को सबसे बड़ा वीडियो भी स्वीकार करना होगा: `client_max_body_size` (nginx), `upload_max_filesize` और `post_max_size` (PHP)। Python उदाहरण पूरा अनुरोध मेमोरी में पढ़ता है; बड़े वीडियो के लिए उसे डिस्क पर स्ट्रीम करें।
- **स्टोरेज।** फ़ाइलें ऐप के किसी फ़ोल्डर के बजाय ऑब्जेक्ट स्टोरेज में या CDN के पीछे रखें, और उन्हें `X-Content-Type-Options: nosniff` के साथ परोसें।
- **अनुपयोगी फ़ाइलें।** फ़ाइल चुनते ही संग्रहीत हो जाती है, भले डायलॉग रद्द हो जाए या चित्र बाद में हटा दिया जाए: जिन फ़ाइलों का कोई दस्तावेज़ उपयोग नहीं करता उन्हें साफ़ करें।
- **एक ही ओरिजिन या CORS।** एडिटर के अपने ओरिजिन पर मौजूद एंडपॉइंट को और कुछ नहीं चाहिए; दूसरे ओरिजिन पर एडिटर का ओरिजिन और आपके भेजे हेडर की अनुमति दें।
