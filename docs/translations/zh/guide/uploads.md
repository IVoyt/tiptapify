# 上传 {#uploads}

图片和视频对话框既可以接收链接，也可以接收来自电脑的文件。编辑器本身没有存储功能，因此选取的文件去向取决于 `upload` 属性：

| | 不设置 `upload` | 设置 `upload` |
|---|---|---|
| **图片**（以及视频封面） | 以 base64 data URL 的形式嵌入文档 | 发送到你的端点；文档保留其 URL |
| **视频文件** | 不上传：视频通过其链接插入（YouTube、Vimeo、文件 URL） | 发送到你的端点；文档保留其 URL |
| **链接卡片图片** | 卡片链接到页面自己的图片 | 同样存储到你的端点（页面可能会更改或删除其图片） |

设置 `upload` 后，文档加载时会丢弃 base64 图片，因此内容只保留链接。

```vue
<Tiptapify
  :upload="{ endpoint: '/api/uploads', headers: { Authorization: `Bearer ${token}` } }"
/>
```

只要 `upload` 带有 `endpoint`，视频对话框的**上传**选项就会显示；图片对话框则始终有该选项。

## 端点约定 {#the-endpoint-contract}

`POST {endpoint}`，请求体为包含两个字段的 `multipart/form-data`，并带有 `Accept: application/json` 和你的 `headers`：

| 字段 | 值 |
|---|---|
| `file` | 选取的文件 |
| `kind` | `image` 或 `video` |

对话框的进度条会跟随请求的上传进度，**取消**会中止上传。

已存储的文件以 `2xx` 状态码响应其 URL，该 URL 会原样写入文档（绝对 URL 或你站点上的路径）：

```http
HTTP/1.1 201 Created
Content-Type: application/json

{ "url": "https://example.com/uploads/3ebff0ac73c2db524d009ad01d2c6e00.png" }
```

被拒绝的文件以 `4xx`/`5xx` 状态码响应 `{ "error": "…" }`（文件过大为 `413`，类型不允许为 `422`）。对话框会显示该消息并保持打开；如果没有消息（或端点没有响应），它会用自己的语言提示文件无法上传。

## 端点示例 {#example-endpoints}

下面的示例行为一致，请选择与你的技术栈对应的一个：

- 文件是否被接受取决于**其内容**，而不是文件名或浏览器发送的类型：名为 `photo.png` 的 HTML 页面会被拒绝。图片：JPEG、PNG、GIF、WebP、AVIF（不含 SVG，因为它可能携带脚本）。视频：MP4、WebM、Ogg、QuickTime。
- 图片最大 10 MB，视频最大 200 MB；更大的文件返回 `413`。
- 文件以**随机名称**存储，扩展名取自其类型，绝不使用其原始名称。
- 响应为 `201 { "url": … }`；缺少字段或类型被拒绝时返回 `422`。
- Node.js 和 Python 示例也会提供已存储文件的访问（`GET /uploads/<name>`，并带有 `X-Content-Type-Options: nosniff`）；PHP 和 Laravel 则交由 Web 服务器处理。

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

PHP 需要 8.2+ 并启用 `fileinfo` 扩展，Node.js 需要 20+，Python 需要 3.9+；除框架本身外，它们都不需要额外的包。

### 生产环境 {#in-production}

- **保护端点。**它会存储收到的任何允许的文件：请将其置于你的身份验证（编辑器会在每个请求中发送 `upload` 的 `headers`）和速率限制之后，就像上面的 Laravel 路由那样。
- **服务器的限制。**Web 服务器和 PHP 必须也能接收最大的视频：`client_max_body_size`（nginx）、`upload_max_filesize` 和 `post_max_size`（PHP）。Python 示例会把整个请求读入内存；对于大视频，请改为流式写入磁盘。
- **存储。**请将文件放在对象存储中或 CDN 之后，而不是应用的某个文件夹里，并使用 `X-Content-Type-Options: nosniff` 提供访问。
- **未使用的文件。**文件在选取后即被存储，即使之后取消了对话框或删除了图片也是如此：请清理没有任何文档引用的文件。
- **同源或 CORS。**位于编辑器同源的端点无需其他配置；位于其他源时，请允许编辑器的源以及你发送的请求头。
