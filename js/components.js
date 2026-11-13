// Page parts. Every part is a class that draws one piece of the website.

/** Base class: gives each part the translate function as this.t */
class TranslatedComponent extends Component {
  static contextType = LangContext;

  get t() {
    return this.context.t;
  }
}

/** A page section that fades in when it scrolls into view. */
class Section extends Component {
  state = { seen: false };
  ref = createRef();

  componentDidMount() {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        this.setState({ seen: true });
        this.observer.disconnect();
      },
      { threshold: 0.15 },
    );
    this.observer.observe(this.ref.current);
  }

  componentWillUnmount() {
    this.observer.disconnect();
  }

  render() {
    const { id, title, children, centered } = this.props;
    return h(
      "section",
      {
        id,
        ref: this.ref,
        className: "reveal" + (this.state.seen ? " in" : "") + (centered ? " center" : ""),
      },
      title && h("h2", null, title),
      children,
    );
  }
}

class Brand extends PureComponent {
  render() {
    return h("a", { href: "#home", className: "logo" }, "Neon", h("span", { className: "dot" }, "."));
  }
}

class Icon extends PureComponent {
  static SHAPES = {
    instagram: [
      ["rect", { x: 3, y: 3, width: 18, height: 18, rx: 5 }],
      ["circle", { cx: 12, cy: 12, r: 4 }],
      ["circle", { cx: 17.5, cy: 6.5, r: 0.6 }],
    ],
    facebook: [["path", { d: "M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" }]],
    tiktok: [["path", { d: "M14 3v11a4 4 0 1 1-4-4M14 3c0 3 2 5 5 5" }]],
    gmail: [
      ["rect", { x: 3, y: 5, width: 18, height: 14, rx: 2 }],
      ["polyline", { points: "3,7 12,13 21,7" }],
    ],
  };

  render() {
    const svgProps = {
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.8,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      width: 22,
      height: 22,
      viewBox: "0 0 24 24",
      "aria-hidden": true,
    };
    return h(
      "svg",
      svgProps,
      Icon.SHAPES[this.props.name].map(([tag, attrs], i) => h(tag, { key: i, ...attrs })),
    );
  }
}

class Socials extends PureComponent {
  render() {
    return h(
      "div",
      { className: "social" },
      SOCIAL.map(([name, label, href]) =>
        h(
          "a",
          {
            key: name,
            href,
            "aria-label": label,
            title: label,
            target: /^http/.test(href) ? "_blank" : undefined,
            rel: "noopener noreferrer",
          },
          h(Icon, { name }),
        ),
      ),
    );
  }
}

/** Types the job titles one letter at a time. */
class Typer extends Component {
  static WORDS = ["UI/UX Designer", "Front-End Developer"];
  state = { text: "" };
  wordIndex = 0;
  length = 0;
  deleting = false;

  componentDidMount() {
    this.timer = setTimeout(this.tick, 600);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  tick = () => {
    const word = Typer.WORDS[this.wordIndex];
    this.length += this.deleting ? -1 : 1;
    this.setState({ text: word.slice(0, this.length) });
    let delay = this.deleting ? 45 : 90;
    if (!this.deleting && this.length === word.length) {
      this.deleting = true;
      delay = 1400;
    } else if (this.deleting && this.length === 0) {
      this.deleting = false;
      this.wordIndex = (this.wordIndex + 1) % Typer.WORDS.length;
      delay = 350;
    }
    this.timer = setTimeout(this.tick, delay);
  };

  render() {
    return h(
      "div",
      { className: "role pop", style: { animationDelay: ".35s" } },
      h("b", null, this.state.text),
      h("span", { className: "caret" }),
    );
  }
}

/** A number that counts up when it scrolls into view. */
class Count extends Component {
  state = { value: 0 };
  ref = createRef();

