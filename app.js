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

const timezones = [
    { country: 'Colombia', offset: -2 },
    { country: 'Miami (EE.UU.)', offset: -2 },
    { country: 'Houston (EE.UU.)', offset: -3 },
    { country: 'Rep. Dominicana', offset: -1 },
    { country: 'Perú', offset: -2 },
    { country: 'España', offset: 4 },
    { country: 'Alemania', offset: 4 }
];

// Initialize
function initApp() {
    updateTimezones();
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

// Timezone Logic
function updateTimezones() {
    const list = document.getElementById('timezone-list');
    if(!list) return;
    
    const arHoursStart = 8;
    const arHoursEnd = 18;

    timezones.forEach(tz => {
        const start = (arHoursStart + tz.offset + 24) % 24;
        const end = (arHoursEnd + tz.offset + 24) % 24;
        
        const item = document.createElement('div');
        item.className = 'timezone-item';
        item.innerHTML = `
            <span>${tz.country}</span>
            <span style="font-weight: 700; color: #FFF;">${start}:00 - ${end}:00 hs</span>
        `;
        list.appendChild(item);
    });
}

function toggleHours() {
    const details = document.getElementById('hours-details');
    const btn = document.getElementById('hours-btn');
    
    if (!details.classList.contains('active')) {
        details.classList.add('active');
        btn.classList.add('active');
        // Ensure resources is closed
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

function closeRecursos() {
    const list = document.getElementById('recursos-list');
    const btn = document.getElementById('recursos-btn');
    if (list) list.classList.remove('active');
    if (btn) btn.classList.remove('active');
}

// Form Logic
let selectedOption = null;

function selectOption(btn) {
    const btns = document.querySelectorAll('.option-btn');
    btns.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedOption = btn.innerText;
}

function handleForm(e) {
    e.preventDefault();
    if (!selectedOption) {
        alert('Por favor, selecciona un tipo de gestión.');
        return;
    }
    
    document.getElementById('request-form').style.display = 'none';
    document.getElementById('success-message').style.display = 'block';
    
    const fileInput = document.getElementById('file-upload');
    const fileName = fileInput.files && fileInput.files[0] ? fileInput.files[0].name : 'Ninguno';

    console.log('Tehuentec Submission:', {
        type: selectedOption,
        user: e.target[0].value,
        email: e.target[1].value,
        details: e.target[2].value,
        attachment: fileName
    });
}

function resetForm() {
    document.getElementById('request-form').reset();
    document.getElementById('request-form').style.display = 'block';
    document.getElementById('success-message').style.display = 'none';
    document.getElementById('file-name-display').innerText = 'Adjuntar documento (Opcional)';
    const btns = document.querySelectorAll('.option-btn');
    btns.forEach(b => b.classList.remove('selected'));
    selectedOption = null;
}

function updateFileName(input) {
    const display = document.getElementById('file-name-display');
    if (input.files && input.files[0]) {
        display.innerText = input.files[0].name;
        display.style.color = 'var(--accent-green)';
    } else {
        display.innerText = 'Adjuntar documento (Opcional)';
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

function filterFAQ() {
    const query = document.getElementById('faq-search').value.toLowerCase();
    const filtered = faqData.filter(f => 
        f.question.toLowerCase().includes(query) || 
        f.long.toLowerCase().includes(query)
    );
    renderFAQ(filtered);
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
