/** Handles messages from the contact form. */
class ContactController {
  static EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

  constructor({ store, limiter, mailer }) {
    this.store = store;
    this.limiter = limiter;
    this.mailer = mailer;
  }

  isValid({ name, email, message }) {
    return Boolean(name && message && email && ContactController.EMAIL_PATTERN.test(email));
  }

  toEntry({ name, email, message }) {
    return {
      name: String(name).slice(0, 100),
      email: String(email).slice(0, 150),
      message: String(message).slice(0, 2000),
      date: new Date().toISOString(),
    };
  }

  handle = async (req, res) => {
    const body = req.body || {};
    if (body.website) return res.json({ ok: true }); // hidden field filled = a bot
    if (!this.limiter.allow(req.ip))
      return res.status(429).json({ error: "Too many messages. Please try later." });
    if (!this.isValid(body))
      return res.status(400).json({ error: "Please fill in every field with a valid email." });

    const entry = this.toEntry(body);
    this.store.update((messages) => messages.push(entry));
    try {
      await this.mailer.send(entry);
    } catch (error) {
      console.error("Email failed (message was still saved):", error.message);
    }
    res.json({ ok: true });
  };
}

module.exports = ContactController;
