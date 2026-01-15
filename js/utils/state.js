/**
 * State Management System
 * Centralized state management with localStorage persistence
 */

import { Storage } from './storage.js';

// Initial state structure
const initialState = {
    user: null,
    isAuthenticated: false,
    courses: [],
    learners: [],
    quizzes: [],
    assignments: [],
    certificates: [],
    sessions: [],
    payments: [],
    currentPlan: 'free',
    currentView: 'auth'
};

class StateManager {
    constructor() {
        this.state = this.loadState();
        this.listeners = {};
    }

    /**
     * Load state from localStorage or use initial state
     */
    loadState() {
        const savedState = Storage.get('lms_state');
        return savedState ? { ...initialState, ...savedState } : { ...initialState };
    }

    /**
     * Save state to localStorage
     */
    saveState() {
        Storage.set('lms_state', this.state);
    }

    /**
     * Get current state
     */
    getState() {
        return { ...this.state };
    }

    /**
     * Get specific state property
     */
    get(key) {
        return this.state[key];
    }

    /**
     * Set state and trigger listeners
     */
    setState(updates) {
        const prevState = { ...this.state };
        this.state = { ...this.state, ...updates };
        this.saveState();
        this.notify(prevState, this.state);
    }

    /**
     * Subscribe to state changes
     */
    subscribe(listener) {
        const id = Date.now() + Math.random();
        this.listeners[id] = listener;
        return () => delete this.listeners[id];
    }

    /**
     * Notify all listeners of state changes
     */
    notify(prevState, newState) {
        Object.values(this.listeners).forEach(listener => {
            listener(newState, prevState);
        });
    }

    /**
     * Reset state to initial state
     */
    reset() {
        this.state = { ...initialState };
        this.saveState();
        this.notify({}, this.state);
    }

    // === AUTH METHODS ===

    setUser(user) {
        this.setState({
            user,
            isAuthenticated: true,
            currentView: 'dashboard'
        });
    }

    logout() {
        this.setState({
            user: null,
            isAuthenticated: false,
            currentView: 'auth'
        });
    }

    // === COURSE METHODS ===

