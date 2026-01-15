/**
 * Payments & Plans Module
 * Manage subscription plans and view payments
 */

import { State } from '../utils/state.js';
import { UI } from '../components/ui.js';
import { Navigation } from '../components/navigation.js';

export const Payments = {
    render() {
        Navigation.updatePageTitle('Billing & Plans');

        const currentPlan = State.get('currentPlan');
        const payments = State.get('payments');

        const content = `
            <div>
                <div class="mb-8">
                    <h2>Your Plan</h2>
                    <p class="text-neutral-600">Manage your subscription and view payment history</p>
                </div>

                <div class="card mb-8">
                    <div class="card-body">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <h3>Current Plan: ${UI.createBadge(currentPlan.toUpperCase(), 'primary')}</h3>
                                <p class="text-neutral-600 mt-2">${this.getPlanDescription(currentPlan)}</p>
                            </div>
                            ${currentPlan !== 'proPlus' ?
                                '<button class="btn btn-primary" onclick="Payments.showPlansModal()">Upgrade Plan</button>' :
                                '<div>' + UI.createBadge('Best Plan', 'success') + '</div>'
                            }
                        </div>

                        <div class="mt-6">
                            <h4 class="mb-3">Your Plan Includes:</h4>
                            ${this.renderPlanLimits(currentPlan)}
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Payment History</h3>
                    </div>
                    <div class="card-body">
                        ${payments.length === 0 ?
                            '<p class="text-neutral-600">No payment history yet</p>' :
                            this.renderPaymentsTable(payments)
                        }
                    </div>
                </div>
            </div>
        `;

        Navigation.renderContent(content);
    },

    getPlanDescription(plan) {
        const descriptions = {
            free: 'Perfect for getting started with your first course',
            pro: 'Ideal for growing instructors with multiple courses',
            proPlus: 'Advanced features for teams and larger academies'
        };
        return descriptions[plan] || '';
    },

    renderPlanLimits(planType) {
        const limits = State.getPlanLimits();

        return `
            <div class="grid grid-cols-3 gap-4">
                <div class="stat-card">
                    <div class="stat-label">Courses</div>
                    <div class="stat-value">${limits.courses === Infinity ? '∞' : limits.courses}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Students per Course</div>
                    <div class="stat-value">${limits.studentsPerCourse === Infinity ? '∞' : limits.studentsPerCourse}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Team Members</div>
                    <div class="stat-value">${limits.teamMembers === Infinity ? '∞' : limits.teamMembers}</div>
                </div>
            </div>

            <div class="mt-4">
                <ul style="list-style: none; padding: 0;">
                    <li class="plan-feature">${limits.customDomain ? 'Custom domain included' : 'No custom domain'}</li>
                    <li class="plan-feature">${limits.paymentGateways} payment gateway${limits.paymentGateways > 1 ? 's' : ''}</li>
                    ${limits.storage === Infinity ? '<li class="plan-feature">Unlimited storage</li>' : `<li class="plan-feature">${limits.storage / 1024} GB storage</li>`}
                </ul>
            </div>
        `;
    },

    renderPaymentsTable(payments) {
        const rows = payments.map(payment => [
            UI.formatDate(payment.createdAt),
            payment.learnerName || 'N/A',
            payment.courseName || 'Subscription',
            UI.formatCurrency(payment.amount),
            UI.createBadge(payment.status || 'completed', 'success')
        ]);

        return UI.createTable(
            ['Date', 'From', 'Item', 'Amount', 'Status'],
            rows
        );
    },

    showPlansModal() {
        const currentPlan = State.get('currentPlan');

        const content = `
            <div class="plan-cards" style="grid-template-columns: repeat(3, 1fr);">
                ${this.renderPlanCard('free', 'Free', 0, [
                    '1 course',
                    '50 students per course',
                    '1 GB storage',
                    '1 payment gateway',
                    'Basic features'
                ], currentPlan === 'free')}

                ${this.renderPlanCard('pro', 'Pro', 29, [
                    '10 courses',
                    '500 students per course',
                    '10 GB storage',
                    '2 payment gateways',
                    'Custom domain',
                    'Priority support'
                ], currentPlan === 'pro', true)}

                ${this.renderPlanCard('proPlus', 'Pro Plus', 99, [
                    'Unlimited courses',
                    'Unlimited students',
                    'Unlimited storage',
                    'Unlimited payment gateways',
                    'Custom domain',
                    'Team collaboration',
                    'Advanced analytics',
                    'Priority support'
                ], currentPlan === 'proPlus')}
            </div>
        `;

        UI.showModal('Choose Your Plan', content, '', 'xl');
    },

    renderPlanCard(planType, name, price, features, isCurrent, isFeatured = false) {
        return `
            <div class="plan-card ${isFeatured ? 'featured' : ''}" style="margin-bottom: 0;">
                ${isFeatured ? '<div class="plan-badge">Popular</div>' : ''}
                <div class="plan-name">${name}</div>
                <div class="plan-price">${price === 0 ? 'Free' : '$' + price}</div>
                <div class="plan-period">${price === 0 ? 'Forever' : 'per month'}</div>
                <ul class="plan-features">
                    ${features.map(f => `<li class="plan-feature">${f}</li>`).join('')}
                </ul>
                <button class="btn ${isCurrent ? 'btn-secondary' : 'btn-primary'}"
                        style="width: 100%;"
                        onclick="Payments.selectPlan('${planType}')"
                        ${isCurrent ? 'disabled' : ''}>
                    ${isCurrent ? 'Current Plan' : 'Choose Plan'}
                </button>
            </div>
        `;
    },

    selectPlan(planType) {
        const currentPlan = State.get('currentPlan');

        if (planType === currentPlan) {
            UI.showToast('You are already on this plan', 'info');
            return;
        }

        // Simulate payment/upgrade
        State.setPlan(planType);

        // Add payment record
        if (planType !== 'free') {
            const amounts = { pro: 29, proPlus: 99 };
            State.addPayment({
                amount: amounts[planType],
                status: 'completed',
                courseName: 'Subscription',
                learnerName: State.get('user').name
            });
        }

        UI.closeModal(document.querySelector('.modal-backdrop'));
        UI.showToast(`Successfully upgraded to ${planType.toUpperCase()} plan!`, 'success');

        // Reload page to reflect new limits
        this.render();
        Navigation.render();
    }
};

if (typeof window !== 'undefined') window.Payments = Payments;
