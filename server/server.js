// Node.js server: shows the website, receives contact messages, counts CV downloads.
const express = require("express");
const path = require("path");
const JsonStore = require("./JsonStore");
const RateLimiter = require("./RateLimiter");
const Mailer = require("./Mailer");
const ContactController = require("./ContactController");
const DownloadController = require("./DownloadController");

class PortfolioServer {
  constructor({ port = process.env.PORT || 3000, root = path.join(__dirname, "..") } = {}) {
    this.port = port;
    this.root = root;
    this.app = express();
    this.contact = new ContactController({
      store: new JsonStore(path.join(__dirname, "messages.json"), []),
      limiter: new RateLimiter(5, 60 * 60 * 1000), // 5 messages per hour per visitor
      mailer: Mailer.fromEnv(),
    });
    this.downloads = new DownloadController(
      new JsonStore(path.join(__dirname, "downloads.json"), { total: 0, log: [] }),
    );
    this.setup();
  }

  setup() {
    this.app.set("trust proxy", 1);
    this.app.use(express.json({ limit: "10kb" }));
    this.app.use(this.securityHeaders);
    this.app.use(express.static(this.root));
    this.app.post("/api/contact", this.contact.handle);
    this.app.post("/api/cv", this.downloads.handle);
  }

  securityHeaders(req, res, next) {
    res.set({ "X-Content-Type-Options": "nosniff", "Referrer-Policy": "strict-origin-when-cross-origin" });
    next();
  }

  start() {
    this.app.listen(this.port, () => console.log(`Portfolio running at http://localhost:${this.port}`));
  }
}

new PortfolioServer().start();
