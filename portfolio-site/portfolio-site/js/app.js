/** Entry point: wires the components together. */
class App {
  constructor() {
    this.navigation = new Navigation(
      document.getElementById('nav'), document.getElementById('menu'));
    this.footer = new Footer(
      document.getElementById('idx'), document.getElementById('top'));
    this.contactForm = new ContactForm(
      document.getElementById('cform'), document.getElementById('note'));
    this.router = new Router(
      ['home', 'about', 'skills', 'contact', 'services'],
      (page) => this.onPageChange(page));
  }

  onPageChange(page) {
    this.navigation.setActive(page);
    this.footer.setIndex(this.router.indexOf(page) + 1);
  }

  start() {
    this.router.start();
  }
}

document.addEventListener('DOMContentLoaded', () => new App().start());
