document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const turnstileContainer = document.getElementById('turnstile-container');

    let turnstileWidgetId = null;

    initTurnstile();
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const service = document.getElementById('service').value;
            const address = document.getElementById('address').value.trim();
            const message = document.getElementById('message').value.trim();

            const turnstileToken = getTurnstileToken();
            if (!turnstileToken) {
                showMessage('Please complete the verification.', 'error');
                return;
            }
            
            if (!email && !phone) {
                showMessage('Please provide either an email address or phone number.', 'error');
                return;
            }
            
            if (email && !validateEmail(email)) {
                showMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            if (phone && !validatePhone(phone)) {
                showMessage('Please enter a valid phone number.', 'error');
                return;
            }
            
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            const formData = {
                name: name || null,
                email: email || null,
                phone: phone || null,
                service: service || null,
                address: address || null,
                message: message || null,
                turnstileToken: turnstileToken
            };
            
            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    showMessage('Thank you for your message! We will contact you within 24 hours.', 'success');
                    contactForm.reset();
                    resetTurnstile();
                } else {
                    console.error('Server error:', data);
                    showMessage(data.error || 'Failed to send message. Please try again or call us directly.', 'error');
                    resetTurnstile();
                }
                
            } catch (error) {
                console.error('Network error:', error);
                showMessage('Failed to send message. Please try again or call us at (815) 217-9898.', 'error');
                resetTurnstile();
            } finally {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        });
    }

    async function initTurnstile() {
        if (!turnstileContainer) {
            return;
        }

        try {
            const response = await fetch('/api/config');
            const data = await response.json();

            if (!response.ok || !data.turnstileSiteKey) {
                console.error('Turnstile config error:', data);
                showMessage('Verification is not configured. Please try again later.', 'error');
                return;
            }

            await waitForTurnstile();
            turnstileWidgetId = window.turnstile.render(turnstileContainer, {
                sitekey: data.turnstileSiteKey,
                theme: 'light'
            });
        } catch (err) {
            console.error('Turnstile init error:', err);
            showMessage('Verification failed to load. Please refresh the page.', 'error');
        }
    }

    function waitForTurnstile() {
        return new Promise((resolve, reject) => {
            const maxWaitMs = 5000;
            const start = Date.now();

            const tick = () => {
                if (window.turnstile && typeof window.turnstile.render === 'function') {
                    resolve();
                    return;
                }
                if (Date.now() - start > maxWaitMs) {
                    reject(new Error('Turnstile script did not load in time'));
                    return;
                }
                setTimeout(tick, 50);
            };

            tick();
        });
    }

    function getTurnstileToken() {
        if (!window.turnstile || turnstileWidgetId === null) {
            return null;
        }
        return window.turnstile.getResponse(turnstileWidgetId) || null;
    }

    function resetTurnstile() {
        if (!window.turnstile || turnstileWidgetId === null) {
            return;
        }
        window.turnstile.reset(turnstileWidgetId);
    }
    
    function showMessage(text, type) {
        if (formMessage) {
            formMessage.textContent = text;
            formMessage.className = 'form-message ' + type;
            
            setTimeout(function() {
                if (type === 'error') {
                    formMessage.className = 'form-message';
                }
            }, 8000);
        }
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function validatePhone(phone) {
        const re = /^[\d\s\-\(\)]+$/;
        return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
    }
});
