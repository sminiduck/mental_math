// virtual-keyboard.js
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
  
    render()
    {
      const style = /*css*/`
        .keyboard {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0px;
          margin: 10px 0;
        }
        .key {
          padding: 15px;
          text-align: center;
          background: #ddd;
          border: 1px solid #ccc;
          cursor: pointer;
          font-size: 18px;
        }
        .key:hover {
          background: #bbb;
        }
        .key:active {
          background: #999;
        }
        .key[data-key="Delete"] {
            background-color: #d32f2f;
            grid-column: span 2;
        }
      `;
  
      const template = /*html*/`
        <style>${style}</style>
        <div class="keyboard">
          ${this.keys.map(key => `<button class="key" data-key="${key}">${key}</button>`).join('')}
        </div>
      `;
  
      // Shadow Root에 템플릿 삽입
      this.shadowRoot.innerHTML = template;
  
      // 이벤트 핸들러 추가
      this.addEventListeners();
    }
  
    // 이벤트 핸들러 정의
    addEventListeners()
    {
      const buttons = this.shadowRoot.querySelectorAll('.key');
      buttons.forEach(button => {
        button.addEventListener('click', (event) => {
          const key = event.target.dataset.key;
          this.sendKeyEvent(key);
        });
      });
    }

    sendKeyEvent(vkey)
    {
      const keyboardEvent = new KeyboardEvent('keydown', { key: vkey });
      document.dispatchEvent(keyboardEvent);
    }


  }
  
  // 사용자 정의 요소 등록
  customElements.define('virtual-keyboard', VirtualKeyboard);