    addCourse(course) {
        const courses = [...this.state.courses, {
            ...course,
            id: this.generateId(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }];
        this.setState({ courses });
        return courses[courses.length - 1];
    }

    updateCourse(id, updates) {
        const courses = this.state.courses.map(course =>
            course.id === id ? { ...course, ...updates, updatedAt: new Date().toISOString() } : course
        );
        this.setState({ courses });
    }

    deleteCourse(id) {
        const courses = this.state.courses.filter(course => course.id !== id);
        this.setState({ courses });
    }

    getCourse(id) {
        return this.state.courses.find(course => course.id === id);
    }

    // === LEARNER METHODS ===

    addLearner(learner) {
        const learners = [...this.state.learners, {
            ...learner,
            id: this.generateId(),
            createdAt: new Date().toISOString()
        }];
        this.setState({ learners });
        return learners[learners.length - 1];
    }

    updateLearner(id, updates) {
        const learners = this.state.learners.map(learner =>
            learner.id === id ? { ...learner, ...updates } : learner
        );
        this.setState({ learners });
    }

    deleteLearner(id) {
        const learners = this.state.learners.filter(learner => learner.id !== id);
        this.setState({ learners });
    }

    getLearner(id) {
        return this.state.learners.find(learner => learner.id === id);
    }

    // === QUIZ METHODS ===

    addQuiz(quiz) {
        const quizzes = [...this.state.quizzes, {
            ...quiz,
            id: this.generateId(),
            createdAt: new Date().toISOString()
        }];
        this.setState({ quizzes });
        return quizzes[quizzes.length - 1];
    }

    updateQuiz(id, updates) {
        const quizzes = this.state.quizzes.map(quiz =>
            quiz.id === id ? { ...quiz, ...updates } : quiz
        );
        this.setState({ quizzes });
    }

    deleteQuiz(id) {
        const quizzes = this.state.quizzes.filter(quiz => quiz.id !== id);
        this.setState({ quizzes });
    }

    getQuiz(id) {
        return this.state.quizzes.find(quiz => quiz.id === id);
    }

    // === ASSIGNMENT METHODS ===

    addAssignment(assignment) {
        const assignments = [...this.state.assignments, {
            ...assignment,
            id: this.generateId(),
            createdAt: new Date().toISOString()
        }];
        this.setState({ assignments });
        return assignments[assignments.length - 1];
    }

    updateAssignment(id, updates) {
        const assignments = this.state.assignments.map(assignment =>
            assignment.id === id ? { ...assignment, ...updates } : assignment
        );
        this.setState({ assignments });
    }

    deleteAssignment(id) {
        const assignments = this.state.assignments.filter(assignment => assignment.id !== id);
        this.setState({ assignments });
    }

    getAssignment(id) {
        return this.state.assignments.find(assignment => assignment.id === id);
    }

    // === CERTIFICATE METHODS ===

    addCertificate(certificate) {
        const certificates = [...this.state.certificates, {
            ...certificate,
            id: this.generateId(),
            issuedAt: new Date().toISOString()
        }];
        this.setState({ certificates });
        return certificates[certificates.length - 1];
    }

    updateCertificate(id, updates) {
        const certificates = this.state.certificates.map(cert =>
            cert.id === id ? { ...cert, ...updates } : cert
        );
        this.setState({ certificates });
    }

    deleteCertificate(id) {
        const certificates = this.state.certificates.filter(cert => cert.id !== id);
        this.setState({ certificates });
    }

    getCertificate(id) {
        return this.state.certificates.find(cert => cert.id === id);
    }

    // === SESSION METHODS ===

    addSession(session) {
        const sessions = [...this.state.sessions, {
            ...session,
            id: this.generateId(),
            createdAt: new Date().toISOString()
        }];
        this.setState({ sessions });
        return sessions[sessions.length - 1];
    }

    updateSession(id, updates) {
        const sessions = this.state.sessions.map(session =>
            session.id === id ? { ...session, ...updates } : session
        );
        this.setState({ sessions });
    }

    deleteSession(id) {
        const sessions = this.state.sessions.filter(session => session.id !== id);
        this.setState({ sessions });
    }

    getSession(id) {
        return this.state.sessions.find(session => session.id === id);
    }

    // === PAYMENT METHODS ===

    addPayment(payment) {
        const payments = [...this.state.payments, {
            ...payment,
            id: this.generateId(),
            createdAt: new Date().toISOString()
        }];
        this.setState({ payments });
        return payments[payments.length - 1];
    }

    // === PLAN METHODS ===

    setPlan(planType) {
        this.setState({ currentPlan: planType });
    }

    getPlanLimits() {
        const limits = {
            free: {
                courses: 1,
                studentsPerCourse: 50,
                storage: 1024, // 1GB
                customDomain: false,
                paymentGateways: 1,
                teamMembers: 1
            },
            pro: {
                courses: 10,
                studentsPerCourse: 500,
                storage: 10240, // 10GB
                customDomain: true,
                paymentGateways: 2,
                teamMembers: 3
            },
            proPlus: {
                courses: Infinity,
                studentsPerCourse: Infinity,
                storage: Infinity,
                customDomain: true,
                paymentGateways: Infinity,
                teamMembers: 10
            }
        };
        return limits[this.state.currentPlan] || limits.free;
    }

    canAddCourse() {
        const limits = this.getPlanLimits();
        return this.state.courses.length < limits.courses;
    }

    // === UTILITY METHODS ===

    generateId() {
        return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    setCurrentView(view) {
        this.setState({ currentView: view });
    }
}

// Create singleton instance
export const State = new StateManager();

// Export for debugging
if (typeof window !== 'undefined') {
    window.LMSState = State;
}
