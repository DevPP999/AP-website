// Minimal Next.js custom server for Plesk/Passenger
// Passenger sets PORT automatically; we just bind to it.
import { createServer } from "http";
import { parse } from "url";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const port = process.env.PORT || 3000;
const host = process.env.HOST || "0.0.0.0";

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, host, (err) => {
    if (err) throw err;
    console.log(`Next.js server running on http://${host}:${port}`);
  });
});
