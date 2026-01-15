/**
 * UI Components Library
 * Reusable UI component functions
 */

export const UI = {
    /**
     * Show toast notification
     */
    showToast(message, type = 'info', duration = 3000) {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };

        toast.innerHTML = `
            <div class="toast-icon">${icons[type] || icons.info}</div>
            <div class="toast-content">
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close" onclick="this.parentElement.remove()">×</button>
        `;

        container.appendChild(toast);

        if (duration > 0) {
            setTimeout(() => {
                toast.style.opacity = '0';
                setTimeout(() => toast.remove(), 300);
            }, duration);
        }

        return toast;
    },

    /**
     * Show modal
     */
    showModal(title, content, footer = '', size = 'md') {
        const container = document.getElementById('modal-container');
        const backdrop = document.createElement('div');
        backdrop.className = 'modal-backdrop';

        const modalSizes = {
            sm: '400px',
            md: '600px',
            lg: '800px',
            xl: '1000px'
        };

        backdrop.innerHTML = `
            <div class="modal" style="max-width: ${modalSizes[size]}">
                <div class="modal-header">
                    <h3 class="modal-title">${title}</h3>
                    <button class="modal-close">×</button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
                ${footer ? `<div class="modal-footer">${footer}</div>` : ''}
            </div>
        `;

        container.appendChild(backdrop);

        // Close modal handlers
        const closeBtn = backdrop.querySelector('.modal-close');
        closeBtn.onclick = () => this.closeModal(backdrop);

        backdrop.onclick = (e) => {
            if (e.target === backdrop) {
                this.closeModal(backdrop);
            }
        };

        return backdrop;
    },

    /**
     * Close modal
     */
    closeModal(backdrop) {
        backdrop.style.opacity = '0';
        setTimeout(() => backdrop.remove(), 200);
    },

    /**
     * Show confirmation dialog
     */
    showConfirm(title, message, onConfirm, onCancel) {
        const content = `<p>${message}</p>`;
        const footer = `
            <button class="btn btn-secondary" id="cancel-btn">Cancel</button>
            <button class="btn btn-destructive" id="confirm-btn">Confirm</button>
        `;

        const modal = this.showModal(title, content, footer);

        const confirmBtn = modal.querySelector('#confirm-btn');
        const cancelBtn = modal.querySelector('#cancel-btn');

        confirmBtn.onclick = () => {
            if (onConfirm) onConfirm();
            this.closeModal(modal);
        };

        cancelBtn.onclick = () => {
            if (onCancel) onCancel();
            this.closeModal(modal);
        };
    },

    /**
     * Create form group
     */
    createFormGroup(label, input, helper = '', error = '', required = false) {
        return `
            <div class="form-group">
                <label class="form-label ${required ? 'form-label-required' : ''}">${label}</label>
                ${input}
                ${helper ? `<span class="form-helper">${helper}</span>` : ''}
                ${error ? `<span class="form-error">${error}</span>` : ''}
            </div>
        `;
    },

    /**
     * Create input field
     */
    createInput(name, placeholder = '', value = '', type = 'text', className = '') {
        return `<input
            type="${type}"
            name="${name}"
            id="${name}"
            class="form-input ${className}"
            placeholder="${placeholder}"
            value="${value}"
        />`;
    },

    /**
     * Create textarea
     */
    createTextarea(name, placeholder = '', value = '', rows = 4) {
        return `<textarea
            name="${name}"
            id="${name}"
            class="form-textarea"
            placeholder="${placeholder}"
            rows="${rows}"
        >${value}</textarea>`;
    },

    /**
     * Create select dropdown
     */
    createSelect(name, options, selected = '') {
        const optionsHtml = options.map(opt => {
            const value = typeof opt === 'string' ? opt : opt.value;
            const label = typeof opt === 'string' ? opt : opt.label;
            return `<option value="${value}" ${value === selected ? 'selected' : ''}>${label}</option>`;
        }).join('');

        return `<select name="${name}" id="${name}" class="form-select">${optionsHtml}</select>`;
    },

    /**
     * Create toggle switch
     */
    createToggle(name, label, checked = false) {
        return `
            <div class="toggle-wrapper">
                <div class="toggle ${checked ? 'active' : ''}" data-name="${name}" onclick="this.classList.toggle('active')">
                </div>
                <span>${label}</span>
            </div>
        `;
    },

    /**
     * Create checkbox
     */
    createCheckbox(name, label, checked = false) {
        return `
            <div class="checkbox-wrapper" onclick="this.querySelector('.checkbox').classList.toggle('checked')">
                <div class="checkbox ${checked ? 'checked' : ''}" data-name="${name}"></div>
                <span>${label}</span>
            </div>
        `;
    },

    /**
     * Create radio button
     */
    createRadio(name, value, label, checked = false) {
        return `
            <div class="radio-wrapper">
                <div class="radio ${checked ? 'checked' : ''}" data-name="${name}" data-value="${value}"></div>
                <span>${label}</span>
            </div>
        `;
    },

    /**
     * Create card
     */
    createCard(title, body, footer = '', className = '') {
        return `
            <div class="card ${className}">
                ${title ? `
                    <div class="card-header">
                        <h3 class="card-title">${title}</h3>
                    </div>
                ` : ''}
                <div class="card-body">${body}</div>
                ${footer ? `<div class="card-footer">${footer}</div>` : ''}
            </div>
        `;
    },

    /**
     * Create stat card
     */
    createStatCard(label, value, change = null) {
        return `
            <div class="stat-card">
                <div class="stat-label">${label}</div>
                <div class="stat-value">${value}</div>
                ${change !== null ? `
                    <div class="stat-change ${change >= 0 ? 'positive' : 'negative'}">
                        ${change >= 0 ? '↑' : '↓'} ${Math.abs(change)}%
                    </div>
                ` : ''}
            </div>
        `;
    },

    /**
     * Create badge
     */
    createBadge(text, type = 'neutral') {
        return `<span class="badge badge-${type}">${text}</span>`;
    },

    /**
     * Create table
     */
    createTable(headers, rows, className = '') {
        const headersHtml = headers.map(h => `<th>${h}</th>`).join('');
        const rowsHtml = rows.map(row => `
            <tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>
        `).join('');

        return `
            <div class="table-wrapper">
                <table class="table ${className}">
                    <thead>
                        <tr>${headersHtml}</tr>
                    </thead>
                    <tbody>${rowsHtml}</tbody>
                </table>
            </div>
        `;
    },

    /**
     * Create empty state
     */
    createEmptyState(icon, title, description, action = '') {
        return `
            <div class="empty-state">
                <div class="empty-state-icon">${icon}</div>
                <h3 class="empty-state-title">${title}</h3>
                <p class="empty-state-description">${description}</p>
                ${action}
            </div>
        `;
    },

    /**
     * Create tabs
     */
    createTabs(tabs, activeTab = 0) {
        const tabsHtml = tabs.map((tab, index) => `
            <li class="tab ${index === activeTab ? 'active' : ''}" data-tab="${index}">
                ${tab.label}
            </li>
        `).join('');

        const contentHtml = tabs.map((tab, index) => `
            <div class="tab-content ${index === activeTab ? 'active' : ''}" data-tab-content="${index}">
                ${tab.content}
            </div>
        `).join('');

        return `
            <div class="tabs">
                <ul class="tabs-list">${tabsHtml}</ul>
            </div>
            <div class="tabs-content">${contentHtml}</div>
        `;
    },

    /**
     * Switch tab
     */
    switchTab(tabIndex) {
        // Remove active class from all tabs and contents
        document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        // Add active class to selected tab and content
        const selectedTab = document.querySelector(`.tab[data-tab="${tabIndex}"]`);
        const selectedContent = document.querySelector(`.tab-content[data-tab-content="${tabIndex}"]`);

        if (selectedTab) selectedTab.classList.add('active');
        if (selectedContent) selectedContent.classList.add('active');
    },

    /**
     * Create progress bar
     */
    createProgressBar(label, percentage) {
        return `
            <div class="progress-wrapper">
                <div class="progress-label">
                    <span>${label}</span>
                    <span>${percentage}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${percentage}%"></div>
                </div>
            </div>
        `;
    },

    /**
     * Create skeleton loader
     */
    createSkeleton(type = 'text', count = 3) {
        const skeletons = {
            text: '<div class="skeleton skeleton-text"></div>',
            title: '<div class="skeleton skeleton-title"></div>',
            card: '<div class="skeleton skeleton-card"></div>'
        };

        return Array(count).fill(skeletons[type] || skeletons.text).join('');
    },

    /**
     * Create dropdown menu
     */
    createDropdown(items) {
        const itemsHtml = items.map(item => {
            if (item === 'divider') {
                return '<div class="dropdown-divider"></div>';
            }
            return `
                <div class="dropdown-item ${item.destructive ? 'destructive' : ''}"
                     onclick="${item.onClick}">
                    ${item.icon ? `<span>${item.icon}</span>` : ''}
                    ${item.label}
                </div>
            `;
        }).join('');

        return `<div class="dropdown-menu">${itemsHtml}</div>`;
    },

    /**
     * Create alert
     */
    createAlert(message, type = 'info') {
        return `
            <div class="alert alert-${type}">
                ${message}
            </div>
        `;
    },

    /**
     * Show loading screen
     */
    showLoading() {
        const screen = document.getElementById('loading-screen');
        if (screen) screen.classList.remove('hidden');
    },

    /**
     * Hide loading screen
     */
    hideLoading() {
        const screen = document.getElementById('loading-screen');
        if (screen) screen.classList.add('hidden');
    },

    /**
     * Format date
     */
    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    },

    /**
     * Format currency
     */
    formatCurrency(amount, currency = 'USD') {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    },

    /**
     * Get form data as object
     */
    getFormData(formElement) {
        const formData = new FormData(formElement);
        const data = {};

        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }

        // Get toggle states
        formElement.querySelectorAll('.toggle').forEach(toggle => {
            const name = toggle.dataset.name;
            if (name) {
                data[name] = toggle.classList.contains('active');
            }
        });

        // Get checkbox states
        formElement.querySelectorAll('.checkbox').forEach(checkbox => {
            const name = checkbox.dataset.name;
            if (name) {
                data[name] = checkbox.classList.contains('checked');
            }
        });

        return data;
    },

    /**
     * Validate form
     */
    validateForm(formElement, rules) {
        const data = this.getFormData(formElement);
        const errors = {};

        for (const [field, fieldRules] of Object.entries(rules)) {
            const value = data[field];

            if (fieldRules.required && !value) {
                errors[field] = `${fieldRules.label || field} is required`;
                continue;
            }

            if (fieldRules.minLength && value.length < fieldRules.minLength) {
                errors[field] = `${fieldRules.label || field} must be at least ${fieldRules.minLength} characters`;
                continue;
            }

            if (fieldRules.maxLength && value.length > fieldRules.maxLength) {
                errors[field] = `${fieldRules.label || field} must be less than ${fieldRules.maxLength} characters`;
                continue;
            }

            if (fieldRules.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                errors[field] = `Please enter a valid email address`;
                continue;
            }

            if (fieldRules.pattern && !fieldRules.pattern.test(value)) {
                errors[field] = fieldRules.message || `${fieldRules.label || field} is invalid`;
                continue;
            }

            if (fieldRules.custom && !fieldRules.custom(value, data)) {
                errors[field] = fieldRules.message || `${fieldRules.label || field} is invalid`;
            }
        }

        // Display errors
        this.clearFormErrors(formElement);
        if (Object.keys(errors).length > 0) {
            this.showFormErrors(formElement, errors);
            return { valid: false, errors };
        }

        return { valid: true, data };
    },

    /**
     * Show form errors
     */
    showFormErrors(formElement, errors) {
        for (const [field, message] of Object.entries(errors)) {
            const input = formElement.querySelector(`[name="${field}"]`);
            if (input) {
                input.classList.add('error');
                const errorSpan = document.createElement('span');
                errorSpan.className = 'form-error';
                errorSpan.textContent = message;
                input.parentElement.appendChild(errorSpan);
            }
        }
    },

    /**
     * Clear form errors
     */
    clearFormErrors(formElement) {
        formElement.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
        formElement.querySelectorAll('.form-error').forEach(el => el.remove());
    }
};

// Export for global access
if (typeof window !== 'undefined') {
    window.UI = UI;
}
