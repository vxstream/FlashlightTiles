(function() {
  const STYLE_ID = 'fluent-tile-styles';
  const DEFAULT_CLASS = 'fluent-tile';

  // Проверяем, не добавлены ли уже стили
  if (document.getElementById(STYLE_ID)) return;

  // CSS-правила, основанные на переменных --mouse-x / --mouse-y
  const css = `
    .${DEFAULT_CLASS} {
      --bg-color: #000000;
      --tile-color: #121212;
      --mouse-x: 0px;
      --mouse-y: 0px;
      position: relative;
      width: 160px;
      height: 160px;
      background-color: var(--tile-color);
      color: rgba(255, 255, 255, 0.8);
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 15px;
      box-sizing: border-box;
      font-size: 13px;
      overflow: hidden;
      cursor: default;
      transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.2s ease;
      user-select: none;
      font-family: "Segoe UI", sans-serif;
    }

    .${DEFAULT_CLASS}::before {
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
    }

    .${DEFAULT_CLASS}::after {
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
    }

    body:hover .${DEFAULT_CLASS}::after {
      opacity: 1;
    }

    .${DEFAULT_CLASS}:hover {
      background-color: #1a1a1a;
      color: #fff;
    }

    .${DEFAULT_CLASS}:hover::before {
      opacity: 1;
    }

    .${DEFAULT_CLASS}:hover::after {
      background: radial-gradient(
        circle 100px at var(--mouse-x) var(--mouse-y),
        rgba(255, 255, 255, 0.6),
        transparent
      );
    }

    .${DEFAULT_CLASS}:active {
      transform: scale(0.96);
      background-color: #252525;
    }

    .${DEFAULT_CLASS}:active::before {
      background: radial-gradient(
        circle 120px at var(--mouse-x) var(--mouse-y),
        rgba(255, 255, 255, 0.2),
        transparent
      );
    }

    .${DEFAULT_CLASS} > * {
      position: relative;
      z-index: 5;
    }
  `;

  // Вставляем стили
  const styleEl = document.createElement('style');
  styleEl.id = STYLE_ID;
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // Глобальный mousemove для обновления координат на всех плитках
  document.addEventListener('mousemove', (e) => {
    const tiles = document.querySelectorAll(`.${DEFAULT_CLASS}`);
    tiles.forEach(tile => {
      const rect = tile.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      tile.style.setProperty('--mouse-x', `${x}px`);
      tile.style.setProperty('--mouse-y', `${y}px`);
    });
  });
})();
