# Ayman Taher - Personal Brand Website

A modern, responsive personal brand website built with **Tailwind CSS** featuring a dark theme, smooth animations, and a professional portfolio showcase.

## Features

### Design
- **Dark Theme**: Modern dark color scheme with cyan/green accent color (#00D9B1)
- **Responsive Design**: Fully responsive across desktop, tablet, and mobile devices
- **Smooth Animations**: Hover effects, transitions, and scroll animations
- **Accessibility**: Semantic HTML, ARIA labels, and keyboard-friendly navigation

### Sections

1. **Navigation Bar**
   - Fixed header with blur effect
   - Mobile-responsive menu
   - Smooth scroll to sections

2. **Hero Section**
   - Large, bold name display
   - Animated background elements
   - Call-to-action button
   - Scroll indicator

3. **About Me**
   - Profile picture with creative styling
   - Professional bio
   - Statistics (Projects, Followers, Clients, Reviews)
   - Contact button

4. **Company Logos**
   - Trusted brands showcase
   - Grayscale with hover effect

5. **Latest Case Studies**
   - Three featured projects
   - Image + description layout
   - Hover animations
   - CTA buttons for each project

6. **Solutions We Provide**
   - Service cards (SEO, UI/UX, Full-Stack Development)
   - Icon-based design
   - Hover effects

7. **Client Feedback**
   - Testimonial cards with 5-star ratings
   - Client avatars and details
   - Pagination controls

8. **Latest Activities**
   - Conference and workshop highlights
   - Large image cards with overlays
   - Category badges

9. **Everything You Need to Succeed**
   - Feature highlights
   - Icon-based cards
   - Center-aligned content

10. **Book A Consultation**
    - Service benefits list
    - Image + text layout
    - Call-to-action

11. **Blogs & Podcast**
    - Side-by-side content cards
    - Blog post previews
    - Podcast episode highlights
    - Bilingual support (English/Arabic)

12. **Some Selected Shots**
    - Mobile app design showcases
    - Device mockups
    - Gradient backgrounds

13. **Contact Section**
    - Contact information
    - Email and location
    - Contact form with validation
    - Professional styling

14. **Footer**
    - Copyright information
    - Social media links (Twitter, LinkedIn, GitHub, Dribbble)
    - Responsive layout

15. **Floating Chat Button**
    - Fixed position chat icon
    - Hover animation

## Technology Stack

- **HTML5**: Semantic markup
- **Tailwind CSS**: Utility-first CSS framework (via CDN)
- **Vanilla JavaScript**: For interactivity
- **Google Fonts**: Inter font family
- **Unsplash**: Placeholder images
- **Pravatar**: Avatar placeholder service

## Custom Tailwind Configuration

```javascript
colors: {
    primary: '#00D9B1',      // Cyan/Green accent
    dark: '#0A0A0A',         // Main background
    'dark-lighter': '#1A1A1A', // Secondary background
    'dark-card': '#111111',   // Card backgrounds
}
```

## JavaScript Features

1. **Mobile Menu Toggle**: Hamburger menu for mobile devices
2. **Smooth Scrolling**: Anchor links scroll smoothly to sections
3. **Navbar Background**: Changes on scroll
4. **Form Handling**: Contact form with basic validation
5. **Interactive Elements**: Hover states and transitions

## File Structure

```
sjeaa/
├── index.html          # Main HTML file
├── README.md           # Documentation
├── css/               # CSS files (legacy, not used)
│   ├── components.css
│   ├── design-system.css
│   └── main.css
└── js/                # JavaScript files (legacy, not used)
    ├── app.js
    ├── components/
    ├── modules/
    └── utils/
```

## Usage

### Local Development

Simply open `index.html` in your web browser:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Or just open the file
open index.html
```

### Customization

#### Colors
Update the Tailwind config in `<head>`:
```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#YOUR_COLOR',
                // ...
            }
        }
    }
}
```

#### Content
- Update text content directly in the HTML
- Replace image URLs with your own
- Modify social media links in the footer
- Update email and location in the contact section

#### Sections
- Add/remove sections as needed
- All sections are self-contained
- Use existing components as templates

## Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Accessibility Features

- Semantic HTML5 elements
- ARIA labels for interactive elements
- Keyboard navigation support
- High contrast colors
- Alt text for images
- Focus states for interactive elements

## Performance

- **Tailwind CSS CDN**: Fast loading with built-in purging
- **Optimized Images**: Placeholder images from Unsplash
- **Minimal JavaScript**: Vanilla JS for minimal overhead
- **Lazy Loading**: Browser-native lazy loading for images

## Credits

- **Design**: Based on modern portfolio trends
- **Images**: [Unsplash](https://unsplash.com)
- **Avatars**: [Pravatar](https://pravatar.cc)
- **Icons**: Heroicons (via Tailwind CSS)
- **Fonts**: [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)

## License

MIT License - Feel free to use this template for your own portfolio!

## Contact

For questions or feedback, reach out at: hello@aymantaher.com

---

Built with ❤️ using Tailwind CSS
