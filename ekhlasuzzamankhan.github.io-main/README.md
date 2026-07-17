# Ekhlasuzzaman Khan — Personal Portfolio

A personal portfolio website built with pure HTML, CSS, and JavaScript. No frameworks, no dependencies — just clean, fast, and fully customizable code.

## 🌐 Live Site

Once published via GitHub Pages, your site will be available at:
`https://YOUR-USERNAME.github.io/portfolio/`

---

## 📁 File Structure

```
portfolio/
├── index.html          ← Home page (with typing animation)
├── css/
│   └── style.css       ← All styles
├── js/
│   └── nav.js          ← Navigation logic
└── pages/
    ├── about.html
    ├── education.html
    ├── skills.html
    ├── projects.html
    └── contact.html
```

---

## 🚀 How to Publish on GitHub Pages

1. Create a new GitHub repository named `portfolio` (make it **public**)
2. Upload all these files keeping the same folder structure
3. Go to **Settings → Pages**
4. Under **Source**, select `main` branch and `/ (root)` folder
5. Click **Save** — your site will be live in ~1 minute!

---

## ✏️ How to Update Content

- **Add a new skill** → Open `pages/skills.html`, copy any `<span class="skill-pill">` and change the text
- **Add a new project** → Open `pages/projects.html`, copy a `.project-card` div and fill in your details
- **Update education** → Open `pages/education.html`, edit the `.edu-card` section
- **Add a CV** → Place your CV as `cv.pdf` in the root folder, then in `index.html` change the "Get in touch" button to `<a href="cv.pdf" download class="btn-gold">Download CV</a>`

---

## 🎨 Customization

All colors are CSS variables in `css/style.css` under `:root`. The main accent color is `--accent: #c9a96e` (gold). Change it to any color you like!

---

Built by Ekhlasuzzaman Khan · North South University · EEE
