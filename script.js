// Configurações do Meta Pixel
const META_PIXEL_ID = 'SEU_PIXEL_ID';

// Função para trackear eventos no Meta Pixel
function trackEvent(eventName, eventData = {}) {
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, eventData);
        console.log(`Evento Meta Pixel: ${eventName}`, eventData);
    }
}

// Função para trackear eventos customizados
function trackCustomEvent(eventName, eventData = {}) {
    if (typeof fbq !== 'undefined') {
        fbq('trackCustom', eventName, eventData);
        console.log(`Evento Customizado Meta Pixel: ${eventName}`, eventData);
    }
}

// ==================== CONTADOR DE TEMPO REGRESSIVO ====================
function initCountdown() {
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    // Definir tempo aleatório entre 2h e 6h
    let timeRemaining = localStorage.getItem('shadowflix_countdown');
    
    if (!timeRemaining) {
        const randomHours = Math.floor(Math.random() * 4) + 2; // 2-6 horas
        const randomMinutes = Math.floor(Math.random() * 60);
        timeRemaining = (randomHours * 3600) + (randomMinutes * 60);
        localStorage.setItem('shadowflix_countdown', timeRemaining);
        localStorage.setItem('shadowflix_countdown_start', Date.now());
    } else {
        const startTime = parseInt(localStorage.getItem('shadowflix_countdown_start'));
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        timeRemaining = Math.max(0, parseInt(timeRemaining) - elapsed);
        localStorage.setItem('shadowflix_countdown', timeRemaining);
        localStorage.setItem('shadowflix_countdown_start', Date.now());
    }
    
    const countdownInterval = setInterval(() => {
        if (timeRemaining <= 0) {
            clearInterval(countdownInterval);
            // Reiniciar contador
            localStorage.removeItem('shadowflix_countdown');
            localStorage.removeItem('shadowflix_countdown_start');
            initCountdown();
            return;
        }
        
        timeRemaining--;
        localStorage.setItem('shadowflix_countdown', timeRemaining);
        
        const hours = Math.floor(timeRemaining / 3600);
        const minutes = Math.floor((timeRemaining % 3600) / 60);
        const seconds = timeRemaining % 60;
        
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }, 1000);
}

// ==================== CONTADOR DE VAGAS DINÂMICO ====================
function initSpotsCounter() {
    const spotsEl = document.getElementById('spotsRemaining');
    
    let spotsRemaining = localStorage.getItem('shadowflix_spots');
    
    if (!spotsRemaining) {
        spotsRemaining = Math.floor(Math.random() * 30) + 35; // 35-65 vagas
        localStorage.setItem('shadowflix_spots', spotsRemaining);
        localStorage.setItem('shadowflix_spots_update', Date.now());
    }
    
    spotsEl.textContent = spotsRemaining;
    
    // Diminuir vagas aleatoriamente
    setInterval(() => {
        const lastUpdate = parseInt(localStorage.getItem('shadowflix_spots_update'));
        const timeSinceUpdate = Date.now() - lastUpdate;
        
        // A cada 30-90 segundos, diminuir 1 vaga
        if (timeSinceUpdate > (Math.random() * 60000 + 30000)) {
            let current = parseInt(localStorage.getItem('shadowflix_spots'));
            if (current > 10) {
                current--;
                localStorage.setItem('shadowflix_spots', current);
                localStorage.setItem('shadowflix_spots_update', Date.now());
                
                // Animação de atualização
                spotsEl.style.transform = 'scale(1.3)';
                spotsEl.style.color = '#ff0000';
                setTimeout(() => {
                    spotsEl.textContent = current;
                    spotsEl.style.transform = 'scale(1)';
                    setTimeout(() => {
                        spotsEl.style.color = '';
                    }, 300);
                }, 200);
            }
        }
    }, 5000);
}

