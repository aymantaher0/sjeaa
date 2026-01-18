# Project Folder Structure

## Overview
This document outlines the complete folder structure of the Ayman Taher Personal Brand Website.

```
ayman-taher-portfolio/
│
├── public/                          # Static assets
│   └── favicon.svg                  # Site favicon
│
├── src/                             # Source code
│   ├── assets/                      # Images, fonts, etc.
│   │   ├── images/                  # Image files
│   │   └── fonts/                   # Custom fonts (if any)
│   │
│   ├── components/                  # React components
│   │   ├── layout/                  # Layout components
│   │   │   ├── Header.jsx          # Navigation header
│   │   │   └── Footer.jsx          # Site footer
│   │   │
│   │   ├── ui/                      # Reusable UI components
│   │   │   ├── Button.jsx          # Button component
│   │   │   ├── Card.jsx            # Card component
│   │   │   ├── Badge.jsx           # Badge component
│   │   │   └── SectionContainer.jsx # Section wrapper
│   │   │
│   │   └── sections/                # Page sections
│   │       ├── Hero.jsx            # Hero section
│   │       ├── About.jsx           # About section
│   │       ├── CaseStudies.jsx     # Case studies section
│   │       ├── Solutions.jsx       # Solutions/services section
│   │       ├── Testimonials.jsx    # Testimonials section
│   │       ├── Activities.jsx      # Activities/events section
│   │       ├── CTASections.jsx     # CTA sections
│   │       ├── SelectedShots.jsx   # Portfolio shots section
│   │       └── CoreSupport.jsx     # Support features section
│   │
│   ├── data/                        # Static data (optional)
│   │   └── content.js               # Content data
│   │
│   ├── styles/                      # Stylesheets
│   │   └── index.css                # Global styles + Tailwind
│   │
│   ├── App.jsx                      # Main App component
│   └── main.jsx                     # Entry point
│
├── .gitignore                       # Git ignore rules
├── package.json                     # Dependencies and scripts
├── postcss.config.js               # PostCSS configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── vite.config.js                  # Vite configuration
├── portfolio-index.html            # HTML template
├── PORTFOLIO_README.md             # Project documentation
└── FOLDER_STRUCTURE.md             # This file

```

## Component Architecture

### Layout Components (`src/components/layout/`)
These components define the overall structure and are used across all pages:
- **Header.jsx**: Top navigation with logo, menu, and mobile menu
- **Footer.jsx**: Bottom section with links, contact info, and social media

### UI Components (`src/components/ui/`)
Reusable, atomic components that follow consistent design patterns:
- **Button.jsx**: Multi-variant button (primary, secondary, outline, ghost)
- **Card.jsx**: Container component with hover effects
- **Badge.jsx**: Small label component with color variants
- **SectionContainer.jsx**: Wrapper for consistent section spacing

### Section Components (`src/components/sections/`)
Main content sections of the website:
- **Hero.jsx**: Landing section with animated typing effect
- **About.jsx**: Profile, bio, statistics, and company logos
- **CaseStudies.jsx**: Project showcases with images and descriptions
- **Solutions.jsx**: Services grid with icons and descriptions
- **Testimonials.jsx**: Client feedback with ratings and avatars
- **Activities.jsx**: Recent events and speaking engagements
- **CTASections.jsx**: Consultation, blog, and podcast sections
- **SelectedShots.jsx**: Portfolio mobile mockups
- **CoreSupport.jsx**: Support features and final CTA

## File Naming Conventions

- **Components**: PascalCase (e.g., `Header.jsx`, `Button.jsx`)
- **Utilities**: camelCase (e.g., `helpers.js`, `constants.js`)
- **Styles**: kebab-case (e.g., `index.css`)
- **Config files**: kebab-case (e.g., `tailwind.config.js`)

## Import Structure

Components follow this import order:
1. React and external libraries
2. Internal components
3. UI components
4. Icons
5. Styles (if applicable)

Example:
```javascript
import React from 'react'
import SectionContainer from '../ui/SectionContainer'
import Button from '../ui/Button'
import { HiArrowRight } from 'react-icons/hi'
```

## Styling Approach

- **Utility-first**: Using Tailwind CSS utilities
- **Component classes**: Defined in `src/styles/index.css`
- **Custom utilities**: Added via Tailwind config
- **Responsive**: Mobile-first breakpoints

## Best Practices

1. **Keep components small and focused**: Each component should do one thing well
2. **Use composition**: Build complex UIs from simple components
3. **Props validation**: Consider adding PropTypes or TypeScript
4. **Accessibility**: Include ARIA labels and semantic HTML
5. **Performance**: Lazy load images and heavy components when needed

## Future Extensions

Possible additions to the structure:
```
src/
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── context/            # React Context providers
├── pages/              # If adding routing
└── constants/          # App-wide constants
```
