// Shared React helpers and the data models (classes) used across the site.
const { Component, PureComponent, createContext, createElement: h, createRef } = React;

/** One key on the skills keyboard. */
class Skill {
  constructor(symbol, name, color, textColor, key, level) {
    Object.assign(this, { symbol, name, color, textColor, key, level });
  }

  matchesKey(pressed) {
    return this.key === pressed.toLowerCase();
  }
}

/** One slide in a gallery (a certificate, a project, or a placeholder). */
class GalleryItem {
  constructor({
    title = "",
    note = "",
    story = "",
    img = "",
    tags = [],
    link = "",
    placeholder = false,
    empty = false,
  } = {}) {
    Object.assign(this, { title, note, story, img, tags, link, placeholder, empty });
  }

  get details() {
    return this.story || this.note;
  }

  matches(filter) {
    return filter === "all" || this.tags.includes(filter);
  }

  static from(data) {
    return data instanceof GalleryItem ? data : new GalleryItem(data);
  }

  static placeholders(count, makeTitle, note) {
    return Array.from(
      { length: count },
      (_, i) => new GalleryItem({ title: makeTitle(i + 1), note, placeholder: true }),
    );
  }

  static emptyResult(title) {
    return new GalleryItem({ title, placeholder: true, empty: true });
  }
}
