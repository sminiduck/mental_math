//calc.js
import "../components/question-display.js";
import "../components/virtual-keyboard.js";
import WorkSheet from "../lib/worksheet.js";

class CalcPage extends HTMLElement {
    constructor() {
        super();
        this.worksheet = new WorkSheet(3);
        this.problem = this.worksheet.dequeueProblem();
    }

    connectedCallback() {
        const style = /*css*/`
        h1, a {
            font-size: 2rem;
            color: green;
        }
        `;
        const template = /*html*/`
            <style>${style}</style>
            <h1><a href="/" data-link>Calc Page</a></h1>
            <question-display></question-display>
            <virtual-keyboard></virtual-keyboard>
        `;
        this.innerHTML = template;
        this.addEventListeners();
        this.handleDisplayChange(this.problem.info, this.problem.question, '');
    }

    addEventListeners() {
        document.addEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = (e) => {
        if (e.key !== 'Enter') return;
        if (this.problem == null) return;
        
        const $display = document.querySelector("question-display");
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

    handleDisplayChange = (num = 'x', question = '', userAns = '') => {
        const $display = document.querySelector("question-display");
        $display.setAttribute('num', num);
        $display.setAttribute('question', question);
        $display.setAttribute('user-ans', userAns);
    }
}

customElements.define("calc-page", CalcPage);
