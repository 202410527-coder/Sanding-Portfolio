// Helper classes that do work behind the scenes (no screen drawing here).

/** Plays a soft key-click sound. */
class SoundPlayer {
  constructor() {
    this.enabled = true;
    this.audio = null;
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  play() {
    if (!this.enabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.audio = this.audio || new AudioCtx();
      const now = this.audio.currentTime;
      const osc = this.audio.createOscillator();
      const gain = this.audio.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(240, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.06);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      osc.connect(gain);
      gain.connect(this.audio.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    } catch (error) {
      /* sound is optional */
    }
  }
}

/** Light / dark mode, with the circle reveal animation. */
class ThemeManager {
  constructor(root = document.documentElement) {
    this.root = root;
  }

  static preferred() {
    return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  apply(theme) {
    this.root.setAttribute("data-theme", theme);
  }

  transition({ x, y }, commit) {
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduceMotion) return commit();
    const transition = document.startViewTransition(commit);
    transition.ready
      .then(() => {
        const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
        this.root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          {
            duration: 750,
            easing: "cubic-bezier(.65,0,.35,1)",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      })
      .catch(() => {});
  }
}

/** The small dot + ring that follows the mouse (computers only). */
class CursorFollower {
  constructor(dot, ring) {
    this.dot = dot;
    this.ring = ring;
    this.mouse = { x: -50, y: -50 };
    this.ringPos = { x: -50, y: -50 };
  }

  static supported() {
    return matchMedia("(pointer: fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  start() {
    document.documentElement.classList.add("cur");
    addEventListener("mousemove", this.onMove);
    this.loop();
  }

  stop() {
    removeEventListener("mousemove", this.onMove);
    cancelAnimationFrame(this.frame);
    document.documentElement.classList.remove("cur");
  }

  onMove = (event) => {
    this.mouse = { x: event.clientX, y: event.clientY };
    this.dot.style.transform = `translate(${event.clientX}px,${event.clientY}px)`;
    const overLink = event.target.closest && event.target.closest("a,button,.slide,input,textarea");
    this.ring.classList.toggle("big", Boolean(overLink));
  };

  loop = () => {
    this.ringPos.x += (this.mouse.x - this.ringPos.x) * 0.18;
    this.ringPos.y += (this.mouse.y - this.ringPos.y) * 0.18;
    this.ring.style.transform = `translate(${this.ringPos.x}px,${this.ringPos.y}px)`;
    this.frame = requestAnimationFrame(this.loop);
  };
}

/** Sends the contact form to the Node.js server. */
class ContactService {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  async send(payload) {
    if (!this.endpoint) return; // preview mode: nothing to send to
    const response = await fetch(this.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error("Message was not sent");
  }
}

/** Tells the server that the CV was downloaded. */
class DownloadTracker {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  track() {
    if (this.endpoint) fetch(this.endpoint, { method: "POST" }).catch(() => {});
  }
}

const keySound = new SoundPlayer();
const contactService = new ContactService(API.contact);
const cvTracker = new DownloadTracker(API.cv);
