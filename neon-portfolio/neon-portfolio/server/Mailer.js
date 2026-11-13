/** Sends each message to your Gmail (only when Gmail settings are provided). */
class Mailer {
  constructor({ user, password, to }) {
    this.user = user;
    this.password = password;
    this.to = to || user;
  }

  static fromEnv(env = process.env) {
    return new Mailer({ user: env.GMAIL_USER, password: env.GMAIL_APP_PASSWORD, to: env.MAIL_TO });
  }

  get enabled() {
    return Boolean(this.user && this.password);
  }

  async send(entry) {
    if (!this.enabled) return;
    const nodemailer = require("nodemailer");
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: { user: this.user, pass: this.password },
    });
    await transport.sendMail({
      from: this.user,
      to: this.to,
      replyTo: entry.email,
      subject: `Portfolio message from ${entry.name}`,
      text: `${entry.message}\n\n${entry.name} <${entry.email}>`,
    });
  }
}

module.exports = Mailer;
