// Minimal static file server for the portfolio (Node built-ins only, no dependencies).
// Binds to 0.0.0.0 and honors the PORT env var injected by the hosting platform.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL(".", import.meta.url));
const PORT = Number(process.env.PORT) || 3000;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".pdf": "application/pdf",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".woff2": "font/woff2",
};

const server = createServer(async (req, res) => {
  try {
    const urlPath = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    let filePath = normalize(join(ROOT, urlPath === "/" ? "index.html" : urlPath));

    // Prevent path traversal outside the project root.
    if (!filePath.startsWith(ROOT)) {
      res.writeHead(403).end("Forbidden");
      return;
    }

    let info = await stat(filePath).catch(() => null);
    if (info && info.isDirectory()) {
      filePath = join(filePath, "index.html");
      info = await stat(filePath).catch(() => null);
    }
    if (!info || !info.isFile()) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("404 Not Found");
      return;
    }

    const type = MIME[extname(filePath).toLowerCase()] || "application/octet-stream";
    const body = await readFile(filePath);
    res.writeHead(200, {
      "Content-Type": type,
      "Content-Length": body.length,
      "Cache-Control": "no-cache",
    });
    res.end(body);
  } catch {
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" }).end("500 Internal Server Error");
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Portfolio server running at http://0.0.0.0:${PORT}`);
});