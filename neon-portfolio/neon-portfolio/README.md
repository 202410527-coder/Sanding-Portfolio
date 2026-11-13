# Neon M. Sanding — Portfolio

## Folders
- index.html — the page (also has the Google / share-preview info)
- css/styles.css — colors, layout, animations
- js/config.js — YOUR info: links, certificates, projects, timeline, testimonials, skills
- js/i18n.js — all text in English and Filipino, plus the Translator class
- js/models.js — small classes for data (Skill, GalleryItem)
- js/services.js — helper classes (SoundPlayer, ThemeManager, CursorFollower, ContactService)
- js/components.js — page parts, one class each (Skills keyboard, Gallery, Contact, Footer...)
- js/app.js — the App class that puts the page together
- server/ — Node.js classes: server.js (starts everything), ContactController, DownloadController, JsonStore, RateLimiter, Mailer
- assets/ — your photo, CV (PDF) and share image

## Run on your computer
1. Install Node.js (nodejs.org).
2. In this folder type: npm install
3. Then: npm start
4. Open http://localhost:3000

## Fill in your content (js/config.js)
- LINKS: your Instagram, Facebook, TikTok, Gmail and CV file.
- CERTS / PROJECTS: copy the example in the comments. Put images in assets/.
  Project tags: "UI Design", "Websites" or "Graphics" (used by the filter buttons).
- TIMELINE, TESTIMONIALS, LEARNING: same idea. Empty ones show a soft placeholder (LEARNING stays hidden until filled).
- Skill levels: the last number on each skill (1 = Beginner, 2 = Intermediate, 3 = Advanced).
- Change any wording in js/i18n.js (English "en" and Filipino "fil").

## Your CV
assets/neon-sanding-cv.pdf is a simple starter. Replace it with your real CV (keep the same file name).
Download counts are saved in server/downloads.json.

## Get messages in Gmail
1. In your Google account turn on 2-Step Verification.
2. Make an "App password" (Google Account > Security > App passwords).
3. Set GMAIL_USER, GMAIL_APP_PASSWORD and (optional) MAIL_TO as settings on your host, or in the terminal before npm start.
Messages are always saved in server/messages.json too.

## Put it online (free)
Render.com (easiest for this project, because it runs Node.js):
1. Upload this folder to a GitHub repository.
2. On Render choose New > Web Service, pick the repo.
3. Build command: npm install   Start command: npm start
4. Add the Gmail settings under Environment.
Custom address (like neonsanding.com): buy the name at a domain shop, then add it in Render > Settings > Custom Domains.
After you have your address, open index.html and change og:image to the full address, e.g. https://neonsanding.com/assets/og-image.jpg so link previews show your photo.
