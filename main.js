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
        if (document.getElementById('fluent-reveal-styles')) return;

        const style = document.createElement('style');
        style.id = 'fluent-reveal-styles';
        style.innerHTML = `
            ${this.selector} {
                position: relative;
                /* Важно: ставим прозрачный бордер, чтобы зарезервировать место под эффект */
                border: 1.5px solid transparent; 
                --mouse-x: 0px;
                --mouse-y: 0px;
                transition: transform 0.1s ease, background-color 0.2s ease;
            }

            /* Эффект свечения внутри (Hover) */
            ${this.selector}::before {
                content: '';
                position: absolute;
                inset: 0;
                background: radial-gradient(
                    circle 120px at var(--mouse-x) var(--mouse-y), 
                    rgba(255, 255, 255, 0.08), 
                    transparent
                );
                border-radius: inherit; /* Наследует скругление родителя */
                opacity: 0;
                pointer-events: none;
                z-index: 1;
            }

            /* Эффект обводки (Reveal Border) */
            ${this.selector}::after {
                content: '';
                position: absolute;
                /* Растягиваем на всю площадь, включая область бордера */
                top: -1.5px; left: -1.5px; right: -1.5px; bottom: -1.5px;
                
                background: radial-gradient(
                    circle 100px at calc(var(--mouse-x) + 1.5px) calc(var(--mouse-y) + 1.5px), 
                    rgba(255, 255, 255, 0.4), 
                    transparent
                );
                
                border-radius: inherit; /* Идеальное повторение углов */
                
                /* Магия маскировки: оставляем видимым только сам контур */
                padding: 1.5px;
                -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                -webkit-mask-composite: xor;
                mask-composite: exclude;
                
                opacity: 0;
                pointer-events: none;
                z-index: 0;
                transition: opacity 0.3s ease;
            }

            /* Состояния */
            body:hover ${this.selector}::after { opacity: 1; }
            ${this.selector}:hover::before { opacity: 1; }

            /* Усиление обводки при наведении конкретно на плитку */
            ${this.selector}:hover::after {
                background: radial-gradient(
                    circle 100px at calc(var(--mouse-x) + 1.5px) calc(var(--mouse-y) + 1.5px), 
                    rgba(255, 255, 255, 0.7), 
                    transparent
                );
            }

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
                tile.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                tile.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => new FluentReveal('.fluent-tile'));