// ==================== CONTADOR DE MEMBROS DINÂMICO ====================
function initMemberCounter() {
    const memberCountEl = document.getElementById('memberCount');
    const todayJoinedEl = document.getElementById('todayJoined');
    
    // Valor base armazenado
    let baseMemberCount = localStorage.getItem('shadowflix_base_members');
    if (!baseMemberCount) {
        baseMemberCount = 12847;
        localStorage.setItem('shadowflix_base_members', baseMemberCount);
    } else {
        baseMemberCount = parseInt(baseMemberCount);
    }
    
    // Animação inicial
    animateCounterTo(memberCountEl, baseMemberCount);
    
    // Variação aleatória a cada 10-20 segundos
    setInterval(() => {
        const variation = Math.floor(Math.random() * 5) - 2; // -2 a +2
        baseMemberCount += variation;
        
        if (baseMemberCount < 12800) baseMemberCount = 12800;
        if (baseMemberCount > 13000) baseMemberCount = 13000;
        
        localStorage.setItem('shadowflix_base_members', baseMemberCount);
        animateCounterTo(memberCountEl, baseMemberCount);
    }, Math.random() * 10000 + 10000);
    
    // Contador de hoje
    let todayCount = parseInt(localStorage.getItem('shadowflix_today_joined')) || 453;
    todayJoinedEl.textContent = `+${todayCount}`;
    
    // Incrementar pessoas que entraram hoje
    setInterval(() => {
        if (Math.random() > 0.3) { // 70% de chance
            todayCount++;
            localStorage.setItem('shadowflix_today_joined', todayCount);
            todayJoinedEl.textContent = `+${todayCount}`;
            
            // Animação
            todayJoinedEl.style.transform = 'scale(1.2)';
            setTimeout(() => {
                todayJoinedEl.style.transform = 'scale(1)';
            }, 300);
        }
    }, Math.random() * 15000 + 10000);
}

function animateCounterTo(element, target) {
    const current = parseInt(element.textContent.replace(/\./g, ''));
    if (current === target) return;
    
    const duration = 800;
    const steps = 20;
    const increment = (target - current) / steps;
    let step = 0;
    
    const timer = setInterval(() => {
        step++;
        const value = Math.floor(current + (increment * step));
        element.textContent = value.toLocaleString('pt-BR');
        
        if (step >= steps) {
            clearInterval(timer);
            element.textContent = target.toLocaleString('pt-BR');
        }
    }, duration / steps);
}

// ==================== NOTIFICAÇÕES DE ENTRADA AO VIVO ====================
const userNames = [
    'Carlos Silva', 'Ana Costa', 'Pedro Santos', 'Mariana Oliveira', 
    'João Almeida', 'Juliana Lima', 'Rafael Souza', 'Beatriz Rocha',
    'Lucas Fernandes', 'Camila Martins', 'Bruno Cardoso', 'Amanda Reis',
    'Gabriel Mendes', 'Larissa Ribeiro', 'Felipe Araújo', 'Thiago Barros',
    'Isabela Dias', 'Rodrigo Castro', 'Fernanda Pires', 'Matheus Gomes',
    'Carolina Moura', 'Diego Monteiro', 'Patrícia Cunha', 'Gustavo Lopes'
];

const userAvatars = ['👤', '👨', '👩', '🧑', '👱', '🧔', '👨‍💼', '👩‍💼', '🧑‍💼'];

function showLiveNotification() {
    const container = document.getElementById('liveNotifications');
    const name = userNames[Math.floor(Math.random() * userNames.length)];
    const avatar = userAvatars[Math.floor(Math.random() * userAvatars.length)];
    const city = ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Belo Horizonte', 'Curitiba', 'Porto Alegre'][Math.floor(Math.random() * 6)];
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-avatar">${avatar}</div>
        <div class="notification-content">
            <div class="notification-name">${name}</div>
            <div class="notification-action">Acabou de entrar • ${city}</div>
        </div>
        <div class="notification-time">agora</div>
    `;
    
    container.appendChild(notification);
    
    // Remover após 5 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 5000);
}

// Adicionar animação de saída
const slideOutStyle = document.createElement('style');
slideOutStyle.textContent = `
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(slideOutStyle);

// Mostrar notificação a cada 8-15 segundos
function startLiveNotifications() {
    showLiveNotification();
    
    setInterval(() => {
        showLiveNotification();
    }, Math.random() * 7000 + 8000);
}

// ==================== ELEMENTOS DOM ====================
const ctaButton = document.getElementById('ctaButton');

// ==================== INICIALIZAÇÃO ====================
window.addEventListener('load', () => {
    // Iniciar todos os contadores e sistemas
    initCountdown();
    initSpotsCounter();
    initMemberCounter();
    
    // Aguardar 3 segundos antes de mostrar primeira notificação
    setTimeout(startLiveNotifications, 3000);
    
    // Track de visualização da página
    trackCustomEvent('PreSellPageView', {
        page: 'Shadow Flix',
        timestamp: new Date().toISOString()
    });
});

// ==================== TRACK DE CLIQUE NO BOTÃO CTA ====================
ctaButton.addEventListener('click', function(e) {
    // Adiciona efeito visual de clique
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = '';
    }, 150);
    
    // Track do clique
    trackCustomEvent('CTAButtonClicked', {
        button_text: 'GARANTIR ACESSO AGORA',
        spots_remaining: document.getElementById('spotsRemaining').textContent,
        timestamp: new Date().toISOString()
    });
    
    // Track de conversão - Lead
    trackEvent('Lead', {
        content_name: 'Shadow Flix Access',
        content_category: 'Premium Content',
        value: 1.00,
        currency: 'BRL'
    });
});

