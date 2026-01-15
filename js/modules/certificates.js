/**
 * Certificates Module
 * Configure certificate templates and issue certificates
 */

import { State } from '../utils/state.js';
import { UI } from '../components/ui.js';
import { Navigation } from '../components/navigation.js';

export const Certificates = {
    render() {
        Navigation.updatePageTitle('Certificates');

        const courses = State.get('courses');

        const content = `
            <div>
                <div class="mb-6">
                    <h2>Certificate Templates</h2>
                    <p class="text-neutral-600">Configure certificate templates for your courses</p>
                </div>

                ${courses.length === 0 ?
                    UI.createCard('', UI.createEmptyState('🏆', 'No courses yet', 'Create a course first to configure certificates', '')) :
                    this.renderCourseTemplates(courses)
                }
            </div>
        `;

        Navigation.renderContent(content);
    },

    renderCourseTemplates(courses) {
        return `
            <div class="grid grid-cols-2">
                ${courses.map(course => {
                    const template = course.certificateTemplate || {};

                    return `
                        <div class="card">
                            <div class="card-body">
                                <h4>${course.title}</h4>
                                ${this.renderCertificatePreview(course, template)}
                            </div>
                            <div class="card-footer">
                                <button class="btn btn-primary btn-sm" onclick="Certificates.configureTemplate('${course.id}')">
                                    ${Object.keys(template).length > 0 ? 'Edit Template' : 'Configure Template'}
                                </button>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    },

    renderCertificatePreview(course, template) {
        const color = template.primaryColor || '#5576ff';
        const title = template.title || 'Certificate of Completion';

        return `
            <div style="margin-top: 1.5rem; padding: 2rem; border: 2px solid ${color}; border-radius: var(--radius-lg); text-align: center; background: linear-gradient(135deg, #fff 0%, ${color}11 100%);">
                <div style="font-size: 1.5rem; font-weight: bold; color: ${color}; margin-bottom: 1rem;">
                    ${title}
                </div>
                <div style="margin-bottom: 1rem;">This certifies that</div>
                <div style="font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem;">[Student Name]</div>
                <div>has successfully completed</div>
                <div style="font-weight: 600; margin-top: 0.5rem;">${course.title}</div>
                ${template.signature ?
                    `<div style="margin-top: 2rem; font-style: italic;">${template.signature}</div>` :
                    ''
                }
            </div>
        `;
    },

    configureTemplate(courseId) {
        const course = State.getCourse(courseId);
        const template = course.certificateTemplate || {};

        const content = `
            <form id="certificate-form">
                ${UI.createFormGroup('Certificate Title', UI.createInput('title', 'Certificate of Completion', template.title || 'Certificate of Completion'))}
                ${UI.createFormGroup('Primary Color', UI.createInput('primaryColor', '#5576ff', template.primaryColor || '#5576ff', 'color'))}
                ${UI.createFormGroup('Signature Text', UI.createInput('signature', 'Instructor name', template.signature || ''))}
                ${UI.createFormGroup('Completion Requirement', UI.createSelect('completionRule', [
                    { value: 'progress', label: 'Minimum Progress %' },
                    { value: 'quiz', label: 'Pass Final Quiz' }
                ], template.completionRule || 'progress'))}
                ${UI.createFormGroup('Minimum Progress (%)', UI.createInput('minProgress', '100', template.minProgress || '100', 'number'))}
            </form>
        `;

        const footer = `
            <button class="btn btn-secondary" onclick="UI.closeModal(this.closest('.modal-backdrop'))">Cancel</button>
            <button class="btn btn-primary" onclick="Certificates.saveTemplate('${courseId}')">Save Template</button>
        `;

        UI.showModal('Configure Certificate Template', content, footer, 'lg');
    },

    saveTemplate(courseId) {
        const form = document.getElementById('certificate-form');
        const data = UI.getFormData(form);

        State.updateCourse(courseId, {
            certificateTemplate: data
        });

        UI.closeModal(document.querySelector('.modal-backdrop'));
        UI.showToast('Certificate template saved', 'success');
        this.render();
    }
};

if (typeof window !== 'undefined') window.Certificates = Certificates;