  componentDidMount() {
    this.observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      this.observer.disconnect();
      this.animate();
    });
    this.observer.observe(this.ref.current);
  }

  componentWillUnmount() {
    this.observer.disconnect();
    cancelAnimationFrame(this.frame);
  }

  animate() {
    let start = null;
    const step = (time) => {
      start = start ?? time;
      const progress = Math.min((time - start) / 1200, 1);
      this.setState({ value: Math.round(this.props.to * (1 - (1 - progress) ** 3)) });
      if (progress < 1) this.frame = requestAnimationFrame(step);
    };
    this.frame = requestAnimationFrame(step);
  }

  render() {
    return h("span", { ref: this.ref }, this.state.value);
  }
}

/** The 3D keyboard. Click a key, or type it on your real keyboard. */
class Skills extends TranslatedComponent {
  state = { picked: null, pressed: null, soundOn: true };

  componentDidMount() {
    addEventListener("keydown", this.onKeyDown);
  }

  componentWillUnmount() {
    removeEventListener("keydown", this.onKeyDown);
  }

  onKeyDown = (event) => {
    const typing = /INPUT|TEXTAREA/.test(event.target.tagName);
    if (typing || event.ctrlKey || event.metaKey || event.altKey) return;
    const index = SKILLS.findIndex((skill) => skill.matchesKey(event.key));
    if (index > -1) this.press(index);
  };

  press = (index) => {
    this.setState({ picked: index, pressed: index });
    setTimeout(() => this.setState({ pressed: null }), 160);
    keySound.play();
  };

  toggleSound = () => this.setState({ soundOn: keySound.toggle() });

  scrollToContact = () => {
    keySound.play();
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
  };

  renderKey(skill, index) {
    const { picked, pressed } = this.state;
    const className = "cap" + (picked === index ? " on" : "") + (pressed === index ? " dn" : "");
    const style = { "--k": skill.color, "--t": skill.textColor, "--h0": (index < 4 ? 12 : 8) + "px" };
    return h(
      "button",
      { key: skill.name, className, style, onClick: () => this.press(index), "aria-label": skill.name },
      h(
        "span",
        null,
        h("b", { className: "gl" }, skill.symbol),
        h("small", null, skill.name),
        h("kbd", null, skill.key.toUpperCase()),
      ),
    );
  }

  renderTip() {
    const { t } = this;
    const { picked } = this.state;
    if (picked === null) return t("skTip");
    const skill = SKILLS[picked];
    return [
      h(
        "strong",
        { key: "name" },
        skill.name,
        " ",
        h("em", { className: "lvl" }, t("levels")[skill.level - 1]),
      ),
      t("sk")[picked],
    ];
  }

  render() {
    const { t } = this;
    const spaceStyle = { "--k": "#d9c8fa", "--t": "#0d0c11" };
    return h(
      Section,
      { id: "skills", title: t("skills") },
      h("p", null, t("skIntro")),
      h(
        "div",
        { className: "stage" },
        h(
          "div",
          { className: "case" },
          h(
            "div",
            { className: "keys" },
            SKILLS.map((skill, i) => this.renderKey(skill, i)),
            h(
              "button",
              { className: "cap space", style: spaceStyle, onClick: this.scrollToContact },
              h("span", null, t("skWork")),
            ),
          ),
        ),
      ),
      h("div", { className: "tip", role: "status" }, this.renderTip()),
      h(
        "div",
        { style: { textAlign: "center", marginTop: 14 } },
        h(
          "button",
          { className: "toggle", onClick: this.toggleSound },
          t(this.state.soundOn ? "soundOn" : "soundOff"),
        ),
      ),
    );
  }
}

/** The pop-up that shows a certificate or project bigger, with back / next buttons. */
class Lightbox extends TranslatedComponent {
  state = { index: this.props.index };

  componentDidMount() {
    addEventListener("keydown", this.onKeyDown);
    document.body.style.overflow = "hidden";
  }

  componentWillUnmount() {
    removeEventListener("keydown", this.onKeyDown);
    document.body.style.overflow = "";
  }

  step = (amount) => {
    const count = this.props.items.length;
    this.setState(({ index }) => ({ index: (index + amount + count) % count }));
  };

