/** Header navigation: active-link state and mobile menu. */
class Navigation {
  constructor(navEl, menuBtn) {
    this.nav = navEl;
    this.menuBtn = menuBtn;
    this.links = navEl.querySelectorAll('a.l');
    this.menuBtn.addEventListener('click', () => this.toggle());
  }

  setActive(page) {
    this.links.forEach((a) => {
      if (a.dataset.p === page) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    this.close();
  }

  toggle() {
    const open = this.nav.classList.toggle('open');
    this.menuBtn.setAttribute('aria-expanded', open);
  }

  close() {
    this.nav.classList.remove('open');
    this.menuBtn.setAttribute('aria-expanded', 'false');
  }
}
