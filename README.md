# Ayman Taher - Personal Brand Website

A modern, production-ready personal brand website for Ayman Taher, Product Design Lead and Education Consultant. Built with Next.js 14, React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Stack**: Next.js 14 with App Router, React 18, TypeScript, Tailwind CSS
- **Fully Responsive**: Mobile-first design that works on all devices
- **SEO Optimized**: Built-in SEO with Next.js metadata API
- **Fast Performance**: Optimized for Core Web Vitals
- **Component-Based**: Reusable, maintainable components
- **Accessibility**: WCAG compliant with semantic HTML and ARIA labels
- **Type-Safe**: Full TypeScript support throughout

## 📋 Pages

- **Home**: Hero, About, Stats, Case Studies, Services, Testimonials, Activities, Blog
- **About**: Detailed background, journey, professional experience
- **Academy**: UX/UI design courses and programs
- **Services**: Professional services and case studies
- **Blogs**: Blog listings and individual blog posts
- **Contact**: Contact form and information

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Font**: [Inter](https://fonts.google.com/specimen/Inter) from Google Fonts

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sjeaa
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**

   Visit [http://localhost:3000](http://localhost:3000)

## 🏗️ Build & Deploy

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Deploy automatically

### Deploy to Other Platforms

- **Netlify**: Connect GitHub repo and deploy
- **AWS Amplify**: Import from GitHub
- **DigitalOcean App Platform**: Deploy from GitHub

## 📁 Project Structure

```
sjeaa/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── about/             # About page
│   │   ├── academy/           # Programs & Courses
│   │   ├── blogs/             # Blog pages
│   │   ├── contact/           # Contact page
│   │   ├── services/          # Services page
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Global styles
│   │
│   └── components/
│       ├── layout/            # Header, Footer
│       ├── ui/                # Button, Card, Badge
│       └── sections/          # Page sections
│
├── public/                    # Static assets
├── tailwind.config.ts        # Tailwind config
├── tsconfig.json             # TypeScript config
└── next.config.js            # Next.js config
```

## 🎨 Design System

### Colors

```css
Primary: #10B981 (Teal/Green)
Dark: #0A0A0A (Main background)
Card: #171717 (Card background)
Text Gray: #A3A3A3 (Secondary text)
```

### Typography

- **Font Family**: Inter (Google Fonts)
- **Headings**: Bold, 2xl - 5xl
- **Body**: Regular, sm - lg

### Components

#### Button
```tsx
<Button variant="primary" size="lg">Click Me</Button>
```
- Variants: `primary`, `secondary`, `outline`
- Sizes: `sm`, `md`, `lg`

#### Card
```tsx
<Card hover padding="lg">Content</Card>
```
- Hover effect for interactive cards
- Customizable padding

#### Section
```tsx
<Section title="Title" subtitle="Subtitle" centered>
  Content
</Section>
```

## 🔧 Customization

### Change Colors

Edit `tailwind.config.ts`:

```ts
colors: {
  primary: {
    DEFAULT: '#10B981', // Your color
  }
}
```

### Add New Pages

1. Create folder in `src/app/`
2. Add `page.tsx` file
3. Update navigation in `src/components/layout/Header.tsx`

### Modify Sections

All sections are in `src/components/sections/`. Edit any file to customize.

## 📱 Responsive Design

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

All components are fully responsive with mobile-first approach.

## 🔐 Environment Variables

Create a `.env.local` file for environment variables:

```env
# Add your environment variables here
# NEXT_PUBLIC_API_URL=https://api.example.com
```

## 🚀 Future Enhancements

### Content Management
- [ ] Integrate with headless CMS (Sanity, Contentful)
- [ ] Add blog search and filtering
- [ ] Category and tag system

### Features
- [ ] Contact form backend integration
- [ ] Newsletter subscription
- [ ] Blog comments
- [ ] Social media integration
- [ ] Dark/Light mode toggle
- [ ] Multi-language support

### Performance
- [ ] Image optimization
- [ ] Progressive Web App (PWA)
- [ ] Advanced analytics
- [ ] Sitemap generation

### Animation
- [ ] Framer Motion integration
- [ ] Scroll animations
- [ ] Page transitions

## 📄 Documentation

See [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) for detailed documentation.

## 🤝 Contributing

This is a personal brand website. For issues or suggestions:

1. Check existing issues
2. Create detailed bug reports
3. Submit pull requests with clear descriptions

## 📞 Support

For questions or issues:

- Check Next.js [documentation](https://nextjs.org/docs)
- Check Tailwind CSS [documentation](https://tailwindcss.com/docs)
- Review component implementation

## 📝 License

This project is provided as-is for portfolio purposes.

## 🙏 Acknowledgments

- Design based on Figma mockups
- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Font from [Google Fonts](https://fonts.google.com/)

---

**Built with ❤️ by Ayman Taher**
