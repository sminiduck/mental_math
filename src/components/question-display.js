//qestion-display.js

class QuestionDisplay extends HTMLElement {
  static get observedAttributes() {
    return ["num", "question", "user-ans"];
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });

    const template = /*html*/`
        <div class="problem">
            <div class="problem-info"></div>
            <div class="question"></div>
            <input class="user-ans" type="text" max='3' readonly>
        </div>
        `;
    this.shadowRoot.innerHTML = template;

    const style = document.createElement("style");
    style.textContent = /*css*/`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      .problem {
        height: 100%;
        padding: 10px;
        display: flex;
        align-items: center;
        font-family: Arial, sans-serif;
        background-color: #f9f9f9;
      }
      .problem-info {
        margin: 5%;
        width: 5%;
        text-align: center;
        font-size: 1.5em;
        font-weight: bold;
        color: #333;
      }
      
      .question {
        margin-left: 5%;
        width: 35%;
        text-align: right;
        font-size: 2em;
        color: #555;
      }
      
      .user-ans {
        border: none;
        background-color: #f9f9f9;
        color: #333;
        width: 50%;
        padding: 5px;
        font-size: 2em;
        border-radius: 3px;
      }

      .user-ans:focus {
        outline: none;
      }
    `;
    this.shadowRoot.append(style);

    this.$userAns = this.shadowRoot.querySelector('.user-ans');
    this.addEventListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'num':
        this.shadowRoot.querySelector('.problem-info').innerHTML = newValue;
        break;
      case 'question':
        this.shadowRoot.querySelector('.question').innerHTML = newValue;
        break;
      case 'user-ans':
        this.$userAns.value = newValue;
        break;
      default:
        break;
    }
  }

  addEventListeners() {
    const filterKeys =
      ['Backspace', 'Delete']
      + ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
      + ['-', '.'];

    document.addEventListener('keydown', (e) => {
      if(this.hasAttribute('disabled')) return;
      if (!filterKeys.includes(e.key)) return;
      switch (e.key) {
        case 'Backspace':
          this.setAttribute('user-ans', this.$userAns.value.slice(0, -1));
          break;
        case 'Delete':
          this.setAttribute('user-ans', '');
          break;
        default:
          this.setAttribute('user-ans', this.$userAns.value + String(e.key));
          break;
      }
    });
  }
}

customElements.define('question-display', QuestionDisplay);