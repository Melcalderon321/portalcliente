// Data
const faqData = [
    {
        id: 1,
        category: 'campañas',
        question: '¿Cómo puedo ver el rendimiento de mis anuncios?',
        short: 'Consulta en tiempo real vía Admin Tehuentec.',
        long: 'Para ver el rendimiento detallado, ingresa a admin.tehuentec.com. En la sección "Reportes" encontrarás gráficos de Google Ads y Meta Ads con métricas clave como CTR, CPC y Conversiones.'
    },
    {
        id: 2,
        category: 'facturacion',
        question: '¿Dónde descargo mis facturas?',
        short: 'En el panel central de Administración.',
        long: 'Todas tus facturas están centralizadas en el panel de Administración. Si no tienes acceso habilitado, puedes solicitar el alta a través del formulario de este mismo portal.'
    },
    {
        id: 3,
        category: 'diseño',
        question: '¿Cómo solicito un cambio en la web?',
        short: 'Inicia una gestión de "Web Update".',
        long: 'Selecciona "Web Update" en el formulario de inicio. Describe los cambios y nuestro equipo técnico iniciará la gestión en un plazo de 24 a 48hs hábiles.'
    },
    {
        id: 4,
        category: 'estrategia',
        question: '¿Qué incluye el asesoramiento estratégico?',
        short: 'Optimización de ROI y análisis de mercado.',
        long: 'Nuestro asesoramiento incluye revisiones mensuales de KPIs, optimización de embudos de venta y ajustes estratégicos para maximizar el retorno de tu inversión publicitaria.'
    },
    {
        id: 5,
        category: 'campañas',
        question: '¿Cuánto tardan en activarse los anuncios?',
        short: 'Aproximadamente 48 horas hábiles.',
        long: 'Una vez aprobada la pieza creativa y el presupuesto, las plataformas (Google/Meta) suelen tardar entre 24 y 48 horas en completar el proceso de revisión y activación.'
    }
];


// Initialize
function initApp() {
    renderFAQ(faqData);
    initRoadmapAnimation();
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initApp();
} else {
    document.addEventListener('DOMContentLoaded', initApp);
}

// Viewport Switcher Logic
function switchView(mode, updateURL = true) {
    const body = document.body;
    const btns = document.querySelectorAll('.view-btn');
    
    btns.forEach(btn => btn.classList.remove('active'));
    
    if (mode === 'desktop') {
        body.classList.add('view-desktop');
        const btn = document.getElementById('view-desk');
        if (btn) btn.classList.add('active');
        localStorage.setItem('tehuentec-pref-view', 'desktop');
        if (updateURL) updateUrlParam('view', 'desktop');
    } else {
        body.classList.remove('view-desktop');
        const btn = document.getElementById('view-mob');
        if (btn) btn.classList.add('active');
        localStorage.setItem('tehuentec-pref-view', 'mobile');
        if (updateURL) updateUrlParam('view', 'mobile');
    }
}

function updateUrlParam(key, value) {
    const url = new URL(window.location.href);
    url.searchParams.set(key, value);
    window.history.replaceState({}, '', url);
}

// Init Viewport on Load
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlView = urlParams.get('view');
    const savedView = localStorage.getItem('tehuentec-pref-view');
    
    const finalView = urlView || savedView || 'mobile';
    switchView(finalView, false); // Don't push to URL again on init
});

// UI Toggles
function toggleElement(id) {
    const el = document.getElementById(id);
    el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// Modal Logic
function openModal() {
    const modal = document.getElementById('modal-solicitud');
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('active');
        document.body.classList.add('modal-open');
    }, 10);
}

function closeModal() {
    const modal = document.getElementById('modal-solicitud');
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
    setTimeout(() => {
        modal.style.display = 'none';
        resetForm();
    }, 300);
}

function closeModalOnOutsideClick(e) {
    if (e.target.classList.contains('modal-overlay')) {
        closeModal();
    }
}

function hideCallCard() {
    document.getElementById('call-card').style.display = 'none';
}

