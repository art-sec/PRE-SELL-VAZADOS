# 🚀 Página de Pré-Venda com Meta Pixel

Esta é uma página de pré-venda profissional com confirmação de idade, totalmente integrada com o Meta Pixel (Facebook Pixel) para rastreamento avançado de conversões.

## 📋 Características

- ✅ Design moderno e responsivo
- ✅ Confirmação de idade (18+)
- ✅ Integração completa com Meta Pixel
- ✅ Rastreamento de eventos customizados
- ✅ Animações suaves
- ✅ Mobile-first design
- ✅ Otimizado para conversões

## 🎯 Eventos Rastreados pelo Meta Pixel

### Eventos Padrão:
- **PageView**: Quando a página carrega
- **Lead**: Quando o usuário confirma e clica em continuar

### Eventos Customizados:
- **AgeConfirmed**: Quando o usuário marca o checkbox
- **ContinueButtonClicked**: Quando clica no botão continuar
- **TimeOnPage**: A cada 30 segundos de permanência
- **PageExit**: Quando o usuário sai da página
- **ScrollDepth**: Profundidade de scroll (25%, 50%, 75%, 100%)

## ⚙️ Configuração

### 1. Configurar o Meta Pixel

Abra o arquivo `index.html` e substitua `SEU_PIXEL_ID` pelo seu ID do Meta Pixel:

```javascript
fbq('init', 'SEU_PIXEL_ID');
```

Também atualize no `script.js`:

```javascript
const META_PIXEL_ID = 'SEU_PIXEL_ID';
```

### 2. Configurar URL de Redirecionamento

No arquivo `script.js`, substitua a URL de destino:

```javascript
window.location.href = 'https://t.me/SEU_CANAL_OU_BOT';
```

### 3. Como Encontrar seu Meta Pixel ID

1. Acesse o [Gerenciador de Eventos do Facebook](https://business.facebook.com/events_manager)
2. Selecione seu pixel
3. O ID aparecerá no topo da página (ex: 1234567890123456)

## 📱 Testes

Para testar se o pixel está funcionando:

1. Instale a extensão [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper/) no Chrome
2. Abra a página `index.html` no navegador
3. Verifique se o ícone do Meta Pixel Helper fica verde
4. Interaja com a página e veja os eventos sendo disparados

## 🎨 Personalização

### Cores
Edite o arquivo `style.css` para alterar as cores:
- Cor principal: `#2AABEE` (azul Telegram)
- Background: `linear-gradient(135deg, #c9dae9 0%, #b8cfe0 100%)`

### Textos
Todos os textos podem ser editados diretamente no `index.html`

### Logo
O logo do Telegram está em SVG inline, pode ser substituído por sua própria logo

## 📊 Análise de Dados

No Gerenciador de Eventos do Facebook, você poderá ver:
- Número de visualizações de página
- Taxa de conversão (leads)
- Tempo médio na página
- Comportamento dos usuários
- E muito mais!

## 🚀 Deploy

### Opção 1: Hospedagem Simples
- Upload dos arquivos para qualquer hospedagem web
- Funciona com GitHub Pages, Netlify, Vercel, etc.

### Opção 2: Local
- Abra o arquivo `index.html` diretamente no navegador
- Perfeito para testes

## 📝 Estrutura de Arquivos

```
PRE-SELL VAZADOS/
│
├── index.html      # Página principal
├── style.css       # Estilos e design
├── script.js       # Lógica e integração com Meta Pixel
└── README.md       # Este arquivo
```

## ⚠️ Importante

- Nunca compartilhe seu Pixel ID publicamente
- Teste sempre antes de usar em produção
- Verifique as políticas de privacidade do Meta
- Mantenha a política de privacidade atualizada em seu site

## 🆘 Suporte

Se tiver problemas:
1. Verifique se o Pixel ID está correto
2. Verifique o console do navegador (F12) para erros
3. Use o Meta Pixel Helper para debug
4. Consulte a [documentação oficial do Meta](https://developers.facebook.com/docs/meta-pixel)

## 📄 Licença

Este projeto é de uso livre. Customize como desejar!

---

**Desenvolvido com ❤️ para otimizar suas conversões!**
