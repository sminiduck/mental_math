//about.js
import "../components/question-display.js";
import "../components/virtual-keyboard.js";
import WorkSheet from "../lib/worksheet.js";

class AboutPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.worksheet = new WorkSheet(3);
        this.problem = this.worksheet.dequeueProblem();
    }

    connectedCallback() {
        const template = /*html*/`
            <h1>Calc Page</h1>
            <question-display></question-display>
            <virtual-keyboard></virtual-keyboard>
        `;
        this.shadowRoot.innerHTML = template;

        const style = document.createElement("style");
        style.textContent = /*css*/`
            h1 {
                font-size: 2rem;
                color: green;
            }
        `;
        this.shadowRoot.append(style);
        this.addEventListeners();
        this.handleDisplayChange(this.problem.info, this.problem.question, '');
    }

    addEventListeners() {
        document.addEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = (e) => {
        if (e.key !== 'Enter') return;
        if (this.problem == null) return;
        const $display = this.shadowRoot.querySelector("question-display");
        const userAns = $display.getAttribute('user-ans');
        if (this.problem.isRight(userAns)) {
            console.log('정답입니다.');
            this.problem = this.worksheet.dequeueProblem();
            if (this.problem == null) {
                console.log('테스트 종료');
                return;
            }
            this.handleDisplayChange(this.problem.info, this.problem.question, '');
        } else {
            console.log('오답입니다.');
        }
    }

    handleDisplayChange = (num='x', question='', userAns='') => {
        const $display = this.shadowRoot.querySelector("question-display");
        $display.setAttribute('num', num);
        $display.setAttribute('question', question);
        $display.setAttribute('user-ans', userAns);
    }
}

customElements.define("about-page", AboutPage);
