//qestion-display.js

class QuestionDisplay extends HTMLElement {
    static get observedAttributes() {
        return ["disabled", "num", "question", "user-ans"];
    }

    constructor() {
        super();
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });

        const template = /*html*/`
        <div class="problem">
            <span class="problem-info">1</span>
            <span class="question">1+1=</span>
            <input class="user-ans" type="text" />
        </div>
        `;
        this.shadowRoot.innerHTML = template;

        const style = document.createElement("style");
        style.textContent = /*css*/`
            .problem {
                border: 1px solid #ccc;
                padding: 10px;
            }
            .problem-info {
                width: 10%;
                justify-content: space-between;
                align-items: center;
                padding: 0.5em 1em;
                margin-right: 5%;
                background-color: #f8f9fa;
                border-bottom: 1px solid #dee2e6;
            }
            
            .question {
            margin-right: 1em;
            font-size: 1.5rem;
            font-weight: bold;
            }
            
            .user-ans {
            font-size: 1.5rem;
            font-weight: bold;
            border: none;
            }

            .problem-info, .question, .user-ans {
                margin: 5px 0;
            }
        `;
        this.shadowRoot.append(style);

        this.$userAns = this.shadowRoot.querySelector('.user-ans');
        this.addEventListeners();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'disabled':
                this.$userAns.disabled = newValue;
                break;
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
            if (!filterKeys.includes(e.key)) return;
            switch (e.key) {
                case 'Backspace':
                    this.setAttribute('user-ans', this.$userAns.value.slice(0, -1));
                    break;
                case 'Delete':
                    this.setAttribute('user-ans', '');
                    break;
                default:
                    this.setAttribute('user-ans', this.$userAns.value + e.key);
                    break;
            }
        });
    }
}

customElements.define('question-display', QuestionDisplay);