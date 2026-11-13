// The main page: puts all the parts together and keeps the shared settings.

/** Thin line at the top that fills as you scroll. */
class Progress extends Component {
  ref = createRef();

  componentDidMount() {
    addEventListener("scroll", this.update, { passive: true });
    this.update();
  }

  componentWillUnmount() {
    removeEventListener("scroll", this.update);
  }

  update = () => {
    const scrollable = document.documentElement.scrollHeight - innerHeight;
    this.ref.current.style.transform = `scaleX(${scrollable > 0 ? scrollY / scrollable : 0})`;
  };

  render() {
    return h("div", { className: "prog", ref: this.ref });
  }
}

class CursorView extends Component {
  dot = createRef();
  ring = createRef();

  componentDidMount() {
    if (!CursorFollower.supported()) return;
    this.follower = new CursorFollower(this.dot.current, this.ring.current);
    this.follower.start();
  }

  componentWillUnmount() {
    if (this.follower) this.follower.stop();
  }

  render() {
    return h(
      React.Fragment,
      null,
      h("div", { className: "cdot", ref: this.dot }),
      h("div", { className: "cring", ref: this.ring }),
    );
  }
}

class Loader extends PureComponent {
  render() {
    return h(
      "div",
      { className: "load" + (this.props.done ? " out" : ""), "aria-hidden": "true" },
      h("span", { className: "loadlogo" }, "Neon", h("b", null, ".")),
    );
  }
}

class Navbar extends TranslatedComponent {
  render() {
    const { t } = this;
    const { active, menuOpen, theme, label, onToggleMenu, onCloseMenu, onToggleLang, onToggleTheme } =
      this.props;
    const links = SECTIONS.map((id) =>
      h("a", { key: id, href: "#" + id, className: active === id ? "act" : "", onClick: onCloseMenu }, t(id)),
    );
    return h(
      "nav",
      null,
      h(Brand),
      h(
        "button",
        { className: "burger", "aria-label": "Menu", "aria-expanded": menuOpen, onClick: onToggleMenu },
        menuOpen ? "✕" : "☰",
      ),
      h(
        "div",
        { className: "links" + (menuOpen ? " open" : "") },
        links,
        h(
          "button",
          {
            className: "toggle",
            onClick: onToggleLang,
            "aria-label": "Language / Wika",
            title: "English / Filipino",
          },
          "🌐 " + label,
        ),
        h(
          "button",
          { className: "toggle", onClick: onToggleTheme },
          theme === "dark" ? "☀ " + t("light") : "☾ " + t("dark"),
        ),
      ),
    );
  }
}

class Hero extends TranslatedComponent {
  render() {
    const { t } = this;
    const pop = (delay) => ({ className: "pop", style: { animationDelay: delay + "s" } });
    return h(
      "section",
      { id: "home", className: "hero" },
      h(
        "div",
        { className: "shapes", "aria-hidden": "true" },
        h("i", { className: "s1" }),
        h("i", { className: "s2" }),
        h("i", { className: "s3" }),
      ),
      h(
        "div",
        null,
        h("div", { className: "tag pop" }, t("hello")),
        h("h1", pop(0.15), "Neon M. ", h("em", null, "Sanding")),
        h(Typer),
        h("p", { className: "pop", style: { animationDelay: ".5s", fontSize: 17 } }, t("intro")),
        h(
          "div",
          pop(0.65),
          h("a", { className: "btn", href: "#contact" }, t("talk")),
          h("a", { className: "btn ghost", href: "#services" }, t("see")),
          h(
            "a",
            {
              className: "btn ghost",
              href: LINKS.cv,
              download: "Neon-Sanding-CV.pdf",
              onClick: () => cvTracker.track(),
            },
            t("cv"),
          ),
        ),
        h("div", pop(0.8), h(Socials)),
      ),
      h(
        "div",
        { className: "photo pop", style: { animationDelay: ".3s" } },
        h("div", { className: "ring" }),
        h("div", { className: "blob" }),
        h(
          "div",
          { className: "tilt" },
          h("img", {
            src: PHOTO,
            alt: "Portrait of Neon M. Sanding",
            width: 620,
            height: 634,
            decoding: "async",
          }),
        ),
        h("div", { className: "chip", style: { top: "10%", left: "-4%" } }, "✦ UI/UX"),
        h(
          "div",
          { className: "chip", style: { bottom: "22%", right: "-2%", animationDelay: "1.2s" } },
          "</> Front-End",
        ),
      ),
    );
  }
}

class App extends Component {
  themeManager = new ThemeManager();
  state = {
    translator: Translator.fromStorage(),
    theme: ThemeManager.preferred(),
    loading: true,
    menuOpen: false,
    lightbox: null,
    active: "home",
  };

  componentDidMount() {
    this.themeManager.apply(this.state.theme);
    this.state.translator.persist();
    this.loaderTimer = setTimeout(() => this.setState({ loading: false }), 1100);
    this.observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && this.setState({ active: entry.target.id })),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    SECTIONS.forEach((id) => {
      const element = document.getElementById(id);
      if (element) this.observer.observe(element);
    });
  }

  componentDidUpdate(_, prevState) {
    if (prevState.theme !== this.state.theme) this.themeManager.apply(this.state.theme);
    if (prevState.translator !== this.state.translator) this.state.translator.persist();
  }

  componentWillUnmount() {
    clearTimeout(this.loaderTimer);
    this.observer.disconnect();
  }

  toggleTheme = (event) => {
    const next = this.state.theme === "dark" ? "light" : "dark";
    const origin = { x: event.clientX, y: event.clientY };
    this.themeManager.transition(origin, () => ReactDOM.flushSync(() => this.setState({ theme: next })));
  };

  toggleLanguage = () => this.setState({ translator: this.state.translator.toggled() });
  toggleMenu = () => this.setState({ menuOpen: !this.state.menuOpen });
  closeMenu = () => this.setState({ menuOpen: false });
  openLightbox = (items, index) => this.setState({ lightbox: { items, index } });
  closeLightbox = () => this.setState({ lightbox: null });

  render() {
    const { translator, theme, loading, menuOpen, lightbox, active } = this.state;
    return h(
      LangContext.Provider,
      { value: translator },
      h("a", { className: "skip", href: "#about" }, translator.t("skip")),
      h(Loader, { done: !loading }),
      h(Progress),
      h(CursorView),
      h(Navbar, {
        active,
        menuOpen,
        theme,
        label: translator.label,
        onToggleMenu: this.toggleMenu,
        onCloseMenu: this.closeMenu,
        onToggleLang: this.toggleLanguage,
        onToggleTheme: this.toggleTheme,
      }),
      h(
        "main",
        null,
        h(Hero),
        h(AboutSection, { onOpen: this.openLightbox }),
        h(Skills),
        h(ServicesSection),
        h(Contact),
      ),
      h(Footer),
      lightbox && h(Lightbox, { items: lightbox.items, index: lightbox.index, onClose: this.closeLightbox }),
    );
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(h(App));
