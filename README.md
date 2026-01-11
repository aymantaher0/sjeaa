# Carrd Clone - No-Code Website Builder

A full-stack website builder application similar to Carrd, built with React, TypeScript, Node.js, Express, and PostgreSQL.

## Features

- **User Authentication**: JWT-based authentication with signup/login
- **Visual Page Builder**: Drag-and-drop interface with live preview
- **Element Types**: Text, Image, Button, Form, Social Icons, Embed, Timer, Container
- **Properties Panel**: Edit content, appearance, and settings for each element
- **Section Management**: Full-width or boxed layouts with customizable padding
- **Background Customization**: Colors, gradients, images, and videos
- **Responsive Preview**: Desktop and mobile view modes
- **Undo/Redo**: Full history management
- **Publishing**: Static site generation with subdomain/custom domain support
- **Plan-Based Limits**: Free, Pro Lite, Pro Standard, and Pro Plus tiers
- **Template System**: Pre-built templates for quick starts

## Tech Stack

### Backend
- Node.js + Express
- TypeScript
- PostgreSQL
- JWT Authentication
- bcrypt for password hashing

### Frontend
- React 18
- TypeScript
- Vite
- Zustand (state management)
- React Router
- Axios

## Project Structure

```
sjeaa/
├── backend/
│   ├── src/
│   │   ├── controllers/       # Request handlers
│   │   ├── db/                # Database connection and migrations
│   │   ├── middleware/        # Auth and plan limits
│   │   ├── models/            # Database models
│   │   ├── routes/            # API routes
│   │   ├── services/          # Business logic (publishing)
│   │   ├── types/             # TypeScript types
│   │   └── index.ts           # Express app entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── api/               # API client functions
│   │   ├── components/        # React components
│   │   │   ├── builder/       # Builder UI components
│   │   │   └── elements/      # Element renderers
│   │   ├── pages/             # Page components
│   │   ├── store/             # Zustand stores
│   │   ├── types/             # TypeScript types
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL 12+
- Git

### 1. Clone the Repository

```bash
git clone <repository-url>
cd sjeaa
```

### 2. Set Up PostgreSQL Database

Create a new PostgreSQL database:

```bash
psql -U postgres
CREATE DATABASE carrd_clone;
\q
```

### 3. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
# Update DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD
# Update JWT_SECRET to a secure random string

# Run database migrations
npm run db:migrate

# Seed initial templates (optional)
npm run db:seed

# Start development server
npm run dev
```

The backend will run on `http://localhost:3000`

### 4. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will run on `http://localhost:5173`

### 5. Access the Application

Open your browser and navigate to:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3000`

## Environment Variables

### Backend (.env)

```env
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=carrd_clone
DB_USER=postgres
DB_PASSWORD=postgres

JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRES_IN=7d

APP_DOMAIN=localhost:3000
FRONTEND_URL=http://localhost:5173

PUBLISH_DIR=./published_sites
SUBDOMAIN_BASE=app-domain.com
```

### Frontend (.env - optional)

```env
VITE_API_URL=http://localhost:3000
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Sites
- `GET /api/sites` - List all user sites
- `POST /api/sites` - Create new site
- `GET /api/sites/:siteId` - Get site details
- `PUT /api/sites/:siteId` - Update site
- `DELETE /api/sites/:siteId` - Delete site
- `GET /api/sites/:siteId/structure` - Get page structure
- `PUT /api/sites/:siteId/structure` - Update page structure
- `POST /api/sites/:siteId/publish` - Publish site

### Templates
- `GET /api/templates` - List templates
- `GET /api/templates/:templateId` - Get template
- `POST /api/templates/:templateId/apply/:siteId` - Apply template to site

## Database Schema

### Main Tables
- **users**: User accounts with plan types
- **sites**: User-created sites
- **pages**: One page per site with layout config
- **sections**: Vertical sections within a page
- **elements**: Individual elements within sections
- **templates**: Pre-built site templates
- **domains**: Published domain configurations

## Plan Limits

### Free
- 1 site
- Subdomain only
- Platform branding
- 50MB storage

### Pro Lite
- 3 sites
- Subdomain only
- Remove branding
- 200MB storage

### Pro Standard
- 10 sites
- Custom domains + SSL
- Contact forms
- Analytics integration
- 500MB storage

### Pro Plus
- 25 sites
- All Pro Standard features
- Advanced forms (webhooks)
- Password-protected sites
- Export source code
- 1GB storage

## Building for Production

### Backend

```bash
cd backend
npm run build
npm start
```

### Frontend

```bash
cd frontend
npm run build
npm run preview
```

## Usage Guide

### Creating Your First Site

1. Sign up for an account
2. Click "Create New Site" on the dashboard
3. Enter a site name and URL slug
4. Click "Create Site"

### Building Your Page

1. Click "Edit" on a site card
2. Use "+ Section" to add new sections
3. Select a section and use "+ Element" to add elements
4. Click on elements to edit their properties
5. Use the Properties Panel tabs:
   - **Main**: Edit content and behavior
   - **Appearance**: Customize colors, fonts, spacing
   - **Settings**: Set IDs and custom classes
6. Use "Undo/Redo" for history management
7. Toggle between Desktop and Mobile preview
8. Click "Save" to save your changes
9. Click "Publish" when ready to go live

### Element Types

- **Text**: HTML content with rich formatting
- **Image**: Images with URLs and alt text
- **Button**: Call-to-action buttons with links
- **Form**: Contact forms with custom fields
- **Social Icons**: Links to social media profiles
- **Embed**: YouTube videos or custom HTML
- **Timer**: Countdown timers
- **Container**: Layout containers for grouping

## Development

### Backend Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run production build
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with templates

### Frontend Scripts

- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Verify database credentials in `.env`
- Check if the database exists

### Port Already in Use
- Backend: Change `PORT` in backend `.env`
- Frontend: Vite will prompt for an alternative port

### Authentication Issues
- Clear browser localStorage
- Verify `JWT_SECRET` is set in backend `.env`

## Future Enhancements

- Real-time collaboration
- More element types (gallery, accordion, tabs)
- Advanced animations and transitions
- SEO optimization tools
- A/B testing
- Analytics dashboard
- Team management
- Version history
- Custom code injection
- Third-party integrations (Zapier, Mailchimp, etc.)

## License

MIT

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Support

For issues and questions, please open a GitHub issue.