// Timezone Logic (Removed dynamic list)

function toggleHours() {
    const details = document.getElementById('hours-details');
    const btn = document.getElementById('hours-btn');
    
    if (!details.classList.contains('active')) {
        details.classList.add('active');
        btn.classList.add('active');
        // Ensure others are closed
        closeFacturacion();
        closeRecursos();
    } else {
        details.classList.remove('active');
        btn.classList.remove('active');
    }
}

function toggleFacturacion() {
    const details = document.getElementById('facturacion-details');
    const btn = document.getElementById('facturacion-btn');
    
    if (!details.classList.contains('active')) {
        details.classList.add('active');
        btn.classList.add('active');
        // Ensure others are closed
        closeHours();
        closeRecursos();
    } else {
        details.classList.remove('active');
        btn.classList.remove('active');
    }
}

function toggleRecursos() {
    const list = document.getElementById('recursos-list');
    const btn = document.getElementById('recursos-btn');
    
    if (!list.classList.contains('active')) {
        list.classList.add('active');
        btn.classList.add('active');
        // Ensure hours is closed
        closeHours();
    } else {
        list.classList.remove('active');
        btn.classList.remove('active');
    }
}

function closeHours() {
    const hours = document.getElementById('hours-details');
    const btn = document.getElementById('hours-btn');
    if (hours) hours.classList.remove('active');
    if (btn) btn.classList.remove('active');
}

function closeFacturacion() {
    const facturacion = document.getElementById('facturacion-details');
    const btn = document.getElementById('facturacion-btn');
    if (facturacion) facturacion.classList.remove('active');
    if (btn) btn.classList.remove('active');
}

function closeRecursos() {
    const list = document.getElementById('recursos-list');
    const btn = document.getElementById('recursos-btn');
    if (list) list.classList.remove('active');
    if (btn) btn.classList.remove('active');
}

// Dropdown Logic
function toggleDropdown() {
    const list = document.getElementById('dropdown-options');
    const header = document.querySelector('.dropdown-header');
    list.classList.toggle('active');
    header.classList.toggle('active');
}

function selectDropdownOption(val) {
    selectedOption = val;
    document.getElementById('selected-label').innerText = val;
    document.getElementById('selected-label').style.color = '#FFF';
    
    // Close dropdown
    const list = document.getElementById('dropdown-options');
    const header = document.querySelector('.dropdown-header');
    list.classList.remove('active');
    header.classList.remove('active');
}

// Urgent Toggle Logic
function toggleUrgent(checkbox) {
    const label = document.getElementById('urgent-label');
    if (checkbox.checked) {
        label.classList.add('active');
    } else {
        label.classList.remove('active');
    }
}

// Close dropdown on outside click
document.addEventListener('click', (e) => {
    if (!e.target.closest('.custom-dropdown')) {
        const list = document.getElementById('dropdown-options');
        const header = document.querySelector('.dropdown-header');
        if (list) list.classList.remove('active');
        if (header) header.classList.remove('active');
    }
});

function handleForm(e) {
    e.preventDefault();
    if (!selectedOption) {
        alert('Por favor, seleccioná un tipo de gestión.');
        return;
    }
    
    document.getElementById('request-form').style.display = 'none';
    document.getElementById('success-message').style.display = 'block';
    
    const fileInput = document.getElementById('file-upload');
    let fileName = 'Ninguno';
    if (fileInput.files && fileInput.files.length > 0) {
        if (fileInput.files.length === 1) {
            fileName = fileInput.files[0].name;
        } else {
            fileName = Array.from(fileInput.files).map(f => f.name).join(', ');
        }
    }

    console.log('Tehuentec Submission:', {
        type: selectedOption,
        user: document.getElementById('input-nombre').value,
        empresa: document.getElementById('input-empresa').value,
        email: document.getElementById('input-email').value,
        urgent: document.getElementById('is-urgent').checked,
        details: document.getElementById('input-detalle').value,
        attachment: fileName
    });
}

