// All visible text, in English (en) and Filipino (fil). Edit wording here.
const TRANSLATIONS = {
  en: {
    home: "Home",
    about: "About",
    skills: "Skills",
    services: "Services",
    contact: "Contact",
    dark: "Dark",
    light: "Light",
    hello: "Hello, I’m",
    intro: "I turn ideas into clean, simple and friendly websites.",
    talk: "Let’s talk",
    see: "See services",
    cv: "Download CV",
    avail: "Available for work",
    aboutP1:
      "I’m a student who loves design and code. I enjoy planning how a website should look and feel, then building it myself with HTML, CSS, JavaScript and React.",
    aboutP2: "My goal is simple: make things that look good and are easy for everyone to use.",
    learning: "Currently learning",
    stTools: "Tools",
    stProjects: "Projects",
    stCerts: "Certificates",
    timeline: "Education & Experience",
    tlPh: "Add your school or role here",
    tlPh2: "The details will show here.",
    certs: "Certificates",
    projects: "Projects",
    fAll: "All",
    fUI: "UI Design",
    fWeb: "Websites",
    fGfx: "Graphics",
    fNone: "No projects in this group yet",
    nCert: "Certificate",
    nProj: "Project",
    phCert: "Add your certificate here",
    phProj: "Add your project here",
    dCert: "The description will show up here once this certificate is added.",
    dProj: "The description will show up here once this project is added.",
    tests: "Kind words",
    testPh: "Add your first quote from a classmate, teacher or client.",
    skIntro: "Press a key to see what I do with each tool. You can also use your real keyboard.",
    skTip: "Tip: press any key above",
    skWork: "Let’s work together ↵",
    soundOn: "🔊 Sound on",
    soundOff: "🔇 Sound off",
    levels: ["Beginner", "Intermediate", "Advanced"],
    svc: [
      ["UI/UX Design", "Clean, easy-to-use screens and layouts that feel good to use."],
      ["Front-End Development", "Responsive websites built with HTML, CSS, JavaScript and React."],
      ["Graphic Design", "Logos, posters and social posts made in Photoshop, Illustrator and Canva."],
      ["Prototyping", "Clickable mockups so you can test an idea before it is built."],
    ],
    sk: [
      "Photoshop: editing photos and making posters.",
      "Illustrator: logos, icons and clean vector art.",
      "Canva: quick, good-looking social posts and slides.",
      "HTML: the structure of every web page I build.",
      "CSS: colors, layouts and smooth animations.",
      "JavaScript: makes my pages interactive.",
      "React: building fast, reusable page parts.",
      "Node.js: the behind-the-scenes part, like contact forms.",
    ],
    ctIntro: "Have a project or just want to say hi? Send me a message.",
    ctName: "Name",
    ctEmail: "Email",
    ctMsg: "Message",
    ctPhN: "Your name",
    ctPhE: "you@email.com",
    ctPhM: "Tell me about your idea",
    ctSend: "Send message",
    ctSending: "Sending…",
    ctOk: "Thank you! Your message was sent. I’ll reply soon.",
    ctErr: "Sorry, your message could not be sent. Please try again.",
    foot: "All rights reserved.",
    quick: "Quick links",
    top: "Back to top",
    close: "Close",
    viewCert: "View certificate",
    viewProj: "View project details",
    visit: "Visit website ↗",
    clickView: "🔍 Click to view",
    live: "↗ Live site",
    openFull: "Open full size",
    view: "View project",
    skip: "Skip to content",
  },
  fil: {
    home: "Home",
    about: "Tungkol",
    skills: "Kasanayan",
    services: "Serbisyo",
    contact: "Kontak",
    dark: "Madilim",
    light: "Maliwanag",
    hello: "Kumusta, ako si",
    intro: "Ginagawa kong malinis, simple at friendly na website ang mga ideya.",
    talk: "Mag-usap tayo",
    see: "Tingnan ang serbisyo",
    cv: "I-download ang CV",
    avail: "Bukas sa trabaho",
    aboutP1:
      "Estudyante ako na mahilig sa disenyo at code. Gusto kong planuhin kung paano dapat magmukha at pakiramdam ang isang website, saka gawin ito gamit ang HTML, CSS, JavaScript at React.",
    aboutP2: "Simple ang layunin ko: gumawa ng mga bagay na maganda tingnan at madaling gamitin ng lahat.",
    learning: "Kasalukuyang pinag-aaralan",
    stTools: "Mga tool",
    stProjects: "Mga proyekto",
    stCerts: "Mga sertipiko",
    timeline: "Edukasyon at karanasan",
    tlPh: "Idagdag ang paaralan o trabaho mo rito",
    tlPh2: "Lalabas dito ang mga detalye.",
    certs: "Mga sertipiko",
    projects: "Mga proyekto",
    fAll: "Lahat",
    fUI: "UI Design",
    fWeb: "Mga website",
    fGfx: "Graphics",
    fNone: "Wala pang proyekto sa grupong ito",
    nCert: "Sertipiko",
    nProj: "Proyekto",
    phCert: "Idagdag ang sertipiko mo rito",
    phProj: "Idagdag ang proyekto mo rito",
    dCert: "Lalabas dito ang paglalarawan kapag naidagdag na ang sertipiko.",
    dProj: "Lalabas dito ang paglalarawan kapag naidagdag na ang proyekto.",
    tests: "Mga magagandang salita",
    testPh: "Idagdag ang unang puna mula sa kaklase, guro o kliyente.",
    skIntro:
      "Pindutin ang isang key para makita kung ano ang ginagawa ko sa bawat tool. Puwede mo ring gamitin ang totoong keyboard mo.",
    skTip: "Tip: pindutin ang kahit anong key sa itaas",
    skWork: "Magtrabaho tayo nang magkasama ↵",
    soundOn: "🔊 May tunog",
    soundOff: "🔇 Walang tunog",
    levels: ["Nagsisimula", "Katamtaman", "Mahusay"],
    svc: [
      ["UI/UX Design", "Malilinis at madaling gamitin na mga screen at layout na masarap gamitin."],
      ["Front-End Development", "Mga responsive na website gamit ang HTML, CSS, JavaScript at React."],
      ["Graphic Design", "Mga logo, poster at social post na gawa sa Photoshop, Illustrator at Canva."],
      ["Prototyping", "Mga mockup na puwedeng i-click para masubukan ang ideya bago ito buuin."],
    ],
    sk: [
      "Photoshop: pag-edit ng litrato at paggawa ng poster.",
      "Illustrator: mga logo, icon at malinis na vector art.",
      "Canva: mabilis at magandang social post at slides.",
      "HTML: ang istruktura ng bawat web page na ginagawa ko.",
      "CSS: mga kulay, layout at makinis na animation.",
      "JavaScript: ginagawang interactive ang mga page ko.",
      "React: paggawa ng mabilis at magagamit-muling mga bahagi ng page.",
      "Node.js: ang bahaging nasa likod, tulad ng contact form.",
    ],
    ctIntro: "May proyekto ka ba o gusto lang bumati? Magpadala ng mensahe.",
    ctName: "Pangalan",
    ctEmail: "Email",
    ctMsg: "Mensahe",
    ctPhN: "Ang pangalan mo",
    ctPhE: "ikaw@email.com",
    ctPhM: "Ikuwento ang ideya mo",
    ctSend: "Ipadala ang mensahe",
    ctSending: "Ipinapadala…",
    ctOk: "Salamat! Naipadala na ang mensahe mo. Sasagot ako agad.",
    ctErr: "Pasensya na, hindi naipadala ang mensahe. Pakisubukan ulit.",
    foot: "Lahat ng karapatan ay nakalaan.",
    quick: "Mga link",
    top: "Bumalik sa itaas",
    close: "Isara",
    viewCert: "Tingnan ang sertipiko",
    viewProj: "Tingnan ang detalye ng proyekto",
    visit: "Bisitahin ang website ↗",
    clickView: "🔍 I-click para tingnan",
    live: "↗ Live na site",
    openFull: "Buksan nang buo",
    view: "Tingnan ang proyekto",
    skip: "Lumaktaw sa nilalaman",
  },
};

/** Looks up text for the chosen language and remembers the choice. */
class Translator {
  static STORAGE_KEY = "lang";
  static DEFAULT = "en";

  constructor(lang = Translator.DEFAULT) {
    this.lang = TRANSLATIONS[lang] ? lang : Translator.DEFAULT;
  }

  static fromStorage() {
    try {
      return new Translator(localStorage.getItem(Translator.STORAGE_KEY) || undefined);
    } catch (error) {
      return new Translator();
    }
  }

  t = (key) => {
    const value = TRANSLATIONS[this.lang][key];
    return value !== undefined ? value : TRANSLATIONS.en[key];
  };

  get label() {
    return this.lang.toUpperCase();
  }

  toggled() {
    return new Translator(this.lang === "en" ? "fil" : "en");
  }

  persist() {
    document.documentElement.lang = this.lang === "fil" ? "fil" : "en";
    try {
      localStorage.setItem(Translator.STORAGE_KEY, this.lang);
    } catch (error) {
      /* storage is optional */
    }
  }
}

const LangContext = createContext(new Translator());
