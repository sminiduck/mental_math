// virtual-keyboard.js

// Define styles
const STYLE = /*css*/`
  .keyboard {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0px;
    height: 100%;
  }
  .key {
    background: #ddd;
    border: none;
    cursor: pointer;
    font-size: 18px;
  }
  .key:hover {
    background: #bbb;
  }
  .key:active {
    background-color: #d3d3d3;
  }
  .key[data-key="Delete"] {
    background-color: #d32f2f;
    grid-column: span 2;
  }
  .key[data-key="Backspace"] {
    background-color: #f9a825;
  }
`;

// Define template
const TEMPLATE = (keys) => /*html*/`
  <div class="keyboard">
    ${keys.map(key => `<button class="key" data-key="${key}">${key}</button>`).join('')}
  </div>
`;

const createTemplate = (style, template) => /*html*/`
  <style>${style}</style>
  ${template}
`;

class VirtualKeyboard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.keys = [
      'Delete', 'Backspace',
      '7', '8', '9',
      '4', '5', '6',
      '1', '2', '3',
      '.', '0', 'Enter'
    ];

    this.render();
  }

  render() {
    // Set template and styles
    this.shadowRoot.innerHTML = createTemplate(STYLE, TEMPLATE(this.keys));

    // Add event listeners
    this.addEventListeners();
  }

  // Add event listeners
  addEventListeners() {
    const buttons = this.shadowRoot.querySelectorAll('.key');
    buttons.forEach(button => {
      button.addEventListener('click', (event) => {
        const key = event.target.dataset.key;
        this.sendKeyEvent(key);
      });
      button.addEventListener('touchstart', (event) => {
        event.preventDefault(); // Prevent mouse event from being triggered
        const key = event.target.dataset.key;
        this.sendKeyEvent(key);
      });
    });
  }

  // Send key event
  sendKeyEvent(vkey) {
    const keyboardEvent = new KeyboardEvent('keydown', { key: vkey });
    document.dispatchEvent(keyboardEvent);
  }
}

// Define custom element
customElements.define('virtual-keyboard', VirtualKeyboard);