function resetForm() {
    document.getElementById('request-form').reset();
    document.getElementById('request-form').style.display = 'block';
    document.getElementById('success-message').style.display = 'none';
    document.getElementById('file-name-display').innerText = 'Adjuntar archivos (Opcional)';
    
    // Reset Urgent
    const urgentCheckbox = document.getElementById('is-urgent');
    if (urgentCheckbox) {
        urgentCheckbox.checked = false;
        toggleUrgent(urgentCheckbox);
    }

    // Reset Dropdown
    document.getElementById('selected-label').innerText = 'Motivo de Gestión';
    document.getElementById('selected-label').style.color = 'var(--text-secondary)';
    selectedOption = null;
}

function updateFileName(input) {
    const display = document.getElementById('file-name-display');
    if (input.files && input.files.length > 0) {
        if (input.files.length === 1) {
            display.innerText = input.files[0].name;
        } else {
            display.innerText = `${input.files.length} archivos seleccionados`;
        }
        display.style.color = 'var(--accent-green)';
    } else {
        display.innerText = 'Adjuntar archivos (Opcional)';
        display.style.color = 'var(--text-muted)';
    }
}

// FAQ Logic
function renderFAQ(items) {
    const list = document.getElementById('faq-list');
    list.innerHTML = '';
    
    if (items.length === 0) {
        list.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 40px;">Sin resultados encontrados.</p>';
        return;
    }

    items.forEach((faq, index) => {
        const isFirst = index === 0;
        const item = document.createElement('div');
        item.style.marginBottom = '15px';
        item.innerHTML = `
            <div class="faq-header" onclick="toggleFAQ(${faq.id})">
                <h4>${faq.question}</h4>
                <div class="faq-icon-box">
                    <ion-icon name="chevron-down-outline" id="faq-icon-${faq.id}" style="transform: ${isFirst ? 'rotate(180deg)' : 'rotate(0deg)'};"></ion-icon>
                </div>
            </div>
            <div id="faq-content-${faq.id}" style="display: ${isFirst ? 'block' : 'none'}; padding: 15px 0 5px;">
                <p style="font-size: 0.85rem; color: var(--accent-green); font-weight: 700; margin-bottom: 8px;">${faq.short}</p>
                <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6;">${faq.long}</p>
            </div>
        `;
        list.appendChild(item);
    });
}

function toggleFAQ(id) {
    const content = document.getElementById(`faq-content-${id}`);
    const icon = document.getElementById(`faq-icon-${id}`);
    
    if (content.style.display === 'none') {
        content.style.display = 'block';
        icon.style.transform = 'rotate(180deg)';
        icon.style.transition = 'transform 0.3s ease';
    } else {
        content.style.display = 'none';
        icon.style.transform = 'rotate(0deg)';
    }
}

