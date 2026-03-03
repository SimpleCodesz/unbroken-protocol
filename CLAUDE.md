# The Unbroken Protocol — abrahamspring.co.uk

## Project Overview
Static single-page website for Abraham Spring's recovery-led performance coaching brand. No frameworks — plain HTML, CSS, and vanilla JavaScript. Hosted on Netlify via GitHub auto-deploy.

## Tech Stack
- HTML5 (single `index.html`)
- CSS3 (`styles.css`) with CSS custom properties
- Vanilla JavaScript (`script.js`)
- Node.js dev server (`server.js`, port 8080)
- Git remote: `git@github.com:SimpleCodesz/unbroken-protocol.git`
- Domain: `abrahamspring.co.uk`

## Design System

### Colour Palette (Deep Teal + Copper)
```
--accent: #C47A2A          (copper — primary CTA colour)
--accent-hover: #a8661f    (darker copper)
--teal: #1A6B6A            (deep teal — used sparingly)
--bg-white: #FFFFFF
--bg-ivory: #FAF8F5
--bg-grey: #F5F5F7         (Apple light grey)
--bg-dark: #1D1D1F         (Apple space black)
--bg-black: #000000
--text-primary: #1D1D1F
--text-secondary: #6E6E73
--text-on-dark: #F5F5F7
```

### Typography
- Display: SF Pro Display system font stack (`-apple-system, BlinkMacSystemFont, "SF Pro Display"...`)
- Body: SF Pro Text system font stack
- Google Fonts loaded: Inter, DM Sans, DM Serif Display
- Body size: 17px, line-height: 1.47
- Letter-spacing: -0.022em (body), -0.005em (headings)

### Spacing & Radius
- 4px base grid: 6/12/16/22/30/44/60/80px
- Border radius: 18px (cards), 12px (small), 980px (pills)
- Section padding: 80px vertical

### Cards
- Width: 420px desktop, 320px mobile
- Padding: 40px desktop, 32px mobile
- Horizontal carousel with scroll-snap
- 6 colour variants cycling: dark, copper, grey, charcoal, warm, black
- All cards have 145-degree gradients
- Hover: translateY(-4px) lift with deepened shadow

### Animations
- Scroll-reveal: elements fade up 40px with 0.8s cubic-bezier ease
- Cards stagger at 80ms intervals per card
- Hero orchestration: title → subtitle → CTAs stagger at 200ms intervals
- Buttons: hover lift + active press-down scale(0.97)
- Reduced motion: all animations disabled via prefers-reduced-motion

## Coding Rules
- No frameworks, libraries, or build tools
- All styles in a single `styles.css` file
- All scripts in a single `script.js` file
- Use CSS custom properties for all colours, spacing, and radii
- Mobile breakpoints: 1024px, 768px, 480px
- Apple design language: clean, minimal, generous whitespace

## Off-Limits
- Do NOT change the hero H1 headline (brand copy)
- Do NOT modify R.A.C.E. Framework content without explicit approval
- Do NOT add any JavaScript frameworks or build steps
- Do NOT use `any` CSS-in-JS, Tailwind, or utility frameworks
- Do NOT change the colour palette without explicit approval
- Do NOT remove SEO structured data (JSON-LD, OG tags, meta tags)

## SEO
- JSON-LD structured data: ProfessionalService, Person, FAQPage
- Open Graph + Twitter Card meta tags
- robots.txt + sitemap.xml
- Target keywords: triathlon coach UK, recovery-led coaching, R.A.C.E. Framework
- British English throughout

## File Structure
```
superpower-clone/
├── index.html          — Single page with all sections
├── styles.css          — All styles
├── script.js           — Mobile menu, FAQ, carousels, scroll-reveal, hero animation
├── server.js           — Dev server (port 8080)
├── robots.txt          — Crawl directives
├── sitemap.xml         — Single URL sitemap
├── CLAUDE.md           — This file
└── assets/
    ├── abraham.png     — About section photo
    └── hero-video.mp4  — Hero background video
```

## Commands
- Dev server: `node server.js` (runs on port 8080)
- Deploy: `git push` (auto-deploys to Netlify)

## Section Order
1. Navbar (fixed, pill-shaped, blurred backdrop)
2. Hero (video background, overlaid text)
3. Stats Bar (count-up animation)
4. Partners (British Triathlon, SuperTri, etc.)
5. The Problem (6 cards, horizontal carousel)
6. Philosophy Quote
7. R.A.C.E. Framework (4 cards, horizontal carousel)
8. What You Receive (8 coaching cards, horizontal carousel)
9. About / Credentials (photo + details + E-E-A-T credentials grid)
10. Testimonials (3 cards, horizontal carousel, dark/copper/grey variants)
11. Is This For You (dark section, two columns)
12. Pricing (3 tiers: Recover £597/mo, Condition £997/mo, Execute £1,997/mo)
13. Apply CTA (dark card, 4 steps)
14. Application Form (Netlify Forms, 7 questions + name/email, tier pre-select)
15. Lead Magnet (Recovery Readiness Assessment email capture, Netlify Forms)
16. Blog / Insights (7 Medium articles, horizontal carousel, dark/copper/grey cards)
17. FAQ (2 groups: The Coaching, The Method)
18. Partners bar
19. Footer (4 columns + copyright)