  onKeyDown = (event) => {
    if (event.key === "Escape") this.props.onClose();
    if (event.key === "ArrowRight") this.step(1);
    if (event.key === "ArrowLeft") this.step(-1);
  };

  renderImage(item) {
    return h(
      "a",
      {
        className: "lbimg",
        href: item.img,
        target: "_blank",
        rel: "noopener noreferrer",
        title: this.t("openFull"),
      },
      h("img", { src: item.img, alt: item.title }),
    );
  }

  renderNav() {
    const { items } = this.props;
    if (items.length < 2) return null;
    return h(
      "div",
      { className: "lbfoot" },
      h("button", { className: "arrow", "aria-label": "Previous", onClick: () => this.step(-1) }, "←"),
      h("span", null, `${this.state.index + 1} / ${items.length}`),
      h("button", { className: "arrow", "aria-label": "Next", onClick: () => this.step(1) }, "→"),
    );
  }

  render() {
    const { items, onClose } = this.props;
    const item = items[this.state.index];
    return h(
      "div",
      { className: "lb", onClick: onClose, role: "dialog", "aria-modal": "true", "aria-label": item.title },
      h(
        "div",
        { className: "lbbox", onClick: (event) => event.stopPropagation() },
        h("button", { className: "arrow lbx", onClick: onClose, "aria-label": this.t("close") }, "✕"),
        item.img && this.renderImage(item),
        h("h3", null, item.title),
        item.tags.length > 0 &&
          h(
            "div",
            { className: "tags" },
            item.tags.map((tag) => h("span", { key: tag }, tag)),
          ),
        h("p", null, item.details),
        item.link &&
          h(
            "a",
            { className: "btn", href: item.link, target: "_blank", rel: "noopener noreferrer" },
            this.t("visit"),
          ),
        this.renderNav(),
      ),
    );
  }
}

/** A swipeable gallery with arrows, dots, filters, autoplay, click-to-view and a description. */
class Gallery extends TranslatedComponent {
  static AUTOPLAY_MS = 4500;
  static FILTERS = [
    ["all", "fAll"],
    ["UI Design", "fUI"],
    ["Websites", "fWeb"],
    ["Graphics", "fGfx"],
  ];

  state = { filter: "all", active: 0 };
  track = createRef();
  drag = null;
  paused = false;
  moved = false;
  items = this.props.items.map(GalleryItem.from);

  componentDidMount() {
    this.timer = setInterval(this.autoplay, Gallery.AUTOPLAY_MS);
  }

