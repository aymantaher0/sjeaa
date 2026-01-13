# Carrd Clone - Frontend Demo (No Backend Required)

This is a **standalone frontend demo** of the Carrd Clone website builder. It runs entirely in the browser with no backend or database needed!

## ✨ Features

- 🎨 **Full Visual Builder** - All UI components and interactions
- 💾 **LocalStorage Data** - Data persists in your browser
- 🔐 **Mock Authentication** - Simulated login/signup
- 📱 **Responsive Preview** - Desktop and mobile modes
- 🎭 **Pre-built Templates** - Portfolio, Landing Page, Link in Bio
- 🚀 **Instant Start** - No installation, no setup, no backend!

## 🚀 Quick Start

### Option 1: Run Locally (3 commands)

```bash
# 1. Navigate to the demo directory
cd frontend-demo

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open http://localhost:5173 in your browser!

### Option 2: Build for Production

```bash
# Build static files
npm run build

# Preview the build
npm run preview
```

The `dist` folder contains all static files - you can deploy them anywhere!

## 📦 What's Inside?

This demo includes:

- ✅ **Complete UI** - All the same components as the full version
- ✅ **Mock APIs** - Simulates backend with localStorage
- ✅ **8 Element Types** - Text, Image, Button, Form, Social, Embed, Timer, Container
- ✅ **3 Templates** - Ready-to-use designs
- ✅ **Properties Panel** - Main, Appearance, Settings tabs
- ✅ **Undo/Redo** - Full history management
- ✅ **Save/Load** - Works with browser localStorage

## 🎮 How to Use

1. **Sign Up** - Create a mock account (stored in browser)
2. **Create Site** - Give it a name and URL slug
3. **Start Building** - Use the visual builder
   - Add sections with "+ Section"
   - Add elements with "+ Element"
   - Click elements to edit their properties
   - Use tabs to customize appearance
4. **Preview** - Toggle between desktop and mobile views
5. **Save** - Your work saves to localStorage
6. **Publish** - Simulates publishing (no real deployment)

## 🔧 Technical Details

### No Backend Needed

All data is stored in browser's localStorage:
- `carrd_demo_users` - Mock user accounts
- `carrd_demo_user` - Current user session
- `carrd_demo_token` - Mock auth token
- `carrd_demo_sites` - Your created sites
- `carrd_demo_structures` - Page structures

### Mock APIs

Three mock API modules replace the real backend:
- `mockAuth.ts` - Authentication (signup, login)
- `mockSites.ts` - Site management (CRUD operations)
- `mockTemplates.ts` - Pre-built templates

### Dependencies

Minimal dependencies for maximum simplicity:
- **React 18** - UI library
- **React Router** - Client-side routing
- **Zustand** - State management
- **Vite** - Build tool

**No** Axios, **no** API client, **no** backend dependencies!

## 🌐 Deploy Anywhere

Since this is pure static HTML/CSS/JS, you can deploy to:

- **Netlify** - Just drag the `dist` folder
- **Vercel** - Connect to GitHub repo
- **GitHub Pages** - Push to gh-pages branch
- **Cloudflare Pages** - Automatic deployment
- **Surge** - `surge ./dist`
- **Any static host** - Upload the `dist` folder

### Example: Deploy to Netlify

```bash
npm run build
# Drag the 'dist' folder to netlify.com/drop
```

## 🎯 Perfect For

- 🎨 **UI Review** - See the interface without setup
- 💼 **Portfolio** - Show off the design
- 🎓 **Demo** - Present to clients/team
- 🧪 **Testing** - Try features without backend
- 📚 **Learning** - Understand the frontend architecture

## 🔍 Differences from Full Version

### What's the Same
- ✅ All UI components
- ✅ All element types
- ✅ Builder functionality
- ✅ Properties panel
- ✅ Templates
- ✅ Preview modes

### What's Different
- ❌ No real authentication (mock only)
- ❌ No database persistence (localStorage only)
- ❌ No actual publishing (simulated)
- ❌ Data lost on browser clear
- ❌ No multi-user support

## 📁 File Structure

```
frontend-demo/
├── src/
│   ├── api/
│   │   ├── mockAuth.ts       # Mock authentication
│   │   ├── mockSites.ts      # Mock site management
│   │   └── mockTemplates.ts  # Mock templates
│   ├── components/
│   │   ├── builder/          # Builder UI components
│   │   └── elements/         # Element renderers
│   ├── pages/                # Page components
│   ├── store/                # Zustand stores
│   ├── types/                # TypeScript types
│   ├── App.tsx               # Main app
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles
├── index.html                # HTML template
├── package.json              # Dependencies
└── vite.config.ts            # Vite config
```

## 💡 Tips

1. **Clear Data**: Open DevTools → Application → Local Storage → Clear
2. **Export Work**: Copy site structure from localStorage before clearing
3. **Multiple Accounts**: Use different browser profiles
4. **Development**: Changes auto-reload with `npm run dev`

## 🐛 Troubleshooting

### Nothing loads?
- Clear browser cache and localStorage
- Check browser console for errors
- Try incognito/private mode

### Lost your work?
- Data is stored in localStorage
- Cleared when you clear browser data
- Export important work regularly

### Port 5173 in use?
- Vite will automatically use next available port
- Or specify port: `vite --port 3000`

## 🔗 Links

- **Full Version**: See main README for backend-enabled version
- **Docker Version**: Use Docker for complete setup
- **GitHub**: [Repository link]

## 📝 License

MIT - Same as the full version

---

**Enjoy building websites! 🚀**

No backend, no database, no problem! ✨
