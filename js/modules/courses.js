/**
 * Courses Module
 * Handles course CRUD operations and course editor
 */

import { State } from '../utils/state.js';
import { UI } from '../components/ui.js';
import { Navigation } from '../components/navigation.js';

export const Courses = {
    currentCourse: null,
    currentFilter: 'all',

    /**
     * Render courses list
     */
    render() {
        Navigation.updatePageTitle('Courses');

        const courses = State.get('courses');
        const filteredCourses = this.filterCourses(courses);

        const content = `
            <div>
                ${this.renderToolbar()}
                ${courses.length === 0 ? this.renderEmptyState() : this.renderCoursesList(filteredCourses)}
            </div>
        `;

        Navigation.renderContent(content);
    },

    /**
     * Render toolbar
     */
    renderToolbar() {
        const canAddCourse = State.canAddCourse();

        return `
            <div class="toolbar">
                <div class="toolbar-left">
                    <div class="filter-group">
                        <button class="filter-btn ${this.currentFilter === 'all' ? 'active' : ''}"
                                onclick="Courses.setFilter('all')">
                            All
                        </button>
                        <button class="filter-btn ${this.currentFilter === 'draft' ? 'active' : ''}"
                                onclick="Courses.setFilter('draft')">
                            Draft
                        </button>
                        <button class="filter-btn ${this.currentFilter === 'published' ? 'active' : ''}"
                                onclick="Courses.setFilter('published')">
                            Published
                        </button>
                    </div>

                    <div class="search-box">
                        <span class="search-icon">🔍</span>
                        <input type="text" class="search-input" placeholder="Search courses..."
                               oninput="Courses.handleSearch(this.value)">
                    </div>
                </div>

                <div class="toolbar-right">
                    <button class="btn btn-primary" onclick="Courses.showCreateCourseModal()"
                            ${!canAddCourse ? 'disabled' : ''}>
                        ${canAddCourse ? '+ Create Course' : '🔒 Upgrade to Add'}
                    </button>
                </div>
            </div>
        `;
    },

    /**
     * Render empty state
     */
    renderEmptyState() {
        const canAddCourse = State.canAddCourse();

        return `
            <div class="card">
                <div class="card-body">
                    ${UI.createEmptyState(
                        '📚',
                        'No courses yet',
                        'Create your first course to start teaching online. Add modules, lessons, and assessments.',
                        `<button class="btn btn-primary btn-lg" onclick="Courses.showCreateCourseModal()"
                                ${!canAddCourse ? 'disabled' : ''}>
                            ${canAddCourse ? 'Create Your First Course' : 'Upgrade to Create Courses'}
                        </button>`
                    )}
                </div>
            </div>
        `;
    },

    /**
     * Render courses list
     */
    renderCoursesList(courses) {
        if (courses.length === 0) {
            return `<div class="card"><div class="card-body"><p class="text-neutral-600">No courses found matching your filters.</p></div></div>`;
        }

        return `
            <div class="grid grid-cols-3">
                ${courses.map(course => this.renderCourseCard(course)).join('')}
            </div>
        `;
    },

    /**
     * Render course card
     */
    renderCourseCard(course) {
        const modules = course.modules || [];
        const lessons = modules.reduce((sum, m) => sum + (m.lessons || []).length, 0);

        return `
            <div class="card" style="cursor: pointer;" onclick="Courses.editCourse('${course.id}')">
                <div style="height: 180px; background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-700)); border-radius: var(--radius-lg) var(--radius-lg) 0 0;">
                </div>
                <div class="card-body">
                    <div style="display: flex; justify-content: between; align-items: start; margin-bottom: 1rem;">
                        <h4 style="flex: 1; margin: 0;">${course.title}</h4>
                        ${UI.createBadge(course.status || 'draft', course.status === 'published' ? 'success' : 'neutral')}
                    </div>

                    <p class="text-sm text-neutral-600" style="margin-bottom: 1rem;">
                        ${course.description || 'No description'}
                    </p>

                    <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.875rem; color: var(--color-neutral-600);">
                        <span>${modules.length} modules • ${lessons} lessons</span>
                        <span style="font-weight: 600; color: var(--color-primary-600);">
                            ${course.price ? UI.formatCurrency(course.price) : 'Free'}
                        </span>
                    </div>
                </div>
                <div class="card-footer">
                    <div style="display: flex; gap: 0.5rem;">
                        <button class="btn btn-secondary btn-sm" onclick="event.stopPropagation(); Courses.editCourse('${course.id}')">
                            Edit
                        </button>
                        <button class="btn btn-ghost btn-sm" onclick="event.stopPropagation(); Courses.duplicateCourse('${course.id}')">
                            Duplicate
                        </button>
                        <button class="btn btn-ghost btn-sm" onclick="event.stopPropagation(); Courses.deleteCourse('${course.id}')">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Show create course modal
     */
    showCreateCourseModal() {
        if (!State.canAddCourse()) {
            UI.showToast('You have reached your course limit. Upgrade to create more courses.', 'warning');
            return;
        }

        const content = `
            <form id="create-course-form">
                ${UI.createFormGroup(
                    'Course Title',
                    UI.createInput('title', 'e.g., Introduction to Web Development'),
                    '',
                    '',
                    true
                )}

                ${UI.createFormGroup(
                    'Short Description',
                    UI.createTextarea('description', 'Brief description of your course', '', 3),
                    '',
                    '',
                    true
                )}

                ${UI.createFormGroup(
                    'Language',
                    UI.createSelect('language', ['English', 'Spanish', 'French', 'German', 'Chinese'], 'English')
                )}

                ${UI.createFormGroup(
                    'Difficulty Level',
                    UI.createSelect('difficulty', ['Beginner', 'Intermediate', 'Advanced'], 'Beginner')
                )}

                ${UI.createFormGroup(
                    'Pricing Model',
                    UI.createSelect('pricingModel', [
                        { value: 'free', label: 'Free' },
                        { value: 'one-time', label: 'One-time Payment' },
                        { value: 'monthly', label: 'Monthly Subscription' }
                    ], 'free')
                )}

                ${UI.createFormGroup(
                    'Price',
                    UI.createInput('price', '0.00', '0', 'number'),
                    'Leave as 0 for free courses'
                )}
            </form>
        `;

        const footer = `
            <button class="btn btn-secondary" onclick="UI.closeModal(this.closest('.modal-backdrop'))">Cancel</button>
            <button class="btn btn-primary" onclick="Courses.handleCreateCourse()">Create Course</button>
        `;

        UI.showModal('Create New Course', content, footer, 'lg');
    },

    /**
     * Handle create course
     */
    handleCreateCourse() {
        const form = document.getElementById('create-course-form');
        const validation = UI.validateForm(form, {
            title: { required: true, minLength: 3, label: 'Course Title' },
            description: { required: true, minLength: 10, label: 'Description' }
        });

        if (!validation.valid) {
            return;
        }

        const course = State.addCourse({
            ...validation.data,
            status: 'draft',
            modules: [],
            enrolledCount: 0
        });

        UI.closeModal(document.querySelector('.modal-backdrop'));
        UI.showToast('Course created successfully!', 'success');

        // Navigate to course editor
        this.editCourse(course.id);
    },

    /**
     * Edit course
     */
    editCourse(courseId) {
        const course = State.getCourse(courseId);
        if (!course) {
            UI.showToast('Course not found', 'error');
            return;
        }

        this.currentCourse = course;
        this.renderCourseEditor(course);
    },

    /**
     * Render course editor
     */
    renderCourseEditor(course) {
        Navigation.updatePageTitle(`Edit: ${course.title}`);

        const tabs = [
            { label: 'Overview', content: this.renderOverviewTab(course) },
            { label: 'Content', content: this.renderContentTab(course) },
            { label: 'Settings', content: this.renderSettingsTab(course) }
        ];

        const content = `
            <div class="editor-layout">
                <div class="editor-header">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <button class="btn btn-ghost btn-sm" onclick="Courses.render()">
                                ← Back to Courses
                            </button>
                            <h2 style="margin-top: 1rem;">${course.title}</h2>
                        </div>
                        <div style="display: flex; gap: 0.5rem;">
                            ${course.status === 'draft' ?
                                '<button class="btn btn-success" onclick="Courses.publishCourse(\'' + course.id + '\')">Publish Course</button>' :
                                '<button class="btn btn-secondary" onclick="Courses.unpublishCourse(\'' + course.id + '\')">Unpublish</button>'
                            }
                        </div>
                    </div>
                </div>

                <div class="editor-content">
                    ${UI.createTabs(tabs, 0)}
                </div>
            </div>
        `;

        Navigation.renderContent(content);
    },

    /**
     * Render overview tab
     */
    renderOverviewTab(course) {
        return `
            <form id="course-overview-form">
                ${UI.createFormGroup(
                    'Course Title',
                    UI.createInput('title', '', course.title),
                    '',
                    '',
                    true
                )}

                ${UI.createFormGroup(
                    'Description',
                    UI.createTextarea('description', '', course.description, 6),
                    '',
                    '',
                    true
                )}

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    ${UI.createFormGroup(
                        'Language',
                        UI.createSelect('language', ['English', 'Spanish', 'French', 'German', 'Chinese'], course.language)
                    )}

                    ${UI.createFormGroup(
                        'Difficulty',
                        UI.createSelect('difficulty', ['Beginner', 'Intermediate', 'Advanced'], course.difficulty)
                    )}
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    ${UI.createFormGroup(
                        'Pricing Model',
                        UI.createSelect('pricingModel', [
                            { value: 'free', label: 'Free' },
                            { value: 'one-time', label: 'One-time Payment' },
                            { value: 'monthly', label: 'Monthly Subscription' }
                        ], course.pricingModel)
                    )}

                    ${UI.createFormGroup(
                        'Price',
                        UI.createInput('price', '', course.price || '0', 'number')
                    )}
                </div>

                <button type="button" class="btn btn-primary" onclick="Courses.saveOverview('${course.id}')">
                    Save Changes
                </button>
            </form>
        `;
    },

    /**
     * Render content tab
     */
    renderContentTab(course) {
        const modules = course.modules || [];

        return `
            <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                    <div>
                        <h3>Course Content</h3>
                        <p class="text-neutral-600">Add modules and lessons to structure your course</p>
                    </div>
                    <button class="btn btn-primary" onclick="Courses.showAddModuleModal('${course.id}')">
                        + Add Module
                    </button>
                </div>

                ${modules.length === 0 ?
                    UI.createEmptyState(
                        '📖',
                        'No content yet',
                        'Start by adding a module to organize your lessons',
                        '<button class="btn btn-primary" onclick="Courses.showAddModuleModal(\'' + course.id + '\')">Add First Module</button>'
                    ) :
                    modules.map((module, index) => this.renderModuleItem(course.id, module, index)).join('')
                }
            </div>
        `;
    },

    /**
     * Render module item
     */
    renderModuleItem(courseId, module, index) {
        const lessons = module.lessons || [];

        return `
            <div class="card mb-4">
                <div class="card-header" style="cursor: pointer;" onclick="this.nextElementSibling.classList.toggle('hidden')">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <h4 style="margin: 0;">Module ${index + 1}: ${module.title}</h4>
                            <p class="text-sm text-neutral-600" style="margin: 0.5rem 0 0 0;">
                                ${lessons.length} lessons
                            </p>
                        </div>
                        <div style="display: flex; gap: 0.5rem;">
                            <button class="btn btn-ghost btn-sm" onclick="event.stopPropagation(); Courses.editModule('${courseId}', ${index})">
                                Edit
                            </button>
                            <button class="btn btn-ghost btn-sm" onclick="event.stopPropagation(); Courses.deleteModule('${courseId}', ${index})">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    ${lessons.length === 0 ?
                        '<p class="text-neutral-600">No lessons yet. <a href="#" onclick="Courses.showAddLessonModal(\'' + courseId + '\', ' + index + '); return false;">Add a lesson</a></p>' :
                        '<div style="display: flex; flex-direction: column; gap: 0.5rem;">' +
                        lessons.map((lesson, lessonIndex) => this.renderLessonItem(courseId, index, lesson, lessonIndex)).join('') +
                        '</div>'
                    }
                    <button class="btn btn-secondary btn-sm mt-4" onclick="Courses.showAddLessonModal('${courseId}', ${index})">
                        + Add Lesson
                    </button>
                </div>
            </div>
        `;
    },

    /**
     * Render lesson item
     */
    renderLessonItem(courseId, moduleIndex, lesson, lessonIndex) {
        const icons = {
            video: '🎥',
            pdf: '📄',
            text: '📝'
        };

        return `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: var(--color-neutral-50); border-radius: var(--radius-md);">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <span style="font-size: 1.5rem;">${icons[lesson.type] || '📝'}</span>
                    <div>
                        <div style="font-weight: 500;">${lesson.title}</div>
                        <div style="font-size: 0.875rem; color: var(--color-neutral-600);">
                            ${lesson.type} ${lesson.duration ? '• ' + lesson.duration + ' min' : ''}
                            ${lesson.freePreview ? ' • ' + UI.createBadge('Free Preview', 'success') : ''}
                        </div>
                    </div>
                </div>
                <div style="display: flex; gap: 0.5rem;">
                    <button class="btn btn-ghost btn-sm" onclick="Courses.editLesson('${courseId}', ${moduleIndex}, ${lessonIndex})">
                        Edit
                    </button>
                    <button class="btn btn-ghost btn-sm" onclick="Courses.deleteLesson('${courseId}', ${moduleIndex}, ${lessonIndex})">
                        Delete
                    </button>
                </div>
            </div>
        `;
    },

    /**
     * Render settings tab
     */
    renderSettingsTab(course) {
        return `
            <div>
                <h3>Course Settings</h3>
                <div class="card mt-4">
                    <div class="card-body">
                        <h4>Danger Zone</h4>
                        <p class="text-neutral-600">Once you delete a course, there is no going back. Please be certain.</p>
                        <button class="btn btn-destructive mt-4" onclick="Courses.deleteCourse('${course.id}')">
                            Delete This Course
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Save overview
     */
    saveOverview(courseId) {
        const form = document.getElementById('course-overview-form');
        const validation = UI.validateForm(form, {
            title: { required: true, label: 'Title' },
            description: { required: true, label: 'Description' }
        });

        if (!validation.valid) return;

        State.updateCourse(courseId, validation.data);
        UI.showToast('Course updated successfully', 'success');
        this.currentCourse = State.getCourse(courseId);
    },

    /**
     * Show add module modal
     */
    showAddModuleModal(courseId) {
        const content = `
            <form id="add-module-form">
                ${UI.createFormGroup(
                    'Module Title',
                    UI.createInput('title', 'e.g., Getting Started'),
                    '',
                    '',
                    true
                )}

                ${UI.createFormGroup(
                    'Description (Optional)',
                    UI.createTextarea('description', 'Brief description', '', 3)
                )}
            </form>
        `;

        const footer = `
            <button class="btn btn-secondary" onclick="UI.closeModal(this.closest('.modal-backdrop'))">Cancel</button>
            <button class="btn btn-primary" onclick="Courses.handleAddModule('${courseId}')">Add Module</button>
        `;

        UI.showModal('Add Module', content, footer);
    },

    /**
     * Handle add module
     */
    handleAddModule(courseId) {
        const form = document.getElementById('add-module-form');
        const validation = UI.validateForm(form, {
            title: { required: true, label: 'Module Title' }
        });

        if (!validation.valid) return;

        const course = State.getCourse(courseId);
        const modules = course.modules || [];
        modules.push({
            ...validation.data,
            lessons: []
        });

        State.updateCourse(courseId, { modules });
        UI.closeModal(document.querySelector('.modal-backdrop'));
        UI.showToast('Module added successfully', 'success');
        this.editCourse(courseId);
    },

    /**
     * Show add lesson modal
     */
    showAddLessonModal(courseId, moduleIndex) {
        const content = `
            <form id="add-lesson-form">
                ${UI.createFormGroup(
                    'Lesson Title',
                    UI.createInput('title', 'e.g., Introduction to the Course'),
                    '',
                    '',
                    true
                )}

                ${UI.createFormGroup(
                    'Lesson Type',
                    UI.createSelect('type', ['video', 'pdf', 'text'], 'video'),
                    '',
                    '',
                    true
                )}

                ${UI.createFormGroup(
                    'Content URL',
                    UI.createInput('contentUrl', 'https://...'),
                    'Link to video, PDF, or other content'
                )}

                ${UI.createFormGroup(
                    'Duration (minutes)',
                    UI.createInput('duration', '10', '10', 'number')
                )}

                <div class="form-group">
                    ${UI.createToggle('freePreview', 'Allow free preview', false)}
                </div>
            </form>
        `;

        const footer = `
            <button class="btn btn-secondary" onclick="UI.closeModal(this.closest('.modal-backdrop'))">Cancel</button>
            <button class="btn btn-primary" onclick="Courses.handleAddLesson('${courseId}', ${moduleIndex})">Add Lesson</button>
        `;

        UI.showModal('Add Lesson', content, footer);
    },

    /**
     * Handle add lesson
     */
    handleAddLesson(courseId, moduleIndex) {
        const form = document.getElementById('add-lesson-form');
        const data = UI.getFormData(form);

        if (!data.title) {
            UI.showToast('Please enter a lesson title', 'error');
            return;
        }

        const course = State.getCourse(courseId);
        const modules = [...course.modules];
        modules[moduleIndex].lessons = modules[moduleIndex].lessons || [];
        modules[moduleIndex].lessons.push(data);

        State.updateCourse(courseId, { modules });
        UI.closeModal(document.querySelector('.modal-backdrop'));
        UI.showToast('Lesson added successfully', 'success');
        this.editCourse(courseId);
    },

    /**
     * Delete module
     */
    deleteModule(courseId, moduleIndex) {
        UI.showConfirm(
            'Delete Module',
            'This will delete all lessons inside this module. Are you sure?',
            () => {
                const course = State.getCourse(courseId);
                const modules = [...course.modules];
                modules.splice(moduleIndex, 1);
                State.updateCourse(courseId, { modules });
                UI.showToast('Module deleted', 'success');
                this.editCourse(courseId);
            }
        );
    },

    /**
     * Delete lesson
     */
    deleteLesson(courseId, moduleIndex, lessonIndex) {
        const course = State.getCourse(courseId);
        const modules = [...course.modules];
        modules[moduleIndex].lessons.splice(lessonIndex, 1);
        State.updateCourse(courseId, { modules });
        UI.showToast('Lesson deleted', 'success');
        this.editCourse(courseId);
    },

    /**
     * Publish course
     */
    publishCourse(courseId) {
        State.updateCourse(courseId, { status: 'published' });
        UI.showToast('Course published successfully!', 'success');
        this.editCourse(courseId);
    },

    /**
     * Unpublish course
     */
    unpublishCourse(courseId) {
        State.updateCourse(courseId, { status: 'draft' });
        UI.showToast('Course unpublished', 'info');
        this.editCourse(courseId);
    },

    /**
     * Delete course
     */
    deleteCourse(courseId) {
        UI.showConfirm(
            'Delete Course',
            'This will permanently delete the course and remove access for all learners. Are you sure?',
            () => {
                State.deleteCourse(courseId);
                UI.showToast('Course deleted', 'success');
                this.render();
            }
        );
    },

    /**
     * Duplicate course
     */
    duplicateCourse(courseId) {
        const course = State.getCourse(courseId);
        const newCourse = {
            ...course,
            title: `${course.title} (Copy)`,
            status: 'draft'
        };
        delete newCourse.id;
        State.addCourse(newCourse);
        UI.showToast('Course duplicated successfully', 'success');
        this.render();
    },

    /**
     * Filter courses
     */
    filterCourses(courses) {
        if (this.currentFilter === 'all') return courses;
        return courses.filter(c => c.status === this.currentFilter);
    },

    /**
     * Set filter
     */
    setFilter(filter) {
        this.currentFilter = filter;
        this.render();
    },

    /**
     * Handle search
     */
    handleSearch(query) {
        // Simple search implementation
        const courses = State.get('courses');
        const filtered = courses.filter(c =>
            c.title.toLowerCase().includes(query.toLowerCase()) ||
            (c.description && c.description.toLowerCase().includes(query.toLowerCase()))
        );
        // Re-render with filtered results (simplified)
        console.log('Search results:', filtered);
    }
};

// Export for global access
if (typeof window !== 'undefined') {
    window.Courses = Courses;
}
