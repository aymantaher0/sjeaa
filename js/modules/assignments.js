/**
 * Assignments Module
 * Manage assignments and submissions
 */

import { State } from '../utils/state.js';
import { UI } from '../components/ui.js';
import { Navigation } from '../components/navigation.js';

export const Assignments = {
    render() {
        Navigation.updatePageTitle('Assignments');

        const assignments = State.get('assignments');

        const content = `
            <div>
                <div class="toolbar">
                    <div class="toolbar-left"><h3>Assignments</h3></div>
                    <div class="toolbar-right">
                        <button class="btn btn-primary" onclick="Assignments.showCreateModal()">+ Create Assignment</button>
                    </div>
                </div>

                ${assignments.length === 0 ? this.renderEmptyState() : this.renderList(assignments)}
            </div>
        `;

        Navigation.renderContent(content);
    },

    renderEmptyState() {
        return UI.createCard('', UI.createEmptyState(
            '📄',
            'No assignments yet',
            'Create assignments for learners to submit their work',
            '<button class="btn btn-primary btn-lg" onclick="Assignments.showCreateModal()">Create First Assignment</button>'
        ));
    },

    renderList(assignments) {
        const courses = State.get('courses');

        return `
            <div class="grid grid-cols-2">
                ${assignments.map(assignment => {
                    const course = courses.find(c => c.id === assignment.courseId);
                    const submissions = assignment.submissions || [];

                    return `
                        <div class="card">
                            <div class="card-body">
                                <h4>${assignment.title}</h4>
                                <p class="text-sm text-neutral-600 mt-2">${course ? course.title : 'No course'}</p>
                                <p class="text-sm text-neutral-600 mt-2">Due: ${UI.formatDate(assignment.dueDate)}</p>
                                <div class="mt-4">${submissions.length} submissions</div>
                            </div>
                            <div class="card-footer">
                                <button class="btn btn-secondary btn-sm" onclick="Assignments.viewSubmissions('${assignment.id}')">View Submissions</button>
                                <button class="btn btn-ghost btn-sm" onclick="Assignments.deleteAssignment('${assignment.id}')">Delete</button>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    },

    showCreateModal() {
        const courses = State.get('courses');

        const content = `
            <form id="create-assignment-form">
                ${UI.createFormGroup('Title', UI.createInput('title', 'Assignment title'), '', '', true)}
                ${UI.createFormGroup('Instructions', UI.createTextarea('instructions', 'What should learners do?'), '', '', true)}
                ${UI.createFormGroup('Course', UI.createSelect('courseId', [
                    { value: '', label: '-- Select Course --' },
                    ...courses.map(c => ({ value: c.id, label: c.title }))
                ]), '', '', true)}
                ${UI.createFormGroup('Due Date', UI.createInput('dueDate', '', '', 'date'), '', '', true)}
            </form>
        `;

        const footer = `
            <button class="btn btn-secondary" onclick="UI.closeModal(this.closest('.modal-backdrop'))">Cancel</button>
            <button class="btn btn-primary" onclick="Assignments.handleCreate()">Create</button>
        `;

        UI.showModal('Create Assignment', content, footer);
    },

    handleCreate() {
        const form = document.getElementById('create-assignment-form');
        const validation = UI.validateForm(form, {
            title: { required: true, label: 'Title' },
            instructions: { required: true, label: 'Instructions' },
            courseId: { required: true, label: 'Course' },
            dueDate: { required: true, label: 'Due Date' }
        });

        if (!validation.valid) return;

        State.addAssignment({
            ...validation.data,
            submissions: []
        });

        UI.closeModal(document.querySelector('.modal-backdrop'));
        UI.showToast('Assignment created', 'success');
        this.render();
    },

    viewSubmissions(id) {
        const assignment = State.getAssignment(id);
        if (!assignment) return;

        const submissions = assignment.submissions || [];

        const content = `
            <div>
                <h4>${assignment.title}</h4>
                ${submissions.length === 0 ?
                    '<p class="text-neutral-600 mt-4">No submissions yet</p>' :
                    '<div class="mt-4">' + submissions.map(sub => `
                        <div class="card mb-3">
                            <div class="card-body">
                                <strong>${sub.learnerName}</strong>
                                <p class="mt-2"><a href="${sub.url}" target="_blank">${sub.url}</a></p>
                                <p class="text-sm text-neutral-600 mt-2">${sub.notes || 'No notes'}</p>
                                ${sub.grade !== undefined ?
                                    `<div class="mt-2">${UI.createBadge('Grade: ' + sub.grade + '/100', 'success')}</div>` :
                                    '<div class="mt-2">' + UI.createBadge('Not graded', 'neutral') + '</div>'
                                }
                            </div>
                        </div>
                    `).join('') + '</div>'
                }
            </div>
        `;

        UI.showModal('Submissions', content, '', 'lg');
    },

    deleteAssignment(id) {
        UI.showConfirm('Delete Assignment', 'Are you sure?', () => {
            State.deleteAssignment(id);
            UI.showToast('Assignment deleted', 'success');
            this.render();
        });
    }
};

if (typeof window !== 'undefined') window.Assignments = Assignments;