  componentDidUpdate(_, prevState) {
    if (prevState.filter === this.state.filter) return;
    this.setState({ active: 0 });
    this.track.current.scrollTo({ left: 0 });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  get isCertificates() {
    return this.props.kind === "c";
  }

  get slides() {
    const { t } = this;
    const { items } = this;
    if (!items.length) {
      const makeTitle = (n) => `${t(this.isCertificates ? "nCert" : "nProj")} ${n}`;
      return GalleryItem.placeholders(3, makeTitle, t(this.isCertificates ? "dCert" : "dProj"));
    }
    const shown = items.filter((item) => item.matches(this.state.filter));
    return shown.length ? shown : [GalleryItem.emptyResult(t("fNone"))];
  }

  nearestIndex() {
    const track = this.track.current;
    const middle = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let bestDistance = Infinity;
    [...track.children].forEach((slide, i) => {
      const distance = Math.abs(slide.offsetLeft + slide.offsetWidth / 2 - middle);
      if (distance < bestDistance) [best, bestDistance] = [i, distance];
    });
    return best;
  }

  goTo(index) {
    const track = this.track.current;
    const target = Math.max(0, Math.min(this.slides.length - 1, index));
    const slide = track.children[target];
    track.scrollTo({
      left: slide.offsetLeft + slide.offsetWidth / 2 - track.clientWidth / 2,
      behavior: "smooth",
    });
  }

  /** Opens the big viewer on this slide (placeholders are skipped). */
  openSlide(slide) {
    const real = this.slides.filter((item) => !item.placeholder);
    this.props.onOpen(real, real.indexOf(slide));
  }

  autoplay = () => {
    const count = this.slides.length;
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const modalOpen = document.body.style.overflow === "hidden";
    if (!this.props.items.length || count < 2 || this.paused || modalOpen || reduceMotion) return;
    this.goTo(this.state.active >= count - 1 ? 0 : this.state.active + 1);
  };

  setPaused = (value) => () => {
    this.paused = value;
  };

  onScroll = () => this.setState({ active: this.nearestIndex() });

  onKeyDown = (event) => {
    if (event.key === "Enter" && this.state.active < this.slides.length) {
      const slide = this.slides[this.state.active];
      if (!slide.placeholder) this.openSlide(slide);
      return;
    }
    const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    this.goTo(this.state.active + step);
  };

  onPointerDown = (event) => {
    this.moved = false;
    if (event.pointerType !== "mouse") return;
    const track = this.track.current;
    this.drag = { x: event.clientX, left: track.scrollLeft };
    track.classList.add("drag");
    track.setPointerCapture(event.pointerId);
  };

  onPointerMove = (event) => {
    if (!this.drag) return;
    if (Math.abs(event.clientX - this.drag.x) > 5) this.moved = true;
    this.track.current.scrollLeft = this.drag.left - (event.clientX - this.drag.x);
  };

  onPointerUp = () => {
    if (!this.drag) return;
    this.drag = null;
    this.track.current.classList.remove("drag");
    this.goTo(this.nearestIndex());
  };

  onSlideClick(slide, index) {
    if (this.moved) return;
    if (index === this.state.active && !slide.placeholder) this.openSlide(slide);
    else this.goTo(index);
  }

  slideLabel(slide) {
    if (slide.empty || !slide.placeholder) return slide.title;
    return this.t(this.isCertificates ? "phCert" : "phProj");
  }

  renderTabs() {
    return h(
      "div",
      { className: "tabs", role: "tablist" },
      Gallery.FILTERS.map(([key, label]) =>
        h(
          "button",
          {
            key,
            role: "tab",
            "aria-selected": this.state.filter === key,
            className: "tab" + (this.state.filter === key ? " on" : ""),
            onClick: () => this.setState({ filter: key }),
          },
          this.t(label),
        ),
      ),
    );
  }

  renderSlide(slide, index) {
    const { t } = this;
    const className =
      "slide" +
      (index === this.state.active ? " act" : "") +
      (slide.placeholder ? " ph" : "") +
      (this.isCertificates ? " certs" : "");
    const content = slide.img
      ? h("img", { src: slide.img, alt: slide.title, draggable: false, loading: "lazy" })
      : h("div", null, !slide.empty && h("i", null, "＋"), this.slideLabel(slide));
    return h(
      "div",
      { key: this.state.filter + index, className, onClick: () => this.onSlideClick(slide, index) },
      content,
      slide.link && h("span", { className: "live" }, t("live")),
      !slide.placeholder && h("span", { className: "hint" }, t("clickView")),
    );
  }

  /** The buttons under the description: view bigger, and visit the website. */
  renderActions(current) {
    if (current.placeholder) return null;
    const { t } = this;
    return h(
      "div",
      { className: "actions" },
      h(
        "button",
        { className: "btn ghost", onClick: () => this.openSlide(current) },
        "🔍 " + t(this.isCertificates ? "viewCert" : "viewProj"),
      ),
      current.link &&
        h(
          "a",
          { className: "btn", href: current.link, target: "_blank", rel: "noopener noreferrer" },
          t("visit"),
        ),
    );
  }

  render() {
    const { title, filtered } = this.props;
    const { filter, active } = this.state;
    const slides = this.slides;
    const current = slides[active] || slides[0];
    const trackProps = {
      className: "track",
      ref: this.track,
      tabIndex: 0,
      "aria-label": title,
      onKeyDown: this.onKeyDown,
      onScroll: this.onScroll,
      onPointerDown: this.onPointerDown,
      onPointerMove: this.onPointerMove,
      onPointerUp: this.onPointerUp,
      onPointerCancel: this.onPointerUp,
    };
    return h(
      "div",
      {
        className: "gal",
        onMouseEnter: this.setPaused(true),
        onMouseLeave: this.setPaused(false),
        onTouchStart: this.setPaused(true),
        onFocus: this.setPaused(true),
        onBlur: this.setPaused(false),
      },
      h("h3", null, title),
      filtered && this.renderTabs(),
      h(
        "div",
        trackProps,
        slides.map((slide, i) => this.renderSlide(slide, i)),
      ),
      h(
        "div",
        { className: "gctl" },
        h(
          "button",
          { className: "arrow", "aria-label": "Previous", onClick: () => this.goTo(active - 1) },
          "←",
        ),
        h(
          "div",
          { className: "dots" },
          slides.map((_, i) => h("i", { key: i, className: i === active ? "on" : "" })),
        ),
        h("button", { className: "arrow", "aria-label": "Next", onClick: () => this.goTo(active + 1) }, "→"),
      ),
      h(
        "div",
        { className: "desc", key: filter + active },
        h("h4", null, current.empty ? "" : current.title),
        h("p", null, current.note),
        current.tags.length > 0 &&
          h(
            "div",
            { className: "tags" },
            current.tags.map((tag) => h("span", { key: tag }, tag)),
          ),
        this.renderActions(current),
      ),
    );
  }
}

class Timeline extends TranslatedComponent {
  get entries() {
    if (TIMELINE.length) return TIMELINE;
    const placeholder = { placeholder: true, title: this.t("tlPh"), note: this.t("tlPh2") };
    return [
      { ...placeholder, when: "2020 – 2024" },
      { ...placeholder, when: "2024 – now" },
    ];
  }

