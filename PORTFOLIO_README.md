# Ayman Taher - Personal Brand Website

A modern, fully responsive personal brand website built with React and Tailwind CSS.

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.jsx          # Main navigation header
│   │   └── Footer.jsx          # Footer with links and contact info
│   ├── ui/
│   │   ├── Button.jsx          # Reusable button component
│   │   ├── Card.jsx            # Reusable card component
│   │   ├── Badge.jsx           # Reusable badge component
│   │   └── SectionContainer.jsx # Section wrapper component
│   └── sections/
│       ├── Hero.jsx            # Hero section with typing animation
│       ├── About.jsx           # About Me section
│       ├── CaseStudies.jsx     # Latest case studies
│       ├── Solutions.jsx       # Services/solutions section
│       ├── Testimonials.jsx    # Client testimonials
│       ├── Activities.jsx      # Latest activities/events
│       ├── CTASections.jsx     # Call-to-action sections
│       ├── SelectedShots.jsx   # Portfolio showcase
│       └── CoreSupport.jsx     # Support features
├── styles/
│   └── index.css               # Global styles and Tailwind directives
├── App.jsx                     # Main app component
└── main.jsx                    # Application entry point
```

## 🎨 Design System

### Color Palette
- **Primary**: `#10D9A3` (Teal/Turquoise)
- **Dark Background**: `#0A0A0F`
- **Secondary Dark**: `#1A1A2E`
- **Text**: White/Neutral grays

### Typography
- **Font Family**: Inter (Google Fonts)
- **Headings**: Bold, 700-900 weight
- **Body**: Regular, 400-500 weight

### Components
All components are built with accessibility and responsiveness in mind:
- **Button**: 3 variants (primary, secondary, outline), 3 sizes
- **Card**: Hover effects, glassmorphism support
- **Badge**: Multiple color variants
- **SectionContainer**: Consistent spacing across sections

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

4. **Preview production build**
   ```bash
   npm run preview
   ```

## 📱 Features

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Fully tested on mobile, tablet, and desktop

### Accessibility
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Focus states on interactive elements
- Proper color contrast ratios

### Performance
- Optimized bundle size with Vite
- Lazy loading where applicable
- Smooth scroll animations
- Optimized images (placeholders included)

### Sections

1. **Hero** - Animated introduction with typing effect
2. **About Me** - Profile, bio, stats, and company logos
3. **Case Studies** - Showcase of recent projects
4. **Solutions** - Services offered
5. **Testimonials** - Client feedback with ratings
6. **Activities** - Recent talks and events
7. **CTA Sections** - Consultation booking, blogs, podcast
8. **Selected Shots** - Portfolio mobile mockups
9. **Core Support** - Support features and benefits
10. **Footer** - Contact info, links, and social media

## 🛠️ Customization

### Updating Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    DEFAULT: '#10D9A3',
    // Add your color variants
  },
}
```

### Updating Content
Each section component contains its own data arrays. Simply update the content in the component files:
- Testimonials: `src/components/sections/Testimonials.jsx`
- Case Studies: `src/components/sections/CaseStudies.jsx`
- Services: `src/components/sections/Solutions.jsx`
- etc.

### Adding Images
Replace placeholder divs with actual images:
```jsx
// Before
<div className="bg-gradient-to-br from-primary/20 to-dark-400">
  {/* Placeholder */}
</div>

// After
<img src="/path/to/image.jpg" alt="Description" />
```

## 📦 Dependencies

### Core
- `react`: ^18.2.0
- `react-dom`: ^18.2.0
- `react-icons`: ^5.0.1

### Build Tools
- `vite`: ^5.0.12
- `@vitejs/plugin-react`: ^4.2.1

### Styling
- `tailwindcss`: ^3.4.1
- `autoprefixer`: ^10.4.17
- `postcss`: ^8.4.33

## 🎯 Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License
This project is private and proprietary.

## 👤 Author
**Ayman Taher**
- Website: [Your URL]
- Email: hello@aymantaher.com

---

Built with ❤️ using React + Tailwind CSS