// Roadmap Animation
function initRoadmapAnimation() {
    const steps = document.querySelectorAll('.roadmap-step');
    const container = document.querySelector('.roadmap-container');
    
    if (!container || steps.length === 0) return;

    const observerOptions = {
        threshold: 0.05,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Staggered reveal
                steps.forEach((step, index) => {
                    setTimeout(() => {
                        step.classList.add('visible');
                    }, index * 150);
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    observer.observe(container);
    
    // Safety check: if the page is short or container is already visible
    setTimeout(() => {
        const rect = container.getBoundingClientRect();
        if (rect.top < window.innerHeight && !steps[0].classList.contains('visible')) {
            steps.forEach((step, index) => {
                setTimeout(() => {
                    step.classList.add('visible');
                }, index * 150);
            });
            observer.unobserve(container);
        }
    }, 500);
}

// Rating Modal Logic
let currentRating = 0;

function openRatingModal() {
    const modal = document.getElementById('modal-rating');
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('active');
        document.body.classList.add('modal-open');
    }, 10);
}

function closeRatingModal() {
    const modal = document.getElementById('modal-rating');
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
    setTimeout(() => {
        modal.style.display = 'none';
        resetRating();
    }, 300);
}

function closeRatingModalOnOutsideClick(e) {
    if (e.target.classList.contains('modal-overlay')) {
        closeRatingModal();
    }
}

function selectRating(rating) {
    currentRating = rating;
    const stars = document.querySelectorAll('#star-rating-container ion-icon');
    
    stars.forEach((star, index) => {
        if (index < rating) {
            star.setAttribute('name', 'star');
            star.classList.add('active');
        } else {
            star.setAttribute('name', 'star-outline');
            star.classList.remove('active');
        }
    });

    const commentBox = document.getElementById('rating-comments');
    const submitBtn = document.getElementById('submit-rating-btn');
    
    commentBox.style.display = 'block';
    submitBtn.style.opacity = '1';
    submitBtn.style.pointerEvents = 'auto';
}

function submitRating() {
    const comment = document.getElementById('rating-comments').value;
    console.log('Rating Submitted:', { rating: currentRating, comment: comment });
    
    document.getElementById('star-rating-container').style.display = 'none';
    document.getElementById('rating-comments').style.display = 'none';
    document.getElementById('submit-rating-btn').style.display = 'none';
    
    const h3 = document.querySelector('#modal-rating h3');
    const p = document.querySelector('#modal-rating p');
    if(h3) h3.style.display = 'none';
    if(p) p.style.display = 'none';

    document.getElementById('rating-success').style.display = 'block';
    
    setTimeout(() => {
        closeRatingModal();
    }, 2500);
}

function resetRating() {
    currentRating = 0;
    const stars = document.querySelectorAll('#star-rating-container ion-icon');
    stars.forEach(star => {
        star.setAttribute('name', 'star-outline');
        star.classList.remove('active');
    });
    
    document.getElementById('star-rating-container').style.display = 'flex';
    document.getElementById('rating-comments').style.display = 'none';
    document.getElementById('rating-comments').value = '';
    
    const h3 = document.querySelector('#modal-rating h3');
    const p = document.querySelector('#modal-rating p');
    if(h3) h3.style.display = 'block';
    if(p) p.style.display = 'block';

    const submitBtn = document.getElementById('submit-rating-btn');
    submitBtn.style.display = 'flex';
    submitBtn.style.opacity = '0.5';
    submitBtn.style.pointerEvents = 'none';
    
    document.getElementById('rating-success').style.display = 'none';
}


document.addEventListener('DOMContentLoaded', () => {
    const titleEl = document.getElementById('rotating-title');
    if(titleEl) {
        const phrases = ['Marketing estratégico', 'Resultados reales', 'Presencia global', '+20 Años de experiencia'];
        let currentIndex = 0;
        setInterval(() => {
            // Fade out and slide left
            titleEl.style.transition = 'all 0.5s ease';
            titleEl.style.opacity = '0';
            titleEl.style.transform = 'translateX(-30px)';
            
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % phrases.length;
                titleEl.innerText = phrases[currentIndex];
                
                // Teleport to right side invisibly
                titleEl.style.transition = 'none';
                titleEl.style.transform = 'translateX(30px)';
                
                // Force reflow
                void titleEl.offsetWidth;
                
                // Fade in and slide to center
                titleEl.style.transition = 'all 0.5s ease';
                titleEl.style.opacity = '1';
                titleEl.style.transform = 'translateX(0)';
            }, 500);
        }, 3000);
    }
});

// FAB Inversion Logic on Footer Overlap
window.addEventListener('scroll', () => {
    const footer = document.querySelector('.footer-branded');
    const fab = document.querySelector('.fab-rating');
    if (footer && fab) {
        const footerRect = footer.getBoundingClientRect();
        const fabRect = fab.getBoundingClientRect();
        if (fabRect.bottom > footerRect.top) {
            fab.classList.add('inverted');
        } else {
            fab.classList.remove('inverted');
        }
    }
});


