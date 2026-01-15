/**
 * Quizzes Module
 * Create and manage quizzes with auto-grading
 */

import { State } from '../utils/state.js';
import { UI } from '../components/ui.js';
import { Navigation } from '../components/navigation.js';

export const Quizzes = {
    render() {
        Navigation.updatePageTitle('Quizzes');

        const quizzes = State.get('quizzes');

        const content = `
            <div>
                <div class="toolbar">
                    <div class="toolbar-left">
                        <h3>Quizzes</h3>
                    </div>
                    <div class="toolbar-right">
                        <button class="btn btn-primary" onclick="Quizzes.showCreateQuizModal()">
                            + Create Quiz
                        </button>
                    </div>
                </div>

                ${quizzes.length === 0 ? this.renderEmptyState() : this.renderQuizzesList(quizzes)}
            </div>
        `;

        Navigation.renderContent(content);
    },

    renderEmptyState() {
        return UI.createCard(
            '',
            UI.createEmptyState(
                '📝',
                'No quizzes yet',
                'Create quizzes to test your learners\' knowledge with auto-graded questions',
                '<button class="btn btn-primary btn-lg" onclick="Quizzes.showCreateQuizModal()">Create First Quiz</button>'
            )
        );
    },

    renderQuizzesList(quizzes) {
        const courses = State.get('courses');

        return `
            <div class="grid grid-cols-3">
                ${quizzes.map(quiz => {
                    const course = courses.find(c => c.id === quiz.courseId);
                    const questionsCount = (quiz.questions || []).length;

                    return `
                        <div class="card">
                            <div class="card-body">
                                <h4>${quiz.title}</h4>
                                <p class="text-sm text-neutral-600 mt-2">
                                    ${course ? course.title : 'No course'}
                                </p>
                                <div class="mt-4 text-sm text-neutral-600">
                                    ${questionsCount} questions • ${quiz.passingScore}% to pass
                                </div>
                            </div>
                            <div class="card-footer">
                                <div style="display: flex; gap: 0.5rem;">
                                    <button class="btn btn-secondary btn-sm" onclick="Quizzes.editQuiz('${quiz.id}')">Edit</button>
                                    <button class="btn btn-ghost btn-sm" onclick="Quizzes.deleteQuiz('${quiz.id}')">Delete</button>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    },

    showCreateQuizModal() {
        const courses = State.get('courses');

        const content = `
            <form id="create-quiz-form">
                ${UI.createFormGroup('Quiz Title', UI.createInput('title', 'e.g., Module 1 Quiz'), '', '', true)}
                ${UI.createFormGroup('Course', UI.createSelect('courseId', [
                    { value: '', label: '-- Select Course --' },
                    ...courses.map(c => ({ value: c.id, label: c.title }))
                ]), '', '', true)}
                ${UI.createFormGroup('Passing Score (%)', UI.createInput('passingScore', '70', '70', 'number'), '', '', true)}
            </form>
        `;

        const footer = `
            <button class="btn btn-secondary" onclick="UI.closeModal(this.closest('.modal-backdrop'))">Cancel</button>
            <button class="btn btn-primary" onclick="Quizzes.handleCreateQuiz()">Create Quiz</button>
        `;

        UI.showModal('Create Quiz', content, footer);
    },

    handleCreateQuiz() {
        const form = document.getElementById('create-quiz-form');
        const validation = UI.validateForm(form, {
            title: { required: true, label: 'Title' },
            courseId: { required: true, label: 'Course' },
            passingScore: { required: true, label: 'Passing Score' }
        });

        if (!validation.valid) return;

        const quiz = State.addQuiz({
            ...validation.data,
            questions: []
        });

        UI.closeModal(document.querySelector('.modal-backdrop'));
        UI.showToast('Quiz created successfully', 'success');
        this.editQuiz(quiz.id);
    },

    editQuiz(quizId) {
        const quiz = State.getQuiz(quizId);
        if (!quiz) return;

        const questions = quiz.questions || [];

        const content = `
            <div style="max-width: 800px; margin: 0 auto;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 2rem;">
                    <div>
                        <button class="btn btn-ghost btn-sm" onclick="Quizzes.render()">← Back</button>
                        <h2 style="margin-top: 1rem;">${quiz.title}</h2>
                    </div>
                </div>

                <div class="card mb-6">
                    <div class="card-header">
                        <h4>Questions</h4>
                    </div>
                    <div class="card-body">
                        ${questions.length === 0 ?
                            '<p class="text-neutral-600">No questions yet</p>' :
                            questions.map((q, i) => this.renderQuestionItem(quizId, q, i)).join('')
                        }
                        <button class="btn btn-primary mt-4" onclick="Quizzes.showAddQuestionModal('${quizId}')">
                            + Add Question
                        </button>
                    </div>
                </div>
            </div>
        `;

        Navigation.renderContent(content);
    },

    renderQuestionItem(quizId, question, index) {
        return `
            <div class="card mb-4">
                <div class="card-body">
                    <div style="display: flex; justify-content: space-between;">
                        <h5>Question ${index + 1}</h5>
                        <button class="btn btn-ghost btn-sm" onclick="Quizzes.deleteQuestion('${quizId}', ${index})">Delete</button>
                    </div>
                    <p style="margin-top: 1rem;">${question.question}</p>
                    <div style="margin-top: 1rem;">
                        ${question.options.map((opt, i) => `
                            <div style="padding: 0.5rem; background: ${i === question.correctAnswer ? 'var(--color-success-50)' : 'var(--color-neutral-50)'}; border-radius: var(--radius-md); margin-bottom: 0.5rem;">
                                ${opt} ${i === question.correctAnswer ? '✓' : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    },

    showAddQuestionModal(quizId) {
        const content = `
            <form id="add-question-form">
                ${UI.createFormGroup('Question', UI.createTextarea('question', 'Enter your question'), '', '', true)}
                ${UI.createFormGroup('Option 1', UI.createInput('option1', 'First option'), '', '', true)}
                ${UI.createFormGroup('Option 2', UI.createInput('option2', 'Second option'), '', '', true)}
                ${UI.createFormGroup('Option 3', UI.createInput('option3', 'Third option'), '', '', true)}
                ${UI.createFormGroup('Option 4', UI.createInput('option4', 'Fourth option'), '', '', true)}
                ${UI.createFormGroup('Correct Answer', UI.createSelect('correctAnswer', [
                    { value: '0', label: 'Option 1' },
                    { value: '1', label: 'Option 2' },
                    { value: '2', label: 'Option 3' },
                    { value: '3', label: 'Option 4' }
                ]), '', '', true)}
            </form>
        `;

        const footer = `
            <button class="btn btn-secondary" onclick="UI.closeModal(this.closest('.modal-backdrop'))">Cancel</button>
            <button class="btn btn-primary" onclick="Quizzes.handleAddQuestion('${quizId}')">Add Question</button>
        `;

        UI.showModal('Add Question', content, footer);
    },

    handleAddQuestion(quizId) {
        const form = document.getElementById('add-question-form');
        const data = UI.getFormData(form);

        if (!data.question || !data.option1 || !data.option2) {
            UI.showToast('Please fill in all required fields', 'error');
            return;
        }

        const quiz = State.getQuiz(quizId);
        const questions = quiz.questions || [];
        questions.push({
            question: data.question,
            options: [data.option1, data.option2, data.option3, data.option4],
            correctAnswer: parseInt(data.correctAnswer)
        });

        State.updateQuiz(quizId, { questions });
        UI.closeModal(document.querySelector('.modal-backdrop'));
        UI.showToast('Question added', 'success');
        this.editQuiz(quizId);
    },

    deleteQuestion(quizId, index) {
        const quiz = State.getQuiz(quizId);
        const questions = [...quiz.questions];
        questions.splice(index, 1);
        State.updateQuiz(quizId, { questions });
        UI.showToast('Question deleted', 'success');
        this.editQuiz(quizId);
    },

    deleteQuiz(quizId) {
        UI.showConfirm('Delete Quiz', 'Are you sure?', () => {
            State.deleteQuiz(quizId);
            UI.showToast('Quiz deleted', 'success');
            this.render();
        });
    }
};

if (typeof window !== 'undefined') window.Quizzes = Quizzes;
