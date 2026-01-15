# Alexis Chen - Product Design Leader Portfolio

A high-end, Awwwards-inspired animated portfolio website for a senior Product Designer with 5+ years of experience.

## 🎨 Design Philosophy

This portfolio embodies:
- **Premium & Minimal**: Clean, editorial aesthetic with generous whitespace
- **Smooth & Confident**: Subtle animations that feel intentional, not flashy
- **Product-Focused**: Emphasizes strategic thinking and leadership
- **Professional**: Senior-level presentation with calm confidence

## 🚀 Features

### Design
- Awwwards-winning aesthetic
- Neutral color palette (off-white, soft gray, black) with subtle accent
- Typography-driven hierarchy with large bold headlines
- Clean, editorial layout

### Animations
- GSAP-powered smooth animations
- Scroll-based reveals and parallax effects
- Micro-interactions on hover
- Entrance animations for hero section
- Staggered element reveals
- Custom cursor (optional)
- Loading screen

### Sections
1. **Hero** - Bold statement with animated entrance
2. **About** - Bio with expertise and experience
3. **Selected Work** - 4 featured case studies with hover interactions
4. **Process** - 5-step design process
5. **Leadership** - Team building and mentorship focus
6. **Contact** - Simple, elegant CTA

### Technical
- Fully responsive (desktop, tablet, mobile)
- Modern CSS (Flexbox/Grid, CSS Variables)
- GSAP 3.12+ for animations
- ScrollTrigger for scroll-based effects
- Semantic HTML5
- Performance optimized
- Smooth scrolling

## 📁 File Structure

```
portfolio/
├── index.html          # Main HTML structure
├── styles.css          # Complete CSS with design system
├── script.js           # GSAP animations and interactions
└── README.md           # Documentation (this file)
```

## 🛠️ Technologies

- **HTML5** - Semantic markup
- **CSS3** - Modern layouts, animations, responsive design
- **JavaScript (ES6+)** - Vanilla JS for interactions
- **GSAP 3.12** - Animation library
- **ScrollTrigger** - Scroll-based animations
- **Google Fonts** - Inter & Space Grotesk

## 🎯 Usage

### Quick Start

1. **Open the portfolio**:
   - Simply open `index.html` in a modern web browser
   - Or serve with a local server for best experience

2. **Using a local server** (recommended):
   ```bash
   # Option 1: Python
   python -m http.server 8000

   # Option 2: Node.js
   npx serve

   # Option 3: VS Code Live Server extension
   # Right-click index.html → Open with Live Server
   ```

3. **Access in browser**:
   ```
   http://localhost:8000
   ```

### Customization

#### 1. Personal Information
Edit `index.html` to update:
- Name and title in `<title>` and hero section
- Bio in the About section
- Project case studies in the Work section
- Contact email and social links

#### 2. Colors & Branding
Edit CSS variables in `styles.css`:
```css
:root {
    --color-accent: #6366F1;        /* Your brand color */
    --color-text-primary: #0A0A0A;  /* Text color */
    --color-bg: #FAFAF9;            /* Background */
}
```

#### 3. Fonts
Change fonts in `index.html` (Google Fonts) and `styles.css`:
```css
--font-primary: 'Your Font', sans-serif;
--font-display: 'Your Display Font', sans-serif;
```

#### 4. Animations
Adjust animation timing in `script.js`:
```javascript
// Duration
duration: 0.8,  // Change animation speed

// Stagger
stagger: 0.15,  // Change stagger delay

// Ease
ease: 'power3.out'  // Change easing function
```

#### 5. Project Images
Replace gradient backgrounds in `index.html` with actual images:
```html
<!-- Replace this -->
<div class="project-card__image" style="background: linear-gradient(...);">

<!-- With this -->
<div class="project-card__image" style="background: url('your-image.jpg') center/cover;">
```

## ✨ Animation Details