// ==================== ANIMAÇÕES EXTRAS ====================
// Efeito de hover nos benefícios
const benefitItems = document.querySelectorAll('.benefit-item');
benefitItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
    item.classList.add('fade-in-item');
});

// Adiciona animação de entrada nos benefícios
const animStyle = document.createElement('style');
animStyle.textContent = `
    .fade-in-item {
        opacity: 0;
        animation: fadeInItem 0.6s ease-out forwards;
    }
    
    @keyframes fadeInItem {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(animStyle);

// ==================== TRACK DE TEMPO NA PÁGINA ====================
let timeOnPage = 0;
const timeInterval = setInterval(() => {
    timeOnPage += 5;
    
    // Track a cada 30 segundos
    if (timeOnPage % 30 === 0) {
        trackCustomEvent('TimeOnPage', {
            seconds: timeOnPage,
            timestamp: new Date().toISOString()
        });
    }
}, 5000);

// Track quando o usuário sai da página
window.addEventListener('beforeunload', function() {
    clearInterval(timeInterval);
    trackCustomEvent('PageExit', {
        timeSpent: timeOnPage,
        spotsRemaining: document.getElementById('spotsRemaining').textContent
    });
});

// ==================== PREVENÇÃO DE CLIQUE DUPLO ====================
let isClicking = false;
ctaButton.addEventListener('click', function(e) {
    if (isClicking) {
        e.preventDefault();
        return;
    }
    isClicking = true;
    setTimeout(() => {
        isClicking = false;
    }, 1000);
});

// ==================== TRACKING DE SCROLL PARA PIXEL ====================
// Quem rola = interesse | Quem clica depois de rolar = ouro pro pixel
let hasScrolled = false;
let scrollDepth = 0;

window.addEventListener('scroll', () => {
    scrollPosition = window.pageYOffset;
    const logoContainer = document.querySelector('.logo-container');
    if (logoContainer) {
        logoContainer.style.transform = `translateY(${scrollPosition * 0.1}px)`;
    }
    
    // Calcular profundidade do scroll
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const currentScrollDepth = Math.round((scrollTop / (documentHeight - windowHeight)) * 100);
    
    // Registrar primeiro scroll (interesse)
    if (!hasScrolled && scrollTop > 50) {
        hasScrolled = true;
        trackCustomEvent('UserScrolled', {
            message: 'Usuário demonstrou interesse ao rolar',
            depth: currentScrollDepth
        });
        console.log('📊 Pixel: Usuário rolou = interesse registrado');
    }
    
    // Tracking de profundidade de scroll
    if (currentScrollDepth >= 25 && scrollDepth < 25) {
        scrollDepth = 25;
        trackCustomEvent('ScrollDepth', { depth: '25%' });
    } else if (currentScrollDepth >= 50 && scrollDepth < 50) {
        scrollDepth = 50;
        trackCustomEvent('ScrollDepth', { depth: '50%' });
    } else if (currentScrollDepth >= 75 && scrollDepth < 75) {
        scrollDepth = 75;
        trackCustomEvent('ScrollDepth', { depth: '75%' });
    } else if (currentScrollDepth >= 90 && scrollDepth < 90) {
        scrollDepth = 90;
        trackCustomEvent('ScrollDepth', { depth: '90%' });
    }
});

// Track clique no CTA - especialmente valioso se o usuário já rolou
ctaButton.addEventListener('click', function() {
    if (hasScrolled) {
        trackCustomEvent('GoldClick', {
            message: 'Ouro pro pixel: Usuário rolou E clicou',
            scrollDepth: scrollDepth,
            timeOnPage: timeOnPage
        });
        console.log('✨ Pixel: OURO - Usuário rolou e clicou!');
    } else {
        trackEvent('InitiateCheckout');
        console.log('📊 Pixel: Clique direto sem scroll');
    }
});

console.log('🎬 Shadow Flix - Pre-sell page loaded successfully!');
console.log('⚠️ Lembre-se de substituir SEU_PIXEL_ID pelo seu ID do Meta Pixel');
console.log('💎 Otimização de Pixel ativa: Tracking de scroll + cliques');

