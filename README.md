# LMS Platform - Modern Learning Management System

A lightweight, modern Learning Management System (LMS) designed for solo instructors and small academies. Built with vanilla JavaScript, HTML, and CSS with a modern component-based design system inspired by Uxcel.

## 🚀 Features

### Core Modules

- **🔐 Authentication** - Sign in/Sign up with fake session management (UI only)
- **📊 Dashboard** - Overview with key stats and quick actions
- **📚 Courses** - Create, edit, and manage courses with modules and lessons
- **📖 Content Management** - Structure courses with modules, lessons (video, PDF, text)
- **👥 Learners** - Manage student enrollment and track progress
- **📝 Quizzes** - Create auto-graded quizzes with multiple choice questions
- **📄 Assignments** - Collect and grade student submissions
- **🏆 Certificates** - Configure certificate templates and auto-issue certificates
- **🎥 Live Sessions** - Schedule live sessions with attendance tracking
- **💳 Payments & Plans** - Three-tier pricing (Free, Pro, Pro Plus) with feature restrictions

### Design System

Modern, Uxcel-inspired UI components:

- ✅ Reusable buttons (primary, secondary, ghost, destructive)
- ✅ Form inputs with validation and error states
- ✅ Cards, modals, and drawers
- ✅ Tables and data grids
- ✅ Tabs and navigation
- ✅ Toasts and alerts
- ✅ Empty states and skeleton loaders
- ✅ Progress bars and badges
- ✅ Fully responsive layout

## 📋 Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- No backend required - all data stored in localStorage
- No build process needed - vanilla JavaScript with ES modules

## 🛠️ Setup & Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sjeaa
   ```

2. **Open in browser**

   Simply open `index.html` in your web browser:

   ```bash
   # Using Python's built-in server (recommended)
   python3 -m http.server 8000
   # Then visit: http://localhost:8000

   # OR using Node.js http-server
   npx http-server -p 8000
   # Then visit: http://localhost:8000

   # OR just double-click index.html
   ```

3. **Sign up / Sign in**
   - Create a new account with any email/password (no validation)
   - Or sign in with any credentials (all combinations work for demo)

## 🎯 Usage Guide

### Getting Started

1. **Create Your First Course**
   - Go to Courses → Create Course
   - Fill in course details (title, description, price, etc.)
   - Click "Create Course"

2. **Add Course Content**
   - Open the course editor
   - Click "Add Module" to create a module
   - Inside each module, click "Add Lesson"
   - Choose lesson type (Video, PDF, Text)
   - Add content URL and details

3. **Create Assessments**
   - Go to Quizzes → Create Quiz
   - Add multiple-choice questions
   - Set passing score
   - Assign to a course

4. **Manage Learners**
   - Go to Learners → Add Learner
   - Enter learner details
   - Enroll them in courses
   - Track their progress

5. **Schedule Live Sessions**
   - Go to Live Sessions → Schedule Session
   - Set date, time, and platform (Zoom, Meet, etc.)
   - Add join link
   - Track attendance after the session

6. **Configure Certificates**
   - Go to Certificates
   - Select a course
   - Configure certificate template (colors, signature, etc.)
   - Set completion requirements

### Plan Tiers

#### Free Plan
- 1 course
- 50 students per course
- 1 GB storage
- 1 payment gateway
- Basic features

#### Pro Plan ($29/month)
- 10 courses
- 500 students per course
- 10 GB storage
- 2 payment gateways
- Custom domain
- Priority support

#### Pro Plus Plan ($99/month)
- Unlimited courses
- Unlimited students
- Unlimited storage
- Unlimited payment gateways
- Custom domain
- Team collaboration
- Advanced analytics
- Priority support

## 📁 Project Structure

```
sjeaa/
├── index.html                 # Main HTML entry point
├── css/
│   ├── design-system.css     # Design tokens and variables
│   ├── components.css        # Reusable UI components
│   └── main.css              # Layout and responsive styles
├── js/
│   ├── utils/
│   │   ├── state.js         # State management system
│   │   └── storage.js       # localStorage utilities
│   ├── components/
│   │   ├── ui.js            # UI component functions
│   │   └── navigation.js    # Routing and navigation
│   ├── modules/
│   │   ├── auth.js          # Authentication module
│   │   ├── dashboard.js     # Dashboard module
│   │   ├── courses.js       # Courses management
│   │   ├── learners.js      # Learner management
│   │   ├── quizzes.js       # Quiz creation & grading
│   │   ├── assignments.js   # Assignment management
│   │   ├── certificates.js  # Certificate templates
│   │   ├── sessions.js      # Live session scheduling
│   │   └── payments.js      # Plans & billing
│   └── app.js               # Main application initialization
└── README.md                 # This file
```

## 🎨 Design System

### Color Palette

- **Primary**: Blue (#5576ff)
- **Success**: Green (#10b981)
- **Warning**: Amber (#f59e0b)
- **Error**: Red (#ef4444)
- **Neutral**: Gray scale

### Typography

- Font Family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto
- Scale: 12px, 14px, 16px, 18px, 20px, 24px, 30px, 36px
- Weights: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Spacing

- Base unit: 4px
- Scale: 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px, 80px

## 🔧 Technical Details

### State Management

All application state is managed through a centralized `State` object stored in `localStorage`. The state includes:

- User session
- Courses and content
- Learners and enrollments
- Quizzes, assignments, and certificates
- Live sessions and attendance
- Payment history
- Current subscription plan

### Routing

Simple client-side routing using a route registry. No URL changes (SPA behavior).

Routes are registered in `app.js` and handled by the `Navigation` component.

### Form Validation

Built-in form validation with rules:
- Required fields
- Email validation
- Min/max length
- Pattern matching
- Custom validators

### Responsive Design

Mobile-first responsive design with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🧪 Demo Data

The platform automatically loads demo data on first use:
- 1 sample course with modules and lessons
- 2 demo learners
- 1 quiz with questions
- 1 assignment
- 1 scheduled live session
- Sample payment history

## 🔒 Security Notes

⚠️ **Important**: This is a front-end only demo application. In production:

- Implement proper backend authentication
- Validate all inputs on the server
- Use secure password hashing
- Implement rate limiting
- Add CSRF protection
- Use HTTPS
- Sanitize user inputs
- Implement proper authorization

## 🚀 Future Enhancements

Potential features for production version:

- Backend API integration
- Real payment processing (Stripe, PayPal)
- Email notifications
- Real-time collaboration
- Video hosting integration
- Advanced analytics
- Mobile app
- Multi-language support
- Theme customization
- Export/import data
- Bulk operations
- Advanced reporting

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

This is a demo project. For production use, consider:

1. Adding a proper backend (Node.js, Python, etc.)
2. Implementing database storage (PostgreSQL, MongoDB)
3. Adding authentication (JWT, OAuth)
4. Implementing file uploads (S3, Cloudinary)
5. Adding real-time features (WebSockets)
6. Implementing proper testing (Jest, Cypress)

## 📄 License

This project is provided as-is for demonstration purposes.

## 🙏 Acknowledgments

- Design inspired by [Uxcel](https://uxcel.com)
- Icons: Unicode emoji characters
- Fonts: System default fonts

## 📞 Support

For questions or issues:
1. Check the browser console for errors
2. Clear localStorage and refresh: `localStorage.clear()`
3. Check browser compatibility
4. Verify local server is running

---

**Built with ❤️ using vanilla JavaScript, HTML, and CSS**