### Hero Animation
- Title lines animate in with stagger
- Subtitle fades in
- Scroll indicator appears with pulsing line

### Scroll Animations
- Sections fade in as you scroll
- Project cards have staggered entrance
- Process steps reveal sequentially
- Subtle parallax on background elements

### Interactions
- Project cards have magnetic hover effect
- Images scale and shift on mouse movement
- Buttons have smooth hover states
- Navigation updates on scroll
- Smooth anchor scrolling

### Performance
- Intersection Observer for lazy animations
- ScrollTrigger for efficient scroll detection
- Optimized CSS with hardware acceleration
- Minimal JavaScript for core functionality

## 🎨 Design Tokens

### Colors
```
Background:    #FAFAF9 (off-white)
Surface:       #FFFFFF (white)
Primary Text:  #0A0A0A (near black)
Secondary:     #525252 (gray)
Tertiary:      #A3A3A3 (light gray)
Accent:        #6366F1 (indigo)
```

### Typography Scale
```
4XL: 2.5-5rem      (Hero titles)
3XL: 2-3.5rem      (Section titles)
2XL: 1.5-2.25rem   (Subtitles)
XL:  1.25-1.75rem  (Large text)
LG:  1.125-1.375rem (Body large)
Base: 1-1.125rem   (Body)
SM:  0.875-1rem    (Small)
XS:  0.75-0.875rem (Labels)
```

### Spacing Scale
```
3XL: 4-8rem    (Section spacing)
2XL: 3-6rem    (Large spacing)
XL:  2-4rem    (Medium-large)
LG:  1.5-2.5rem (Medium)
MD:  1-1.5rem   (Small-medium)
SM:  0.75-1rem  (Small)
XS:  0.5-0.75rem (Extra small)
```

## 📱 Responsive Breakpoints

```css
Desktop:  > 768px  (default)
Tablet:   ≤ 768px  (adjusted layouts)
Mobile:   ≤ 480px  (stacked layouts)
```

## 🚀 Deployment

### GitHub Pages
1. Push to GitHub repository
2. Go to Settings → Pages
3. Select branch and /root folder
4. Save and visit your site

### Netlify
1. Drag and drop the `portfolio` folder to Netlify
2. Or connect your GitHub repository
3. Deploy automatically

### Vercel
1. Import your GitHub repository
2. Deploy with zero configuration

## 🎯 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## 💡 Tips for Awwwards-Level Polish

1. **Whitespace**: Use generous spacing between sections
2. **Typography**: Keep hierarchy clear and consistent
3. **Animation Timing**: Subtle and smooth (300-600ms durations)
4. **Hover States**: Always provide feedback on interactive elements
5. **Loading**: Consider adding a preloader for first visit
6. **Performance**: Keep animations at 60fps
7. **Accessibility**: Ensure proper contrast and keyboard navigation
8. **Mobile**: Test thoroughly on actual devices

## 🔧 Optional Enhancements

### Enable Custom Cursor
Uncomment in `script.js`:
```javascript
// initCustomCursor();
```

### Add Loading Screen
Already included! Automatically shows on page load.

### Add More Projects
Duplicate project card structure in `index.html` and adjust grid in `styles.css`.

### Add Smooth Scroll Library
Consider adding Lenis or Locomotive Scroll for even smoother scrolling:
```html
<script src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@latest/bundled/lenis.min.js"></script>
```

## 📄 License

This portfolio template is free to use for personal and commercial projects.

## 🤝 Credits

- **Design & Development**: Claude (Anthropic)
- **Fonts**: Google Fonts (Inter, Space Grotesk)
- **Animation**: GSAP by GreenSock
- **Inspiration**: Awwwards-winning portfolio websites

## 📧 Support

For questions or customization help, refer to:
- [GSAP Documentation](https://greensock.com/docs/)
- [CSS Tricks](https://css-tricks.com/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

**Built with intention. Designed for impact.** ✨
