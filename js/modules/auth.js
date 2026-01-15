/**
 * Authentication Module
 * Handles sign in, sign up, and session management (UI only)
 */

import { State } from '../utils/state.js';
import { UI } from '../components/ui.js';
import { Navigation } from '../components/navigation.js';

export const Auth = {
    /**
     * Render sign in page
     */
    renderSignIn() {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <div class="auth-layout">
                <div class="auth-card">
                    <div class="auth-logo">
                        <div class="auth-logo-text">LMS</div>
                    </div>

                    <h2 class="auth-title">Welcome back</h2>
                    <p class="auth-subtitle">Sign in to your instructor account</p>

                    <form id="signin-form">
                        ${UI.createFormGroup(
                            'Email',
                            UI.createInput('email', 'Enter your email', '', 'email'),
                            '',
                            '',
                            true
                        )}

                        ${UI.createFormGroup(
                            'Password',
                            UI.createInput('password', 'Enter your password', '', 'password'),
                            '',
                            '',
                            true
                        )}

                        <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">
                            Sign In
                        </button>
                    </form>

                    <div class="auth-footer">
                        Don't have an account?
                        <a href="#" onclick="Auth.renderSignUp(); return false;">Create account</a>
                    </div>
                </div>
            </div>
        `;

        // Setup form handler
        document.getElementById('signin-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSignIn(e.target);
        });
    },

    /**
     * Render sign up page
     */
    renderSignUp() {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <div class="auth-layout">
                <div class="auth-card">
                    <div class="auth-logo">
                        <div class="auth-logo-text">LMS</div>
                    </div>

                    <h2 class="auth-title">Create your account</h2>
                    <p class="auth-subtitle">Start teaching online today</p>

                    <form id="signup-form">
                        ${UI.createFormGroup(
                            'Full Name',
                            UI.createInput('name', 'Enter your full name'),
                            '',
                            '',
                            true
                        )}

                        ${UI.createFormGroup(
                            'Email',
                            UI.createInput('email', 'Enter your email', '', 'email'),
                            '',
                            '',
                            true
                        )}

                        ${UI.createFormGroup(
                            'Password',
                            UI.createInput('password', 'Enter your password', '', 'password'),
                            'At least 6 characters',
                            '',
                            true
                        )}

                        ${UI.createFormGroup(
                            'Confirm Password',
                            UI.createInput('confirmPassword', 'Confirm your password', '', 'password'),
                            '',
                            '',
                            true
                        )}

                        <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">
                            Create Account
                        </button>
                    </form>

                    <div class="auth-footer">
                        Already have an account?
                        <a href="#" onclick="Auth.renderSignIn(); return false;">Sign in</a>
                    </div>
                </div>
            </div>
        `;

        // Setup form handler
        document.getElementById('signup-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSignUp(e.target);
        });
    },

    /**
     * Handle sign in
     */
    handleSignIn(form) {
        const validation = UI.validateForm(form, {
            email: {
                required: true,
                email: true,
                label: 'Email'
            },
            password: {
                required: true,
                minLength: 6,
                label: 'Password'
            }
        });

        if (!validation.valid) {
            return;
        }

        const { email, password } = validation.data;

        // Simulate authentication (in real app, would call API)
        UI.showLoading();

        setTimeout(() => {
            UI.hideLoading();

            // For demo, accept any email/password combination
            const user = {
                id: State.generateId(),
                name: email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                email: email,
                createdAt: new Date().toISOString()
            };

            State.setUser(user);
            UI.showToast('Welcome back! Signed in successfully.', 'success');

            // Render dashboard
            this.initializeApp();
        }, 800);
    },

    /**
     * Handle sign up
     */
    handleSignUp(form) {
        const validation = UI.validateForm(form, {
            name: {
                required: true,
                minLength: 2,
                label: 'Full Name'
            },
            email: {
                required: true,
                email: true,
                label: 'Email'
            },
            password: {
                required: true,
                minLength: 6,
                label: 'Password'
            },
            confirmPassword: {
                required: true,
                label: 'Confirm Password',
                custom: (value, data) => value === data.password,
                message: 'Passwords do not match'
            }
        });

        if (!validation.valid) {
            return;
        }

        const { name, email, password } = validation.data;

        // Simulate account creation
        UI.showLoading();

        setTimeout(() => {
            UI.hideLoading();

            const user = {
                id: State.generateId(),
                name: name,
                email: email,
                createdAt: new Date().toISOString()
            };

            State.setUser(user);
            State.setPlan('free');

            UI.showToast('Account created successfully! Welcome to LMS.', 'success');

            // Show onboarding or go to dashboard
            this.initializeApp();
        }, 800);
    },

    /**
     * Initialize app after authentication
     */
    initializeApp() {
        Navigation.init();
        Navigation.navigate('dashboard');
    },

    /**
     * Check if user is authenticated
     */
    checkAuth() {
        const user = State.get('user');
        const isAuthenticated = State.get('isAuthenticated');

        if (isAuthenticated && user) {
            this.initializeApp();
        } else {
            this.renderSignIn();
        }
    }
};

// Export for global access
if (typeof window !== 'undefined') {
    window.Auth = Auth;
}
