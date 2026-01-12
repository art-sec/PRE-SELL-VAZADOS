// Configurações do Meta Pixel
const META_PIXEL_ID = 'SEU_PIXEL_ID'; // Substitua pelo seu ID do pixel

// Elementos DOM
const ageCheckbox = document.getElementById('ageCheckbox');
const continueBtn = document.getElementById('continueBtn');

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

// Habilita/desabilita o botão baseado no checkbox
ageCheckbox.addEventListener('change', function() {
    continueBtn.disabled = !this.checked;
    
    if (this.checked) {
        // Track quando o usuário marca a caixa
        trackCustomEvent('AgeConfirmed', {
            action: 'checkbox_checked',
            timestamp: new Date().toISOString()
        });
    }
});

// Função ao clicar no botão continuar
continueBtn.addEventListener('click', function() {
    if (!ageCheckbox.checked) return;
    
    // Adiciona animação de loading
    continueBtn.classList.add('loading');
    continueBtn.textContent = '';
    
    // Track do clique no botão
    trackCustomEvent('ContinueButtonClicked', {
        action: 'continue_clicked',
        timestamp: new Date().toISOString()
    });
    
    // Simula verificação (você pode adicionar lógica real aqui)
    setTimeout(() => {
        // Track de conversão - Lead
        trackEvent('Lead', {
            content_name: 'Age Verification Completed',
            content_category: 'Pre-sell',
            value: 1.00,
            currency: 'BRL'
        });
        
        // Redireciona para a próxima página ou canal do Telegram
        // SUBSTITUA A URL ABAIXO PELA SUA URL DE DESTINO
        window.location.href = 'https://t.me/SEU_CANAL_OU_BOT';
        
        // Ou se quiser abrir em nova aba:
        // window.open('https://t.me/SEU_CANAL_OU_BOT', '_blank');
    }, 1500);
});

// Track tempo na página (útil para análise)
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
        ageConfirmed: ageCheckbox.checked
    });
});

// Track scroll depth
let maxScroll = 0;
window.addEventListener('scroll', function() {
    const scrollPercentage = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    
    if (scrollPercentage > maxScroll) {
        maxScroll = scrollPercentage;
        
        if (maxScroll >= 25 && maxScroll < 50) {
            trackCustomEvent('ScrollDepth', { depth: '25%' });
        } else if (maxScroll >= 50 && maxScroll < 75) {
            trackCustomEvent('ScrollDepth', { depth: '50%' });
        } else if (maxScroll >= 75 && maxScroll < 100) {
            trackCustomEvent('ScrollDepth', { depth: '75%' });
        } else if (maxScroll >= 100) {
            trackCustomEvent('ScrollDepth', { depth: '100%' });
        }
    }
});

// Previne que o usuário envie o formulário pressionando Enter
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        if (!continueBtn.disabled) {
            continueBtn.click();
        }
    }
});

console.log('Pre-sell page loaded successfully!');
console.log('Lembre-se de substituir SEU_PIXEL_ID pelo seu ID do Meta Pixel');
