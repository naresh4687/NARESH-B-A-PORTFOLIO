# NARESH B A - Portfolio

<div align="center">

   <h3>A cinematic, scrollytelling portfolio designed to present projects, achievements, and contact details with a premium visual feel.</h3>

   <p>
      <img src="https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js 16" />
      <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
      <img src="https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
      <img src="https://img.shields.io/badge/Framer_Motion-Animated_UI-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
   </p>

</div>

## Preview

![Portfolio preview](public/hero-image.jpg)

## Design System

The README now reflects the same design language used in the portfolio itself:

| Element | Direction |
| --- | --- |
| Color | Deep black surfaces with blue and purple accents |
| Typography | Large, confident headings with clean supporting copy |
| Layout | Spacious sections with clear visual rhythm |
| Motion | Smooth transitions and scroll-driven storytelling |
| Surface | Glass-like cards, soft blur, and glowing ambience |

## Project Snapshot

This portfolio is built with the Next.js App Router and shaped like a guided story rather than a plain résumé page. It uses dark cinematic styling, layered glow effects, motion, and section-by-section flow to make the content feel intentional and memorable.

<table>
   <tr>
      <td><strong>Purpose</strong><br />Showcase work, credentials, and professional identity</td>
      <td><strong>Style</strong><br />Dark, modern, immersive, and high-contrast</td>
      <td><strong>Experience</strong><br />Smooth scrolling, animated sections, and interactive UI</td>
   </tr>
</table>

## Design Direction

The visual system is built around a few clear ideas:

- Deep black and charcoal surfaces for focus and contrast
- Neon-like blue and purple accents for energy and depth
- Glassmorphism cards and blurred ambient backgrounds
- Large typography to create a strong hero section
- Motion-driven transitions to keep the page feeling alive

The result is a portfolio that reads like a product landing page, while still keeping the personal and professional story front and center.

## What The Page Shows

- Hero section with strong first impression and personal branding
- About section for a concise introduction
- Project showcase with visual emphasis
- Gallery for awards, certifications, and achievements
- Testimonials for social proof and credibility
- Skills and timeline for career context
- Dock-style navigation for quick movement through the page
- Contact section with working email form and social links

## Highlights

- Strong visual identity with gradients, glow, and layered depth
- Scroll-based storytelling powered by Framer Motion
- Reusable component structure for each portfolio section
- Animated gallery presentation for awards and credentials
- Contact form backed by a NodeMailer API route
- Testimonial submission flow for collecting new quotes
- Responsive layout that adapts cleanly to smaller screens

## Tech Stack

- Framework: [Next.js 16](https://nextjs.org/) with the App Router
- Language: TypeScript
- Styling: Tailwind CSS 4
- Motion: [Framer Motion](https://www.framer.com/motion/)
- 3D and interactive visuals: [Three.js](https://threejs.org/) and [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- Email delivery: [Nodemailer](https://nodemailer.com/)
- Assets and media: static images, HTML5 video, and layered UI effects

## Project Structure

```text
src/
   app/
      api/
         send-email/
         submit-testimonial/
      globals.css
      layout.tsx
      page.tsx
   components/
      About.tsx
      Blog.tsx
      Contact.tsx
      Dock.tsx
      ElasticGrid.tsx
      Gallery.tsx
      Hero.tsx
      Overlay.tsx
      ParticlesBackground.tsx
      Projects.tsx
      ScrollyVideo.tsx
      Skills.tsx
      Testimonials.tsx
      Timeline.tsx
public/
   gallery/
```

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm, yarn, or pnpm

### Install

```bash
git clone <your-repository-url>
cd NARESH-B-A-PORTFOLIO
npm install
```

### Environment Variables

Create a `.env.local` file in the project root if you want real email delivery enabled:

```env
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_app_password
CONTACT_RECEIVER_EMAIL=receiver@example.com
```

If these variables are missing, the contact API falls back to a mock mode and logs the message to the server console instead of sending email.

### Run Locally

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production app
- `npm run start` - Run the production build
- `npm run lint` - Run ESLint across the codebase

## API Routes

- `POST /api/send-email` handles contact form submissions
- `POST /api/submit-testimonial` handles testimonial submissions

## Notes

- The homepage sections are composed from reusable components under `src/components`.
- The contact section includes social links, a resume button, and the form UI.
- The gallery emphasizes awards and certifications with a marquee-style presentation.

## License

This project is intended for personal portfolio use. Add a license here if you plan to publish it publicly.
