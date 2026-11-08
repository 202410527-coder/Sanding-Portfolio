/** Hash-based router: shows one page section at a time. */
class Router {
  constructor(pages, onChange) {
    this.pages = pages;
    this.onChange = onChange;
    this.current = null;
  }

  start() {
    window.addEventListener('hashchange', () => this.resolve());
    this.resolve();
  }

  resolve() {
    const hash = (location.hash || '#home').slice(1);
    this.current = this.pages.includes(hash) ? hash : 'home';
    this.pages.forEach((p) =>
      document.getElementById(p).classList.toggle('on', p === this.current));
    this.onChange(this.current);
    window.scrollTo(0, 0);
  }

  indexOf(page) {
    return this.pages.indexOf(page);
  }
}
