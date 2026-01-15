/**
 * Learners Module
 * Manage learners and enrollment
 */

import { State } from '../utils/state.js';
import { UI } from '../components/ui.js';
import { Navigation } from '../components/navigation.js';

export const Learners = {
    render() {
        Navigation.updatePageTitle('Learners');

        const learners = State.get('learners');
        const courses = State.get('courses');

        const content = `
            <div>
                <div class="toolbar">
                    <div class="toolbar-left">
                        <div class="search-box">
                            <span class="search-icon">🔍</span>
                            <input type="text" class="search-input" placeholder="Search learners...">
                        </div>
                    </div>
                    <div class="toolbar-right">
                        <button class="btn btn-primary" onclick="Learners.showAddLearnerModal()">
                            + Add Learner
                        </button>
                    </div>
                </div>

                ${learners.length === 0 ? this.renderEmptyState() : this.renderLearnersTable(learners, courses)}
            </div>
        `;

        Navigation.renderContent(content);
    },

    renderEmptyState() {
        return UI.createCard(
            '',
            UI.createEmptyState(
                '👥',
                'No learners yet',
                'Add learners manually or they will be enrolled when they purchase your courses',
                '<button class="btn btn-primary btn-lg" onclick="Learners.showAddLearnerModal()">Add First Learner</button>'
            )
        );
    },

    renderLearnersTable(learners, courses) {
        const rows = learners.map(learner => {
            const enrolledCourses = learner.courses || [];
            return [
                `<div style="font-weight: 600;">${learner.name}</div><div class="text-sm text-neutral-600">${learner.email}</div>`,
                enrolledCourses.length,
                UI.createProgressBar('', learner.progress || 0),
                UI.createBadge(learner.status || 'active', learner.status === 'active' ? 'success' : 'neutral'),
                `<div class="table-actions">
                    <button class="btn btn-ghost btn-sm" onclick="Learners.viewLearner('${learner.id}')">View</button>
                    <button class="btn btn-ghost btn-sm" onclick="Learners.deleteLearner('${learner.id}')">Delete</button>
                </div>`
            ];
        });

        return UI.createTable(
            ['Learner', 'Courses', 'Progress', 'Status', 'Actions'],
            rows
        );
    },

    showAddLearnerModal() {
        const courses = State.get('courses');

        const content = `
            <form id="add-learner-form">
                ${UI.createFormGroup('Name', UI.createInput('name', 'Full name'), '', '', true)}
                ${UI.createFormGroup('Email', UI.createInput('email', 'email@example.com', '', 'email'), '', '', true)}
                ${UI.createFormGroup('Enroll in Course', UI.createSelect('courseId', [
                    { value: '', label: '-- Select Course --' },
                    ...courses.map(c => ({ value: c.id, label: c.title }))
                ]))}
            </form>
        `;

        const footer = `
            <button class="btn btn-secondary" onclick="UI.closeModal(this.closest('.modal-backdrop'))">Cancel</button>
            <button class="btn btn-primary" onclick="Learners.handleAddLearner()">Add Learner</button>
        `;

        UI.showModal('Add Learner', content, footer);
    },

    handleAddLearner() {
        const form = document.getElementById('add-learner-form');
        const validation = UI.validateForm(form, {
            name: { required: true, label: 'Name' },
            email: { required: true, email: true, label: 'Email' }
        });

        if (!validation.valid) return;

        const learnerData = {
            ...validation.data,
            status: 'active',
            progress: 0,
            courses: validation.data.courseId ? [validation.data.courseId] : [],
            enrolledAt: new Date().toISOString()
        };

        State.addLearner(learnerData);
        UI.closeModal(document.querySelector('.modal-backdrop'));
        UI.showToast('Learner added successfully', 'success');
        this.render();
    },

    viewLearner(id) {
        const learner = State.getLearner(id);
        if (!learner) return;

        const content = `
            <div>
                <h4>${learner.name}</h4>
                <p class="text-neutral-600">${learner.email}</p>
                <div class="mt-4">
                    <strong>Status:</strong> ${UI.createBadge(learner.status || 'active', 'success')}
                </div>
                <div class="mt-2">
                    <strong>Progress:</strong> ${learner.progress || 0}%
                </div>
                <div class="mt-2">
                    <strong>Enrolled:</strong> ${UI.formatDate(learner.enrolledAt)}
                </div>
            </div>
        `;

        UI.showModal('Learner Details', content);
    },

    deleteLearner(id) {
        UI.showConfirm(
            'Delete Learner',
            'This will remove the learner from all courses. Are you sure?',
            () => {
                State.deleteLearner(id);
                UI.showToast('Learner deleted', 'success');
                this.render();
            }
        );
    }
};

if (typeof window !== 'undefined') window.Learners = Learners;
