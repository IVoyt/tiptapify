# Uploads {#uploads}

Die Bild- und Video-Dialoge nehmen neben einem Link auch eine Datei vom Computer entgegen. Der Editor hat keinen eigenen Speicher, daher hängt es von der Prop `upload` ab, wohin eine gewählte Datei geht:

| | ohne `upload` | mit `upload` |
|---|---|---|
| **Bild** (und ein Video-Poster) | als base64-Data-URL ins Dokument eingebettet | an deinen Endpunkt gesendet; das Dokument behält seine URL |
| **Videodatei** | kein Upload: Ein Video wird über seinen Link eingefügt (YouTube, Vimeo, eine Datei-URL) | an deinen Endpunkt gesendet; das Dokument behält seine URL |
| **Bild der Link-Karte** | die Karte verlinkt das eigene Bild der Seite | ebenfalls bei deinem Endpunkt gespeichert (eine Seite kann ihr Bild ändern oder entfernen) |

Ist `upload` gesetzt, werden base64-Bilder beim Laden eines Dokuments verworfen, sodass der Inhalt nur Links enthält.

```vue
<Tiptapify
  :upload="{ endpoint: '/api/uploads', headers: { Authorization: `Bearer ${token}` } }"
/>
```

Die Option **Hochladen** des Video-Dialogs erscheint, sobald `upload` einen `endpoint` hat; der Bild-Dialog hat sie immer.

## Der Endpunkt-Vertrag {#the-endpoint-contract}

`POST {endpoint}` mit einem `multipart/form-data`-Body aus zwei Feldern, gesendet mit `Accept: application/json` und deinen `headers`:

| field | value |
|---|---|
| `file` | die gewählte Datei |
| `kind` | `image` oder `video` |

Der Fortschrittsbalken des Dialogs folgt dem Upload der Anfrage, und **Abbrechen** bricht ihn ab.

Eine gespeicherte Datei antwortet mit einem `2xx`-Status und ihrer URL, die unverändert ins Dokument übernommen wird (eine absolute URL oder ein Pfad auf deiner Website):

```http
HTTP/1.1 201 Created
Content-Type: application/json

{ "url": "https://example.com/uploads/3ebff0ac73c2db524d009ad01d2c6e00.png" }
```

Eine abgelehnte Datei antwortet mit einem `4xx`/`5xx`-Status und `{ "error": "…" }` (`413` für eine zu große Datei, `422` für einen nicht erlaubten Typ). Der Dialog zeigt diese Meldung und bleibt offen; ohne sie (oder wenn der Endpunkt nicht antwortet) sagt er in seiner eigenen Sprache, dass die Datei nicht hochgeladen werden konnte.

## Beispiel-Endpunkte {#example-endpoints}

Die folgenden Beispiele verhalten sich gleich, wähle also das für deinen Stack:

- Eine Datei wird nach **ihrem Inhalt** akzeptiert, nicht nach ihrem Namen oder dem Typ, den der Browser sendet: Eine HTML-Seite namens `photo.png` wird abgelehnt. Bilder: JPEG, PNG, GIF, WebP, AVIF (kein SVG, es kann Skripte enthalten). Videos: MP4, WebM, Ogg, QuickTime.
- Bilder bis 10 MB, Videos bis 200 MB; eine größere Datei antwortet mit `413`.
- Die Datei wird unter einem **zufälligen Namen** mit der Endung ihres Typs gespeichert, nie unter dem Namen, mit dem sie kam.
- Die Antwort ist `201 { "url": … }`; ein fehlendes Feld oder ein abgelehnter Typ antwortet mit `422`.
- Die Beispiele für Node.js und Python liefern die gespeicherten Dateien ebenfalls aus (`GET /uploads/<name>`, mit `X-Content-Type-Options: nosniff`); PHP und Laravel überlassen das dem Webserver.

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

PHP benötigt 8.2+ mit der Erweiterung `fileinfo`, Node.js 20+, Python 3.9+; keines davon braucht ein Paket über das Framework hinaus.

### In der Produktion {#in-production}

- **Schütze den Endpunkt.** Er speichert jede erlaubte Datei, die ihm gesendet wird: Setze ihn hinter deine Authentifizierung (der Editor sendet die `headers` von `upload` mit jeder Anfrage) und ein Rate Limit, wie bei der Laravel-Route oben.
- **Limits des Servers.** Der Webserver und PHP müssen auch das größte Video annehmen: `client_max_body_size` (nginx), `upload_max_filesize` und `post_max_size` (PHP). Das Python-Beispiel liest die ganze Anfrage in den Speicher; streame sie bei großen Videos auf die Festplatte.
- **Speicher.** Lege die Dateien in einem Objektspeicher oder hinter einem CDN ab statt in einem Ordner der App, und liefere sie mit `X-Content-Type-Options: nosniff` aus.
- **Ungenutzte Dateien.** Eine Datei wird gespeichert, sobald sie gewählt wird, auch wenn der Dialog abgebrochen oder das Bild später gelöscht wird: Räume die Dateien auf, auf die kein Dokument verweist.
- **Gleicher Origin oder CORS.** Ein Endpunkt auf dem eigenen Origin des Editors braucht nichts weiter; bei einem anderen Origin erlaube den Origin des Editors und die Header, die du sendest.
