/**
 * Dashboard Module
 * Main dashboard with stats and overview
 */

import { State } from '../utils/state.js';
import { UI } from '../components/ui.js';
import { Navigation } from '../components/navigation.js';

export const Dashboard = {
    /**
     * Render dashboard
     */
    render() {
        Navigation.updatePageTitle('Dashboard');

        const courses = State.get('courses');
        const learners = State.get('learners');
        const payments = State.get('payments');

        // Calculate stats
        const totalCourses = courses.length;
        const totalLearners = learners.length;
        const activeLearners = learners.filter(l => l.status === 'active').length;
        const totalRevenue = payments.reduce((sum, p) => sum + (p.amount || 0), 0);

        // Check if this is a new user
        const isNewUser = totalCourses === 0;

        const content = `
            <div>
                <div style="margin-bottom: 2rem;">
                    <h2>Overview</h2>
                    <p class="text-neutral-600">Welcome back! Here's what's happening with your courses.</p>
                </div>

                ${this.renderStats(totalCourses, totalLearners, activeLearners, totalRevenue)}

                ${isNewUser ? this.renderEmptyState() : this.renderRecentActivity()}
            </div>
        `;

        Navigation.renderContent(content);
    },

    /**
     * Render stats cards
     */
    renderStats(totalCourses, totalLearners, activeLearners, totalRevenue) {
        return `
            <div class="grid grid-cols-4 mb-8">
                ${UI.createStatCard('Total Courses', totalCourses, totalCourses > 0 ? 12 : null)}
                ${UI.createStatCard('Total Learners', totalLearners, totalLearners > 0 ? 8 : null)}
                ${UI.createStatCard('Active Learners', activeLearners, activeLearners > 0 ? 15 : null)}
                ${UI.createStatCard('Revenue', UI.formatCurrency(totalRevenue), totalRevenue > 0 ? 20 : null)}
            </div>
        `;
    },

    /**
     * Render empty state for new users
     */
    renderEmptyState() {
        const planLimits = State.getPlanLimits();
        const canAddCourse = State.canAddCourse();

        return `
            <div class="card">
                <div class="card-body">
                    ${UI.createEmptyState(
                        '🚀',
                        'Welcome to your LMS Platform!',
                        'Get started by creating your first course. You can add lessons, quizzes, assignments, and more.',
                        `<button class="btn btn-primary btn-lg" onclick="Dashboard.createFirstCourse()" ${!canAddCourse ? 'disabled' : ''}>
                            ${canAddCourse ? 'Create Your First Course' : 'Upgrade to Add Courses'}
                        </button>`
                    )}

                    ${!canAddCourse ? `
                        <div style="margin-top: 2rem;">
                            ${UI.createAlert(
                                'You have reached the course limit for your current plan. Upgrade to Pro to create more courses.',
                                'warning'
                            )}
                        </div>
                    ` : ''}
                </div>
            </div>

            <div class="grid grid-cols-3 mt-6">
                ${UI.createCard(
                    '📚 Courses',
                    '<p>Create and organize your course content with modules and lessons. Add videos, PDFs, and text content.</p>',
                    '<button class="btn btn-secondary btn-sm" onclick="Navigation.navigate(\'courses\')">Explore Courses</button>'
                )}

                ${UI.createCard(
                    '👥 Learners',
                    '<p>Manage your students, track their progress, and monitor engagement across all your courses.</p>',
                    '<button class="btn btn-secondary btn-sm" onclick="Navigation.navigate(\'learners\')">View Learners</button>'
                )}

                ${UI.createCard(
                    '📝 Assessments',
                    '<p>Create quizzes and assignments to test knowledge and provide feedback to your students.</p>',
                    '<button class="btn btn-secondary btn-sm" onclick="Navigation.navigate(\'quizzes\')">Create Quiz</button>'
                )}
            </div>

            <div class="mt-6">
                ${this.renderQuickTips()}
            </div>
        `;
    },

    /**
     * Render recent activity for existing users
     */
    renderRecentActivity() {
        const courses = State.get('courses');
        const learners = State.get('learners');

        return `
            <div class="grid grid-cols-2 gap-6">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Recent Courses</h3>
                    </div>
                    <div class="card-body">
                        ${courses.length > 0 ? this.renderCoursesList(courses.slice(0, 5)) : '<p class="text-neutral-600">No courses yet</p>'}
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-secondary btn-sm" onclick="Navigation.navigate('courses')">View All Courses</button>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Recent Learners</h3>
                    </div>
                    <div class="card-body">
                        ${learners.length > 0 ? this.renderLearnersList(learners.slice(0, 5)) : '<p class="text-neutral-600">No learners yet</p>'}
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-secondary btn-sm" onclick="Navigation.navigate('learners')">View All Learners</button>
                    </div>
                </div>
            </div>

            <div class="mt-6">
                ${this.renderQuickActions()}
            </div>
        `;
    },

    /**
     * Render courses list
     */
    renderCoursesList(courses) {
        return `
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                ${courses.map(course => `
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0; border-bottom: 1px solid var(--color-neutral-200);">
                        <div>
                            <div style="font-weight: 600; color: var(--color-neutral-900);">${course.title}</div>
                            <div style="font-size: 0.875rem; color: var(--color-neutral-600);">
                                ${UI.createBadge(course.status || 'draft', course.status === 'published' ? 'success' : 'neutral')}
                                ${course.price ? UI.formatCurrency(course.price) : 'Free'}
                            </div>
                        </div>
                        <button class="btn btn-ghost btn-sm" onclick="window.Courses.editCourse('${course.id}')">Edit</button>
                    </div>
                `).join('')}
            </div>
        `;
    },

    /**
     * Render learners list
     */
    renderLearnersList(learners) {
        return `
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                ${learners.map(learner => `
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0; border-bottom: 1px solid var(--color-neutral-200);">
                        <div>
                            <div style="font-weight: 600; color: var(--color-neutral-900);">${learner.name}</div>
                            <div style="font-size: 0.875rem; color: var(--color-neutral-600);">${learner.email}</div>
                        </div>
                        <div style="text-align: right;">
                            ${UI.createProgressBar('', learner.progress || 0)}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    },

    /**
     * Render quick tips
     */
    renderQuickTips() {
        return UI.createCard(
            '💡 Quick Tips',
            `
                <ul style="list-style: none; padding: 0;">
                    <li style="padding: 0.5rem 0; display: flex; gap: 0.5rem;">
                        <span>✓</span>
                        <span>Start by creating a course and adding modules and lessons</span>
                    </li>
                    <li style="padding: 0.5rem 0; display: flex; gap: 0.5rem;">
                        <span>✓</span>
                        <span>Add quizzes and assignments to test your learners' knowledge</span>
                    </li>
                    <li style="padding: 0.5rem 0; display: flex; gap: 0.5rem;">
                        <span>✓</span>
                        <span>Configure certificate templates for course completion</span>
                    </li>
                    <li style="padding: 0.5rem 0; display: flex; gap: 0.5rem;">
                        <span>✓</span>
                        <span>Schedule live sessions and track attendance</span>
                    </li>
                </ul>
            `
        );
    },

    /**
     * Render quick actions
     */
    renderQuickActions() {
        return `
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Quick Actions</h3>
                </div>
                <div class="card-body">
                    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                        <button class="btn btn-primary" onclick="window.Courses.showCreateCourseModal()">
                            Create Course
                        </button>
                        <button class="btn btn-secondary" onclick="window.Learners.showAddLearnerModal()">
                            Add Learner
                        </button>
                        <button class="btn btn-secondary" onclick="window.Quizzes.showCreateQuizModal()">
                            Create Quiz
                        </button>
                        <button class="btn btn-secondary" onclick="window.Sessions.showScheduleSessionModal()">
                            Schedule Session
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Create first course (shortcut)
     */
    createFirstCourse() {
        if (!State.canAddCourse()) {
            UI.showToast('Upgrade your plan to create more courses', 'warning');
            Navigation.navigate('payments');
            return;
        }

        Navigation.navigate('courses');
        // Trigger create course modal after navigation
        setTimeout(() => {
            if (window.Courses && window.Courses.showCreateCourseModal) {
                window.Courses.showCreateCourseModal();
            }
        }, 100);
    }
};

// Export for global access
if (typeof window !== 'undefined') {
    window.Dashboard = Dashboard;
}
