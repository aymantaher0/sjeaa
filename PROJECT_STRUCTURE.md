# Ayman Taher Portfolio - Project Structure

## Overview
A modern, production-ready personal brand website built with Next.js 14, React, TypeScript, and Tailwind CSS.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (recommended)

## Folder Structure

```
sjeaa/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── about/             # About page
│   │   ├── academy/           # Programs & Courses page
│   │   ├── blogs/             # Blogs listing & detail pages
│   │   │   └── [id]/          # Dynamic blog detail route
│   │   ├── contact/           # Contact page
│   │   ├── services/          # Services page
│   │   ├── layout.tsx         # Root layout with Header & Footer
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Global styles
│   │
│   ├── components/
│   │   ├── layout/            # Layout components
│   │   │   ├── Header.tsx     # Navigation header
│   │   │   └── Footer.tsx     # Footer with links
│   │   │
│   │   ├── ui/                # Reusable UI components
│   │   │   ├── Button.tsx     # Button component with variants
│   │   │   ├── Card.tsx       # Card container component
│   │   │   ├── Section.tsx    # Section wrapper component
│   │   │   └── Badge.tsx      # Badge/Tag component
│   │   │
│   │   └── sections/          # Page section components
│   │       ├── Hero.tsx
│   │       ├── AboutSection.tsx
│   │       ├── StatsSection.tsx
│   │       ├── CompanyLogos.tsx
│   │       ├── CaseStudies.tsx
│   │       ├── Solutions.tsx
│   │       ├── Testimonials.tsx
│   │       ├── LatestActivities.tsx
│   │       ├── BookConsultation.tsx
│   │       ├── BlogsSection.tsx
│   │       ├── SelectedShots.tsx
│   │       └── ContactCTA.tsx
│   │
│   ├── lib/                   # Utility functions (future)
│   └── types/                 # TypeScript type definitions (future)
│
├── public/                    # Static assets
│   └── images/               # Image files
│
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
├── next.config.js            # Next.js configuration
├── postcss.config.js         # PostCSS configuration
└── package.json              # Dependencies and scripts

```

## Design System

### Colors
- **Primary**: `#10B981` (Teal/Green)
- **Dark Background**: `#0A0A0A`
- **Card Background**: `#171717`
- **Text Gray**: `#A3A3A3`

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, large sizes
- **Body**: Regular weight, readable sizes

### Components
All components are built with:
- Full TypeScript support
- Tailwind CSS styling
- Responsive design (mobile-first)
- Accessibility features (ARIA labels, semantic HTML)

## Pages

### 1. Home (`/`)
- Hero section with name and title
- About Me preview
- Stats showcase
- Company logos
- Case studies
- Solutions/Services
- Client testimonials
- Latest activities
- Book consultation CTA
- Blogs & Podcast preview
- Selected work shots
- Contact CTA

### 2. About (`/about`)
- Detailed about section
- Professional journey
- Company affiliations
- Latest activities
- Contact information

### 3. Academy (`/academy`)
- Course listings
- Program details
- Educational offerings

### 4. Services (`/services`)
- Service offerings
- Case studies
- Client testimonials

### 5. Blogs (`/blogs`)
- Blog listings with grid layout
- Blog/Resources tabs
- Search and filtering (future enhancement)

### 6. Blog Detail (`/blogs/[id]`)
- Full article content
- Related blog recommendations
- Share functionality

### 7. Contact (`/contact`)
- Contact form
- Contact information
- Location details

## Component Usage

### Button Component
```tsx
import Button from '@/components/ui/Button'

<Button variant="primary" size="lg">
  Click Me
</Button>
```

Variants: `primary`, `secondary`, `outline`
Sizes: `sm`, `md`, `lg`

### Card Component
```tsx
import Card from '@/components/ui/Card'

<Card hover padding="lg">
  Content here
</Card>
```

### Section Component
```tsx
import Section from '@/components/ui/Section'

<Section title="Section Title" subtitle="Subtitle" centered>
  Content here
</Section>
```

## Development

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms
- Netlify
- AWS Amplify
- DigitalOcean App Platform

## Future Enhancements

### Functionality
- [ ] Blog CMS integration (Sanity, Contentful)
- [ ] Contact form backend integration
- [ ] Newsletter subscription
- [ ] Search functionality
- [ ] Blog categories and tags
- [ ] Dark/Light mode toggle
- [ ] Animation effects (Framer Motion)
- [ ] Blog comments
- [ ] Analytics integration

### Performance
- [ ] Image optimization with Next.js Image
- [ ] Lazy loading for sections
- [ ] Progressive Web App (PWA)
- [ ] SEO optimization
- [ ] Sitemap generation

### Content
- [ ] Add real images and content
- [ ] Create blog posts
- [ ] Add case study details
- [ ] Portfolio project pages

## Notes

- All placeholder images need to be replaced with real images
- Contact information (email, phone) should be updated
- Social media links should be added to Footer
- Blog content is currently static and should be connected to a CMS
- Form submissions need backend integration (Formspree, EmailJS, or custom API)

## Customization

### Changing Colors
Edit `tailwind.config.ts`:
```ts
colors: {
  primary: {
    DEFAULT: '#10B981', // Change this
  }
}
```

### Adding New Pages
1. Create new folder in `src/app/`
2. Add `page.tsx` file
3. Update navigation in `Header.tsx`

### Modifying Sections
All section components are in `src/components/sections/`
Edit individual files to customize content and layout.

## Support

For issues or questions:
1. Check Next.js documentation
2. Check Tailwind CSS documentation
3. Review component implementation

---

Built with ❤️ using Next.js, React, and Tailwind CSS
