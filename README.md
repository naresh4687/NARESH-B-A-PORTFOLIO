# Naresh B A — 3D AI Lab Portfolio

An interactive, award-level 3D portfolio built for **Naresh B A** (AI & Data Science Developer | Full-Stack Developer).

## Tech Stack
- **Framework:** React 18 + Vite
- **3D Engine:** Three.js + React Three Fiber (`@react-three/fiber`) + `@react-three/drei`
- **Animations:** GSAP + ScrollTrigger, Framer Motion, Lenis Smooth Scroll
- **Styling:** Tailwind CSS (Dark futuristic AI Lab theme, Space Grotesk + Inter)
- **Contact:** EmailJS (`@emailjs/browser`)

## Quick Start
```bash
npm install
npm run dev
```

## Production Build
```bash
npm run build
npm run preview
```

## Editing Content
All portfolio text, skills, experience, projects, education, and social links live in a single file:
`src/data/content.js`

Your resume PDF (`Naresh_B_A.pdf`) is already included inside `public/Naresh_B_A.pdf`.

## Deploying to Vercel
1. Push this folder to a GitHub repository.
2. Import the repository on [Vercel](https://vercel.com).
3. Add your optional EmailJS environment variables (`VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`).
4. Click **Deploy**.
