/**
 * Navigation & Routing System
 * Handles sidebar, routing, and page navigation
 */

import { State } from '../utils/state.js';

export const Navigation = {
    currentRoute: 'dashboard',
    routes: {},

    /**
     * Initialize navigation
     */
    init() {
        this.setupEventListeners();
        this.render();
    },

    /**
     * Register a route
     */
    registerRoute(path, handler) {
        this.routes[path] = handler;
    },

    /**
     * Navigate to a route
     */
    navigate(route, params = {}) {
        this.currentRoute = route;
        State.setCurrentView(route);

        // Update active sidebar link
        this.updateActiveLink(route);

        // Call route handler
        if (this.routes[route]) {
            this.routes[route](params);
        }
    },

    /**
     * Update active sidebar link
     */
    updateActiveLink(route) {
        document.querySelectorAll('.sidebar-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.route === route) {
                link.classList.add('active');
            }
        });
    },

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Handle mobile menu toggle
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('mobile-menu-toggle')) {
                this.toggleMobileSidebar();
            }
        });

        // Handle sidebar navigation clicks
        document.addEventListener('click', (e) => {
            const link = e.target.closest('.sidebar-link');
            if (link && link.dataset.route) {
                e.preventDefault();
                const route = link.dataset.route;
                this.navigate(route);

                // Close mobile sidebar after navigation
                if (window.innerWidth <= 1024) {
                    this.closeMobileSidebar();
                }
            }
        });

        // Handle tab clicks
        document.addEventListener('click', (e) => {
            const tab = e.target.closest('.tab');
            if (tab) {
                const tabIndex = parseInt(tab.dataset.tab);
                window.UI.switchTab(tabIndex);
            }
        });
    },

    /**
     * Toggle mobile sidebar
     */
    toggleMobileSidebar() {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.classList.toggle('open');
        }
    },

    /**
     * Close mobile sidebar
     */
    closeMobileSidebar() {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.classList.remove('open');
        }
    },

    /**
     * Render app layout
     */
    render() {
        const user = State.get('user');
        if (!user) return;

        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <div class="app-layout">
                ${this.renderSidebar()}
                <div class="main-content">
                    ${this.renderTopbar()}
                    <div class="content" id="content-area"></div>
                </div>
            </div>
        `;
    },

    /**
     * Render sidebar
     */
    renderSidebar() {
        const user = State.get('user');
        const currentPlan = State.get('currentPlan');

        return `
            <aside class="sidebar">
                <div class="sidebar-header">
                    <a href="#" class="sidebar-logo">LMS</a>
                </div>

                <nav class="sidebar-nav">
                    <div class="sidebar-section">
                        <h6 class="sidebar-section-title">Main</h6>
                        <ul class="sidebar-menu">
                            <li class="sidebar-item">
                                <a href="#" class="sidebar-link active" data-route="dashboard">
                                    <span class="sidebar-icon">📊</span>
                                    <span>Dashboard</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div class="sidebar-section">
                        <h6 class="sidebar-section-title">Content</h6>
                        <ul class="sidebar-menu">
                            <li class="sidebar-item">
                                <a href="#" class="sidebar-link" data-route="courses">
                                    <span class="sidebar-icon">📚</span>
                                    <span>Courses</span>
                                </a>
                            </li>
                            <li class="sidebar-item">
                                <a href="#" class="sidebar-link" data-route="learners">
                                    <span class="sidebar-icon">👥</span>
                                    <span>Learners</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div class="sidebar-section">
                        <h6 class="sidebar-section-title">Assessments</h6>
                        <ul class="sidebar-menu">
                            <li class="sidebar-item">
                                <a href="#" class="sidebar-link" data-route="quizzes">
                                    <span class="sidebar-icon">📝</span>
                                    <span>Quizzes</span>
                                </a>
                            </li>
                            <li class="sidebar-item">
                                <a href="#" class="sidebar-link" data-route="assignments">
                                    <span class="sidebar-icon">📄</span>
                                    <span>Assignments</span>
                                </a>
                            </li>
                            <li class="sidebar-item">
                                <a href="#" class="sidebar-link" data-route="certificates">
                                    <span class="sidebar-icon">🏆</span>
                                    <span>Certificates</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div class="sidebar-section">
                        <h6 class="sidebar-section-title">Management</h6>
                        <ul class="sidebar-menu">
                            <li class="sidebar-item">
                                <a href="#" class="sidebar-link" data-route="sessions">
                                    <span class="sidebar-icon">🎥</span>
                                    <span>Live Sessions</span>
                                </a>
                            </li>
                            <li class="sidebar-item">
                                <a href="#" class="sidebar-link" data-route="payments">
                                    <span class="sidebar-icon">💳</span>
                                    <span>Payments</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>

                <div class="sidebar-footer">
                    <div class="sidebar-user" onclick="Navigation.showUserMenu()">
                        <div class="sidebar-avatar">${this.getInitials(user.name)}</div>
                        <div class="sidebar-user-info">
                            <div class="sidebar-user-name">${user.name}</div>
                            <div class="sidebar-user-email">${window.UI.createBadge(currentPlan.toUpperCase(), 'primary')}</div>
                        </div>
                    </div>
                </div>
            </aside>
        `;
    },

    /**
     * Render topbar
     */
    renderTopbar() {
        return `
            <header class="topbar">
                <div class="topbar-left">
                    <button class="mobile-menu-toggle btn btn-icon btn-ghost">☰</button>
                    <h1 class="topbar-title" id="page-title">Dashboard</h1>
                </div>
                <div class="topbar-right">
                    <button class="btn btn-ghost btn-icon" onclick="Navigation.navigate('payments')">⚙️</button>
                </div>
            </header>
        `;
    },

    /**
     * Update page title
     */
    updatePageTitle(title) {
        const titleElement = document.getElementById('page-title');
        if (titleElement) {
            titleElement.textContent = title;
        }
    },

    /**
     * Show user menu
     */
    showUserMenu() {
        const dropdown = window.UI.createDropdown([
            {
                icon: '👤',
                label: 'Profile',
                onClick: 'Navigation.navigate("profile")'
            },
            {
                icon: '⚙️',
                label: 'Settings',
                onClick: 'Navigation.navigate("settings")'
            },
            {
                icon: '💳',
                label: 'Billing & Plans',
                onClick: 'Navigation.navigate("payments")'
            },
            'divider',
            {
                icon: '🚪',
                label: 'Logout',
                destructive: true,
                onClick: 'Navigation.logout()'
            }
        ]);

        // Show dropdown (simplified - in production would position properly)
        window.UI.showModal('Account Menu', dropdown);
    },

    /**
     * Logout
     */
    logout() {
        window.UI.showConfirm(
            'Logout',
            'Are you sure you want to logout?',
            () => {
                State.logout();
                window.location.reload();
            }
        );
    },

    /**
     * Get initials from name
     */
    getInitials(name) {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    },

    /**
     * Render content in main area
     */
    renderContent(html) {
        const contentArea = document.getElementById('content-area');
        if (contentArea) {
            contentArea.innerHTML = html;
        }
    }
};

// Export for global access
if (typeof window !== 'undefined') {
    window.Navigation = Navigation;
}
