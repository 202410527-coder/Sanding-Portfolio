// ================= YOUR INFORMATION (edit this file) =================
const PHOTO = "assets/neon.webp";
const API = { contact: "/api/contact", cv: "/api/cv" };

const LINKS = {
  cv: "assets/neon-sanding-cv.pdf",
  instagram: "https://www.instagram.com/__chocomuchoo/",
  facebook: "https://www.facebook.com/neon.blanco0",
  tiktok: "https://www.tiktok.com/@shitaaakariii",
  gmail: "mailto:sandingneon055@gmail.com",
};

const OPEN_TO_WORK = true; // true shows the green "Available for work" badge
const TIMELINE = [
  {
    when: "Currently Studying",
    title: "Bachelor Science of Information Technology(BSIT) Student",
    note: "Gordon College (GC)",
  },
  {
    when: "2018 – 2024",
    title: "Senior High School (SHS)",
    note: "St. Joseph College, Olongapo Inc., Information, Communication, and technology (ICT)",
  },
]; // example: ["Figma", "Next.js"] (shows "Currently learning" when filled)

// Certificates: { title: "Name", note: "Issuer, year", img: "assets/cert1.jpg" }
const CERTS = [
  {
    title: "Data Analytics Essentials",
    note: "Issued by Cisco Networking Academy, 2026",
    img: "assets/cert1.jpg",
  },
  {
    title: "Python Essentials 1",
    note: "Issued by Cisco Networking Academy, 2026",
    img: "assets/cert2.jpg",
  },
  {
    title: "Python Essentials 2",
    note: "Issued by Cisco Networking Academy, 2026",
    img: "assets/cert3.jpg",
  },
];
// Projects: { title, note, story, img: "assets/p1.jpg", tags: ["UI Design"], link: "https://..." }
// link = the website address people visit when they click "Visit website" (leave out if none)
// tags can be: "UI Design", "Websites", "Graphics"
const PROJECTS = [
  {
  title: "Barangay Bulletin",
  note: "A bulletin board for announcements",
  story: "First Webapp Project",
  img: "assets/project1.jpg",
  tags: ["Websites"],
  link: "https://gordon-heights-bulletin-pylo.onrender.com/",
}
];
// Testimonials: { quote: "Nice to work with!", name: "Person, role" }
const TESTIMONIALS = [];
// Timeline: { when: "2024 – now", title: "BSIT Student", note: "School name" }
const TIMELINE = [];

// new Skill(symbol, name, key color, text color, computer key, level 1-3)
const SKILLS = [
  new Skill("Ps", "Photoshop", "#7aa7ff", "#0d0c11", "p", 2),
  new Skill("Ai", "Illustrator", "#ffb86b", "#0d0c11", "i", 2),
  new Skill("Cv", "Canva", "#8b6bd9", "#fff", "c", 3),
  new Skill("5", "HTML", "#e8e3f3", "#0d0c11", "h", 3),
  new Skill("3", "CSS", "#b79ced", "#0d0c11", "s", 3),
  new Skill("JS", "JavaScript", "#f2d96b", "#0d0c11", "j", 2),
  new Skill("⚛", "React", "#3a3350", "#bfe9ff", "r", 2),
  new Skill("⬢", "Node.js", "#7fc98f", "#0d0c11", "n", 1),
];

const SECTIONS = ["home", "about", "skills", "services", "contact"];
const SERVICE_ICONS = ["◐", "</>", "✦", "▢"];
const SOCIAL = [
  ["instagram", "Instagram", LINKS.instagram],
  ["facebook", "Facebook", LINKS.facebook],
  ["tiktok", "TikTok", LINKS.tiktok],
  ["gmail", "Gmail", LINKS.gmail],
];
