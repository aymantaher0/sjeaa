/**
 * Sessions Module
 * Schedule and manage live sessions with attendance tracking
 */

import { State } from '../utils/state.js';
import { UI } from '../components/ui.js';
import { Navigation } from '../components/navigation.js';

export const Sessions = {
    render() {
        Navigation.updatePageTitle('Live Sessions');

        const sessions = State.get('sessions');

        const content = `
            <div>
                <div class="toolbar">
                    <div class="toolbar-left"><h3>Live Sessions</h3></div>
                    <div class="toolbar-right">
                        <button class="btn btn-primary" onclick="Sessions.showScheduleSessionModal()">+ Schedule Session</button>
                    </div>
                </div>

                ${sessions.length === 0 ? this.renderEmptyState() : this.renderSessionsList(sessions)}
            </div>
        `;

        Navigation.renderContent(content);
    },

    renderEmptyState() {
        return UI.createCard('', UI.createEmptyState(
            '🎥',
            'No live sessions yet',
            'Schedule live sessions for your courses and track attendance',
            '<button class="btn btn-primary btn-lg" onclick="Sessions.showScheduleSessionModal()">Schedule First Session</button>'
        ));
    },

    renderSessionsList(sessions) {
        const courses = State.get('courses');
        const now = new Date();

        const upcomingSessions = sessions.filter(s => new Date(s.dateTime) > now);
        const pastSessions = sessions.filter(s => new Date(s.dateTime) <= now);

        return `
            <div>
                ${upcomingSessions.length > 0 ? `
                    <h3 class="mb-4">Upcoming Sessions</h3>
                    <div class="grid grid-cols-2 mb-8">
                        ${upcomingSessions.map(session => this.renderSessionCard(session, courses, true)).join('')}
                    </div>
                ` : ''}

                ${pastSessions.length > 0 ? `
                    <h3 class="mb-4">Past Sessions</h3>
                    <div class="grid grid-cols-2">
                        ${pastSessions.map(session => this.renderSessionCard(session, courses, false)).join('')}
                    </div>
                ` : ''}
            </div>
        `;
    },

    renderSessionCard(session, courses, isUpcoming) {
        const course = courses.find(c => c.id === session.courseId);
        const attendance = session.attendance || [];
        const attendanceCount = attendance.filter(a => a.present).length;

        return `
            <div class="card">
                <div class="card-body">
                    <div style="display: flex; justify-content: between; align-items: start;">
                        <h4 style="flex: 1;">${session.title}</h4>
                        ${UI.createBadge(isUpcoming ? 'Upcoming' : 'Completed', isUpcoming ? 'info' : 'neutral')}
                    </div>
                    <p class="text-sm text-neutral-600 mt-2">${course ? course.title : 'No course'}</p>
                    <div class="mt-3">
                        <div class="text-sm">📅 ${UI.formatDate(session.dateTime)}</div>
                        <div class="text-sm mt-1">⏱️ ${session.duration} minutes</div>
                        <div class="text-sm mt-1">🔗 ${session.platform}</div>
                        ${!isUpcoming ? `<div class="text-sm mt-1">✓ ${attendanceCount} attended</div>` : ''}
                    </div>
                </div>
                <div class="card-footer">
                    ${isUpcoming ?
                        `<a href="${session.joinLink}" target="_blank" class="btn btn-primary btn-sm">Join Session</a>` :
                        `<button class="btn btn-secondary btn-sm" onclick="Sessions.viewAttendance('${session.id}')">View Attendance</button>`
                    }
                    <button class="btn btn-ghost btn-sm" onclick="Sessions.deleteSession('${session.id}')">Delete</button>
                </div>
            </div>
        `;
    },

    showScheduleSessionModal() {
        const courses = State.get('courses');

        const content = `
            <form id="schedule-session-form">
                ${UI.createFormGroup('Session Title', UI.createInput('title', 'e.g., Module 1 Live Class'), '', '', true)}
                ${UI.createFormGroup('Course', UI.createSelect('courseId', [
                    { value: '', label: '-- Select Course --' },
                    ...courses.map(c => ({ value: c.id, label: c.title }))
                ]), '', '', true)}
                ${UI.createFormGroup('Date & Time', UI.createInput('dateTime', '', '', 'datetime-local'), '', '', true)}
                ${UI.createFormGroup('Duration (minutes)', UI.createInput('duration', '60', '60', 'number'), '', '', true)}
                ${UI.createFormGroup('Platform', UI.createSelect('platform', ['Zoom', 'Google Meet', 'Microsoft Teams', 'Other']), '', '', true)}
                ${UI.createFormGroup('Join Link', UI.createInput('joinLink', 'https://...'), '', '', true)}
            </form>
        `;

        const footer = `
            <button class="btn btn-secondary" onclick="UI.closeModal(this.closest('.modal-backdrop'))">Cancel</button>
            <button class="btn btn-primary" onclick="Sessions.handleScheduleSession()">Schedule</button>
        `;

        UI.showModal('Schedule Live Session', content, footer);
    },

    handleScheduleSession() {
        const form = document.getElementById('schedule-session-form');
        const validation = UI.validateForm(form, {
            title: { required: true, label: 'Title' },
            courseId: { required: true, label: 'Course' },
            dateTime: { required: true, label: 'Date & Time' },
            duration: { required: true, label: 'Duration' },
            joinLink: { required: true, label: 'Join Link' }
        });

        if (!validation.valid) return;

        // Get learners enrolled in the course to prepare attendance list
        const learners = State.get('learners').filter(l => (l.courses || []).includes(validation.data.courseId));

        State.addSession({
            ...validation.data,
            attendance: learners.map(l => ({
                learnerId: l.id,
                learnerName: l.name,
                present: false
            }))
        });

        UI.closeModal(document.querySelector('.modal-backdrop'));
        UI.showToast('Session scheduled successfully', 'success');
        this.render();
    },

    viewAttendance(sessionId) {
        const session = State.getSession(sessionId);
        if (!session) return;

        const attendance = session.attendance || [];

        const content = `
            <div>
                <h4>${session.title}</h4>
                <p class="text-neutral-600 mb-4">${UI.formatDate(session.dateTime)}</p>

                ${attendance.length === 0 ?
                    '<p class="text-neutral-600">No learners enrolled in this course</p>' :
                    '<div>' + attendance.map((a, index) => `
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; border-bottom: 1px solid var(--color-neutral-200);">
                            <div>
                                <strong>${a.learnerName}</strong>
                                ${a.checkInTime ? `<div class="text-sm text-neutral-600">Checked in at ${new Date(a.checkInTime).toLocaleTimeString()}</div>` : ''}
                            </div>
                            <div>
                                ${UI.createBadge(a.present ? 'Present' : 'Absent', a.present ? 'success' : 'neutral')}
                            </div>
                        </div>
                    `).join('') + '</div>'
                }

                <div class="mt-4">
                    <button class="btn btn-primary" onclick="Sessions.markAllPresent('${sessionId}')">Mark All Present</button>
                </div>
            </div>
        `;

        UI.showModal('Attendance', content, '', 'lg');
    },

    markAllPresent(sessionId) {
        const session = State.getSession(sessionId);
        const attendance = (session.attendance || []).map(a => ({
            ...a,
            present: true,
            checkInTime: new Date().toISOString()
        }));

        State.updateSession(sessionId, { attendance });
        UI.showToast('All marked as present', 'success');
        this.viewAttendance(sessionId);
    },

    deleteSession(sessionId) {
        UI.showConfirm('Delete Session', 'Are you sure?', () => {
            State.deleteSession(sessionId);
            UI.showToast('Session deleted', 'success');
            this.render();
        });
    }
};

if (typeof window !== 'undefined') window.Sessions = Sessions;