  render() {
    return h(
      "div",
      { className: "gal" },
      h("h3", null, this.t("timeline")),
      h(
        "ol",
        { className: "tl" },
        this.entries.map((entry, i) =>
          h(
            "li",
            { key: i, className: entry.placeholder ? "ph" : "" },
            h("small", null, entry.when),
            h("b", null, entry.title),
            h("span", null, entry.note),
          ),
        ),
      ),
    );
  }
}

class Testimonials extends TranslatedComponent {
  render() {
    const cards = TESTIMONIALS.length
      ? TESTIMONIALS.map((item, i) =>
          h(
            "blockquote",
            { key: i, className: "card quote" },
            h("p", null, `“${item.quote}”`),
            h("cite", null, item.name),
          ),
        )
      : h("blockquote", { className: "card quote ph" }, h("p", null, this.t("testPh")));
    return h(
      "div",
      { className: "gal" },
      h("h3", null, this.t("tests")),
      h("div", { className: "grid" }, cards),
    );
  }
}

class AboutSection extends TranslatedComponent {
  renderLearning() {
    return h(
      "p",
      { className: "learn" },
      h("b", null, this.t("learning") + ": "),
      LEARNING.map((item) => h("span", { key: item, className: "pill" }, item)),
    );
  }

  renderStats() {
    const stats = [
      [SKILLS.length, "stTools"],
      [PROJECTS.length, "stProjects"],
      [CERTS.length, "stCerts"],
    ];
    return h(
      "div",
      { className: "stats" },
      stats.map(([count, label]) =>
        h(
          "div",
          { className: "stat", key: label },
          h("b", null, h(Count, { to: count })),
          h("span", null, this.t(label)),
        ),
      ),
    );
  }

