/**
 * Main Application Entry Point
 * Initializes and coordinates all modules
 */

import { State } from './utils/state.js';
import { UI } from './components/ui.js';
import { Navigation } from './components/navigation.js';
import { Auth } from './modules/auth.js';
import { Dashboard } from './modules/dashboard.js';
import { Courses } from './modules/courses.js';
import { Learners } from './modules/learners.js';
import { Quizzes } from './modules/quizzes.js';
import { Assignments } from './modules/assignments.js';
import { Certificates } from './modules/certificates.js';
import { Sessions } from './modules/sessions.js';
import { Payments } from './modules/payments.js';

/**
 * Application Class
 */
class LMSApp {
    constructor() {
        this.state = State;
        this.initialized = false;
    }

    /**
     * Initialize the application
     */
    async init() {
        console.log('🚀 Initializing LMS Platform...');

        // Show loading screen
        UI.showLoading();

        // Register all routes
        this.registerRoutes();

        // Check authentication and render appropriate view
        setTimeout(() => {
            UI.hideLoading();
            Auth.checkAuth();
            this.initialized = true;
            console.log('✅ LMS Platform initialized successfully');
        }, 500);

        // Add demo data if this is first time (for testing)
        this.addDemoDataIfNeeded();
    }

    /**
     * Register all application routes
     */
    registerRoutes() {
        Navigation.registerRoute('dashboard', () => Dashboard.render());
        Navigation.registerRoute('courses', () => Courses.render());
        Navigation.registerRoute('learners', () => Learners.render());
        Navigation.registerRoute('quizzes', () => Quizzes.render());
        Navigation.registerRoute('assignments', () => Assignments.render());
        Navigation.registerRoute('certificates', () => Certificates.render());
        Navigation.registerRoute('sessions', () => Sessions.render());
        Navigation.registerRoute('payments', () => Payments.render());
    }

    /**
     * Add demo data if needed (for first-time users)
     */
    addDemoDataIfNeeded() {
        const courses = State.get('courses');

        // Only add demo data if no courses exist and user is authenticated
        if (courses.length === 0 && State.get('isAuthenticated')) {
            console.log('📝 Adding demo data...');

            // Add a demo course
            const demoCourse = State.addCourse({
                title: 'Introduction to Web Development',
                description: 'Learn the fundamentals of HTML, CSS, and JavaScript to build modern websites.',
                language: 'English',
                difficulty: 'Beginner',
                pricingModel: 'one-time',
                price: 49.99,
                status: 'published',
                modules: [
                    {
                        title: 'Getting Started',
                        description: 'Introduction to web development',
                        lessons: [
                            {
                                title: 'Welcome to the Course',
                                type: 'video',
                                contentUrl: 'https://example.com/video1',
                                duration: 10,
                                freePreview: true
                            },
                            {
                                title: 'Setting Up Your Environment',
                                type: 'video',
                                contentUrl: 'https://example.com/video2',
                                duration: 15,
                                freePreview: false
                            }
                        ]
                    },
                    {
                        title: 'HTML Basics',
                        description: 'Learn HTML fundamentals',
                        lessons: [
                            {
                                title: 'HTML Structure',
                                type: 'video',
                                contentUrl: 'https://example.com/video3',
                                duration: 20,
                                freePreview: false
                            }
                        ]
                    }
                ]
            });

            // Add demo learners
            State.addLearner({
                name: 'John Doe',
                email: 'john@example.com',
                status: 'active',
                progress: 45,
                courses: [demoCourse.id],
                enrolledAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
            });

            State.addLearner({
                name: 'Jane Smith',
                email: 'jane@example.com',
                status: 'active',
                progress: 78,
                courses: [demoCourse.id],
                enrolledAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
            });

            // Add demo quiz
            State.addQuiz({
                title: 'HTML Basics Quiz',
                courseId: demoCourse.id,
                passingScore: 70,
                questions: [
                    {
                        question: 'What does HTML stand for?',
                        options: [
                            'Hyper Text Markup Language',
                            'High Tech Modern Language',
                            'Home Tool Markup Language',
                            'Hyperlinks and Text Markup Language'
                        ],
                        correctAnswer: 0
                    },
                    {
                        question: 'Which tag is used for the largest heading?',
                        options: ['<h6>', '<h1>', '<heading>', '<head>'],
                        correctAnswer: 1
                    }
                ]
            });

            // Add demo assignment
            State.addAssignment({
                title: 'Build Your First Webpage',
                instructions: 'Create a simple webpage using HTML and CSS. Include a header, navigation, main content area, and footer.',
                courseId: demoCourse.id,
                dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                submissions: []
            });

            // Add demo session
            State.addSession({
                title: 'Live Q&A Session',
                courseId: demoCourse.id,
                dateTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
                duration: 60,
                platform: 'Zoom',
                joinLink: 'https://zoom.us/j/example',
                attendance: []
            });

            // Add demo payments
            State.addPayment({
                amount: 49.99,
                status: 'completed',
                courseName: demoCourse.title,
                learnerName: 'John Doe'
            });

            State.addPayment({
                amount: 49.99,
                status: 'completed',
                courseName: demoCourse.title,
                learnerName: 'Jane Smith'
            });

            console.log('✅ Demo data added successfully');
        }
    }

    /**
     * Reset application (for testing)
     */
    reset() {
        if (confirm('This will clear all data. Are you sure?')) {
            State.reset();
            window.location.reload();
        }
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new LMSApp();
    app.init();

    // Expose app globally for debugging
    window.LMSApp = app;
    window.State = State;
});

// Handle browser back/forward buttons (simplified routing)
window.addEventListener('popstate', () => {
    if (State.get('isAuthenticated')) {
        const currentView = State.get('currentView');
        if (currentView && Navigation.routes[currentView]) {
            Navigation.navigate(currentView);
        }
    }
});

// Export for ES modules
export default LMSApp;
