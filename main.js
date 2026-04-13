// ==========================================
// Fluent Reveal Effect Library
// ==========================================

class FluentReveal {
    constructor(selector = '.fluent-tile') {
        this.selector = selector;
        this.init();
    }

    init() {
        this.injectStyles();
        this.addEventListeners();
    }

    injectStyles() {
        // Проверяем, не добавлены ли уже стили, чтобы избежать дублей
        if (document.getElementById('fluent-reveal-styles')) return;

        const style = document.createElement('style');
        style.id = 'fluent-reveal-styles';
        style.innerHTML = `
            ${this.selector} {
                position: relative;
                overflow: hidden;
                box-sizing: border-box;
                cursor: default;
                user-select: none;
                transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.2s ease;
                --mouse-x: 0px;
                --mouse-y: 0px;
            }

            ${this.selector}:active {
                transform: scale(0.96);
            }

            /* Внутренний фонарик */
            ${this.selector}::before {
                content: '';
                position: absolute;
                inset: 0;
                background: radial-gradient(
                    circle 120px at var(--mouse-x) var(--mouse-y), 
                    rgba(255, 255, 255, 0.1), 
                    transparent
                );
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.3s ease;
                z-index: 1;
            }

            /* Обводка (Reveal Border) */
            ${this.selector}::after {
                content: '';
                position: absolute;
                inset: 0;
                padding: 1.5px;
                background: radial-gradient(
                    circle 100px at var(--mouse-x) var(--mouse-y), 
                    rgba(255, 255, 255, 0.25), 
                    transparent
                );
                -webkit-mask: linear-gradient(#fff, #fff) content-box, linear-gradient(#fff, #fff);
                -webkit-mask-composite: xor;
                mask-composite: exclude;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.3s ease;
                z-index: 1;
            }

            body:hover ${this.selector}::after {
                opacity: 1;
            }

            ${this.selector}:hover::before {
                opacity: 1;
            }

            ${this.selector}:hover::after {
                background: radial-gradient(
                    circle 100px at var(--mouse-x) var(--mouse-y), 
                    rgba(255, 255, 255, 0.6), 
                    transparent
                );
            }

            ${this.selector}:active::before {
                background: radial-gradient(
                    circle 120px at var(--mouse-x) var(--mouse-y), 
                    rgba(255, 255, 255, 0.2), 
                    transparent
                );
            }

            /* Поднятие контента над эффектами */
            ${this.selector} > * {
                position: relative;
                z-index: 2;
            }
        `;
        document.head.appendChild(style);
    }

    addEventListeners() {
        document.addEventListener('mousemove', (e) => {
            const tiles = document.querySelectorAll(this.selector);
            tiles.forEach(tile => {
                const rect = tile.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                tile.style.setProperty('--mouse-x', `${x}px`);
                tile.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    }
}

// Автозапуск при загрузке документа
document.addEventListener('DOMContentLoaded', () => {
    new FluentReveal('.fluent-tile');
});