  render() {
    const { t } = this;
    const { onOpen } = this.props;
    return h(
      Section,
      { id: "about", title: t("about"), centered: true },
      h(
        "div",
        { className: "about-grid" },
        h("div", { className: "about-side" }, this.renderStats()),
        h(
          "div",
          { className: "about-text" },
          h("p", null, t("aboutP1")),
          h("p", null, t("aboutP2")),
          LEARNING.length > 0 && this.renderLearning(),
        ),
      ),
      h(Timeline),
      h(Gallery, { title: t("certs"), items: CERTS, kind: "c", onOpen }),
      h(Gallery, { title: t("projects"), items: PROJECTS, kind: "p", filtered: true, onOpen }),
      h(Testimonials),
    );
  }
}

class ServicesSection extends TranslatedComponent {
  render() {
    return h(
      Section,
      { id: "services", title: this.t("services") },
      h(
        "div",
        { className: "grid" },
        this.t("svc").map(([title, text], i) =>
          h(
            "div",
            { className: "card", key: title },
            h("div", { className: "icon" }, SERVICE_ICONS[i]),
            h("h3", null, title),
            h("p", null, text),
          ),
        ),
      ),
    );
  }
}

class Contact extends TranslatedComponent {
  state = { status: "idle" };

  onSubmit = async (event) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.target));
    this.setState({ status: "sending" });
    try {
      await contactService.send(payload);
      this.setState({ status: "sent" });
    } catch (error) {
      this.setState({ status: "error" });
    }
  };

  renderSent() {
    return h(
      "div",
      { className: "sent", role: "status" },
      h(
        "svg",
        { viewBox: "0 0 52 52", width: 56, height: 56 },
        h("circle", { cx: 26, cy: 26, r: 24, fill: "none", stroke: "currentColor", strokeWidth: 2 }),
        h("path", {
          d: "M15 27l8 8 14-16",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: 3,
          strokeLinecap: "round",
          strokeLinejoin: "round",
        }),
      ),
      h("p", { className: "ok" }, this.t("ctOk")),
    );
  }

  renderForm() {
    const { t } = this;
    const sending = this.state.status === "sending";
    return h(
      "form",
      { onSubmit: this.onSubmit },
      h(
        "label",
        null,
        t("ctName"),
        h("input", {
          name: "name",
          required: true,
          maxLength: 100,
          autoComplete: "name",
          placeholder: t("ctPhN"),
        }),
      ),
      h(
        "label",
        null,
        t("ctEmail"),
        h("input", {
          name: "email",
          required: true,
          type: "email",
          maxLength: 150,
          autoComplete: "email",
          placeholder: t("ctPhE"),
        }),
      ),
      h(
        "label",
        null,
        t("ctMsg"),
        h("textarea", { name: "message", required: true, rows: 5, maxLength: 2000, placeholder: t("ctPhM") }),
      ),
      h("input", {
        name: "website",
        className: "hp",
        tabIndex: -1,
        autoComplete: "off",
        "aria-hidden": "true",
      }),
      h(
        "button",
        { className: "btn", type: "submit", disabled: sending },
        t(sending ? "ctSending" : "ctSend"),
      ),
      this.state.status === "error" && h("p", { className: "err", role: "alert" }, t("ctErr")),
    );
  }

  render() {
    return h(
      Section,
      { id: "contact", title: this.t("contact") },
      OPEN_TO_WORK && h("div", { className: "badge" }, h("i"), this.t("avail")),
      h("p", { style: { marginBottom: 20 } }, this.t("ctIntro")),
      this.state.status === "sent" ? this.renderSent() : this.renderForm(),
    );
  }
}

class Footer extends TranslatedComponent {
  render() {
    const { t } = this;
    return h(
      "footer",
      null,
      h(
        "div",
        { className: "fgrid" },
        h(Brand),
        h(
          "div",
          { role: "navigation", "aria-label": t("quick"), className: "flinks" },
          SECTIONS.map((id) => h("a", { key: id, href: "#" + id }, t(id))),
        ),
        h(Socials),
        h("a", { href: "#home", className: "btn ghost top" }, "↑ " + t("top")),
      ),
      h("p", { className: "copy" }, "© 2026 Neon M. Sanding. " + t("foot")),
    );
  }
}