// ===== ONBOARDING TOUR =====
const tourSteps = [
    { target: 'servicios-btn',      description: 'Conocé todos tus servicios contratados y accedé al panel de administración desde aquí.', position: 'bottom' },
    { target: 'facturacion-btn',    description: 'Consultá tus facturas y el estado de cuenta de manera centralizada.', position: 'bottom' },
    { target: 'nueva-gestion-btn', description: 'Generá consultas, solicitudes de cambios y reportes de manera rápida y autogestionada.', position: 'bottom' },
    { target: 'recursos-btn-link', description: 'Tutoriales, guías y documentación que armamos especialmente para acompañarte.', position: 'bottom' },
    { target: 'hours-btn',         description: 'Conocé nuestros horarios de soporte según el país en el que te encontrés.', position: 'bottom' },
    { target: 'faqs-btn',          description: 'Encontrá respuestas a las preguntas más frecuentes de nuestros clientes.', position: 'bottom' },
    { target: 'fab-btn',           description: 'Dejanos tu feedback para seguir mejorando. Tu opinión es muy importante para nosotros.', position: 'left' }
];

let tourCurrentStep = 0;

function tourStart() {
    if (localStorage.getItem('tht-tour-done') === '1') return;
    tourCurrentStep = 0;
    tourShowStep(tourCurrentStep);
}

let tourLastEl = null;

function tourShowStep(index) {
    const step = tourSteps[index];
    const el = document.getElementById(step.target);
    if (!el) { tourNext(); return; }
    if (tourLastEl) { tourLastEl.style.position = ''; tourLastEl.style.zIndex = ''; }
    tourLastEl = el;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => {
        const rect = el.getBoundingClientRect();
        const pad = 8;
        const hl = document.getElementById('tour-highlight');
        hl.style.display = 'block';
        hl.style.top    = (rect.top    - pad) + 'px';
        hl.style.left   = (rect.left   - pad) + 'px';
        hl.style.width  = (rect.width  + pad * 2) + 'px';
        hl.style.height = (rect.height + pad * 2) + 'px';
        const tt = document.getElementById('tour-tooltip');
        tt.style.display = 'block';
        document.getElementById('tour-step-count').textContent = 'Paso ' + (index + 1) + ' de ' + tourSteps.length;
        document.getElementById('tour-desc').textContent  = step.description;
        const prevBtn = document.getElementById('tour-prev'); if (prevBtn) prevBtn.style.display = index === 0 ? 'none' : 'block';
        document.getElementById('tour-next').textContent   = index === tourSteps.length - 1 ? 'Finalizar 🎉' : 'Siguiente →';
        const ttW = 300, ttH = 140;
        const vw = window.innerWidth, vh = window.innerHeight;
        let top, left;
        if (step.position === 'bottom') {
            top  = rect.bottom + pad + 12;
            left = rect.left + rect.width / 2 - ttW / 2;
        } else if (step.position === 'top') {
            top  = rect.top - ttH - pad - 12;
            left = rect.left + rect.width / 2 - ttW / 2;
        } else {
            top  = rect.top + rect.height / 2 - ttH / 2;
            left = rect.left - ttW - pad - 12;
        }
        left = Math.max(12, Math.min(left, vw - ttW - 12));
        top  = Math.max(12, Math.min(top,  vh - ttH - 12));
        tt.style.top  = top  + 'px';
        tt.style.left = left + 'px';
    }, 350);
}

function tourNext() {
    if (tourCurrentStep < tourSteps.length - 1) {
        tourCurrentStep++;
        tourShowStep(tourCurrentStep);
    } else {
        tourEnd();
    }
}

function tourPrev() {
    if (tourCurrentStep > 0) {
        tourCurrentStep--;
        tourShowStep(tourCurrentStep);
    }
}

function tourSkip() { tourEnd(); }

function tourEnd() {
    document.getElementById('tour-overlay').style.display   = 'none';
    document.getElementById('tour-highlight').style.display = 'none';
    document.getElementById('tour-tooltip').style.display   = 'none';
    localStorage.setItem('tht-tour-done', '1');
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(tourStart, 800);
});





