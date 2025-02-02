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
        body {
            margin: 0;
            display: flex;
            flex-direction: column;
            height: 100%;
        }
        header {
            height: 50px;
            margin: 0;
            background-color: #333;
            color: white;
        }
        main {
            margin: 0;
            display: flex;
            flex-direction: column;
        }
        .display {
            display: flex;
            height: 50vh - 50px;
            justify-content: center;
            align-items: center;
        }
        question-display {
            
        }
        virtual-keyboard {
            height: 50vh;
        }
        h1 {
            margin: 0;
        }
        `;
        const template = /*html*/`
            <style>${style}</style>
            <header>
                <h1>계산 문제</h1>
            </header>
            <main>
            <div class="display">
                <question-display></question-display>
            </div>
                <virtual-keyboard></virtual-keyboard>
            </main>
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
