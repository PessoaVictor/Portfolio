function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                input.style.borderColor = '#ef4444';
            } else {
                input.style.borderColor = '';
            }
        });
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function getMessageBackgroundColor(type) {
    if (type === 'success') {
        return 'background: #10b981; color: white;';
    } else if (type === 'info') {
        return 'background: #3b82f6; color: white;';
    } else {
        return 'background: #ef4444; color: white;';
    }
}

function showFormMessage(message, type) {
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    messageElement.style.cssText = `
        padding: 1rem;
        margin-top: 1rem;
        border-radius: 0.5rem;
        text-align: center;
        ${getMessageBackgroundColor(type)}
    `;
    
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.appendChild(messageElement);
        
        setTimeout(() => {
            if (messageElement?.parentNode) {
                messageElement.remove();
            }
        }, 5000);
    }
}

function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        const value = field.value.trim();
        
        if (!value) {
            field.classList.add('error');
            isValid = false;
        } else {
            field.classList.remove('error');
        }
        
        if (field.type === 'email' && value && !isValidEmail(value)) {
            field.classList.add('error');
            isValid = false;
        }
    });
    
    return isValid;
}

function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                validateField(input);
            });
            
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    validateField(input);
                }
            });
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    
    if (field.hasAttribute('required') && !value) {
        field.classList.add('error');
        return false;
    }
    
    if (field.type === 'email' && value && !isValidEmail(value)) {
        field.classList.add('error');
        return false;
    }
    
    field.classList.remove('error');
    return true;
}

if (typeof window !== 'undefined') {
    window.initContactForm = initContactForm;
    window.isValidEmail = isValidEmail;
    window.showFormMessage = showFormMessage;
    window.validateForm = validateForm;
    window.initFormValidation = initFormValidation;
    window.validateField = validateField;
}