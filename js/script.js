// ==================== UTILIDADES ====================
const DOM = {
    contactForm: document.querySelector('#contactForm'),
    formMessage: document.querySelector('#formMessage'),
    navbar: document.querySelector('.navbar'),
    whatsappButton: document.querySelector('#whatsappButtonForm'),
    whatsappFloat: document.querySelector('#whatsappFloat')
};

// ==================== FORMULARIO DE CONTACTO ====================
function initContactForm() {
    if (!DOM.contactForm) return;

    DOM.contactForm.addEventListener('submit', handleFormSubmit);
}

function initWhatsappLinks() {
    const whatsappNumber = '1234567890'; // Reemplaza con tu número real sin signos ni espacios
    const baseUrl = `https://wa.me/${whatsappNumber}`;
    const defaultText = encodeURIComponent('Hola Fundación, quiero más información.');
    const link = `${baseUrl}?text=${defaultText}`;

    if (DOM.whatsappButton) DOM.whatsappButton.href = link;
    if (DOM.whatsappFloat) DOM.whatsappFloat.href = link;
}

function handleFormSubmit(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const asunto = document.getElementById('asunto').value;
    const mensaje = document.getElementById('mensaje').value.trim();

    if (!validateForm(nombre, apellido, email, asunto, mensaje)) {
        showFormMessage('Por favor, completa todos los campos obligatorios correctamente.', 'error');
        return;
    }

    const submission = {
        nombre,
        apellido,
        email,
        telefono: telefono || 'No proporcionado',
        asunto,
        mensaje,
        fecha: new Date().toISOString()
    };

    // Guardar en localStorage para seguimiento (simula envío a servidor)
    const lista = JSON.parse(localStorage.getItem('contactFormSubmissions') || '[]');
    lista.push(submission);
    localStorage.setItem('contactFormSubmissions', JSON.stringify(lista));

    showFormMessage(`Formulario enviado con éxito. Nos comunicaremos pronto, ${nombre}.`, 'success');
    DOM.contactForm.reset();

    console.log('Nuevo envío de formulario de contacto:', submission);

    setTimeout(() => {
        showFormMessage('', '');
    }, 5000);
}

function validateForm(nombre, apellido, email, asunto, mensaje) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nombre) {
        showFormMessage('El nombre es obligatorio.', 'error');
        return false;
    }
    if (!apellido) {
        showFormMessage('El apellido es obligatorio.', 'error');
        return false;
    }
    if (!email || !emailRegex.test(email)) {
        showFormMessage('El email es obligatorio y debe tener formato válido.', 'error');
        return false;
    }
    if (!asunto) {
        showFormMessage('El asunto es obligatorio.', 'error');
        return false;
    }
    if (!mensaje) {
        showFormMessage('El mensaje es obligatorio.', 'error');
        return false;
    }

    return true;
}

function showFormMessage(message, type) {
    DOM.formMessage.textContent = message;
    DOM.formMessage.className = `form-message ${type}`;
}

// ==================== EFECTOS DE NAVEGACIÓN ====================
function updateNavbarOnScroll() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            DOM.navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        } else {
            DOM.navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        }
    });
}

// ==================== ANIMACIONES DE ENTRADA ====================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elementos a animar
    const animatedElements = document.querySelectorAll(
        '.program-detail-card, .stat, .team-member, .value-card, ' +
        '.story-card, .gallery-item, .impact-stat, .info-card'
    );

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// ==================== INICIALIZACIÓN ==================== 
document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
    initWhatsappLinks();
    updateNavbarOnScroll();
    initScrollAnimations();
});

console.log('Sitio web cargado correctamente');

