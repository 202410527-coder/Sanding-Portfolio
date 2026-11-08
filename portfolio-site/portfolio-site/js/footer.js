/** Footer: page index label and back-to-top link. */
class Footer {
  constructor(indexEl, topEl) {
    this.indexEl = indexEl;
    topEl.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  setIndex(position) {
    this.indexEl.textContent = String(position).padStart(2, '0') + ' / Portfolio';
  }
}
