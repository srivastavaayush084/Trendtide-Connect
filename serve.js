import http from "node:http";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import handler from "./dist/server/server.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CLIENT_DIR = path.join(__dirname, "dist", "client");
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Common MIME types for static assets
const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
};

/**
 * Serve static files from dist/client if they exist.
 */
function tryServeStatic(req, res, pathname) {
  // Prevent directory traversal attacks
  const safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, "");
  const filePath = path.join(CLIENT_DIR, safePath);

  // Ensure filePath stays inside CLIENT_DIR
  if (!filePath.startsWith(CLIENT_DIR)) return false;

  try {
    const stats = fs.statSync(filePath);
    if (stats.isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || "application/octet-stream";

      res.writeHead(200, {
        "Content-Type": contentType,
        "Content-Length": stats.size,
        "Cache-Control": ext.startsWith(".js") || ext.startsWith(".css")
          ? "public, max-age=31536000, immutable"
          : "public, max-age=3600",
      });

      fs.createReadStream(filePath).pipe(res);
      return true;
    }
  } catch {
    // File not found, fall through to SSR
  }
  return false;
}

/**
 * Convert Node http.IncomingMessage into Web standard Request
 */
function createWebRequest(req) {
  const host = req.headers.host || `localhost:${PORT}`;
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const url = new URL(req.url || "/", `${protocol}://${host}`);

  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (Array.isArray(value)) {
      for (const v of value) headers.append(key, v);
    } else if (value) {
      headers.set(key, value);
    }
  }

  const options = {
    method: req.method,
    headers,
  };

  if (req.method !== "GET" && req.method !== "HEAD") {
    options.body = new ReadableStream({
      start(controller) {
        req.on("data", (chunk) => controller.enqueue(chunk));
        req.on("end", () => controller.close());
        req.on("error", (err) => controller.error(err));
      },
    });
    options.duplex = "half";
  }

  return new Request(url, options);
}

/**
 * Pipe Web standard Response to Node http.ServerResponse
 */
async function sendWebResponse(res, webRes) {
  const headers = {};
  webRes.headers.forEach((value, key) => {
    if (key === "set-cookie") {
      headers[key] = webRes.headers.getSetCookie();
    } else {
      headers[key] = value;
    }
  });

  res.writeHead(webRes.status, headers);

  if (webRes.body) {
    const reader = webRes.body.getReader();
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
    } finally {
      res.end();
    }
  } else {
    res.end();
  }
}

const server = http.createServer(async (req, res) => {
  const urlPath = req.url ? new URL(req.url, "http://localhost").pathname : "/";

  // 1. Try static assets first
  if (urlPath !== "/" && tryServeStatic(req, res, urlPath)) {
    return;
  }

  // 2. Fall back to SSR handler
  try {
    const webRequest = createWebRequest(req);
    const webResponse = await handler.fetch(webRequest, {}, {});
    await sendWebResponse(res, webResponse);
  } catch (err) {
    console.error("Unhandled SSR error:", err);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on http://0.0.0.0:${PORT}`);
});
