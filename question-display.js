class QuestionDisplay extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
        this.userAnsElement = this.shadowRoot.querySelector('.user-ans');
        this.stateFocused = false;
        this.addEventListeners();
    }

    render()
    {
        const style = /*css*/`
            .problem-content {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            .problem {
                border: 1px solid #ccc;
                padding: 10px;
                border-radius: 5px;
            }
            .problem-info, .question, .user-ans {
                margin: 5px 0;
            }
        `;
        
        const template = /*html*/`
            <style>${style}</style>
            <div class="problem-content">
                <div class="problem">
                    <div class="problem-info"></div>
                    <div class="question"></div>
                    <input class="user-ans" type="text" />
                </div>
            </div>
        `;

        this.shadowRoot.innerHTML = template;
    }

    addEventListeners() {
        const functionKeys = ['Backspace', 'Delete'];
        const numberKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];

        document.addEventListener('keydown', (e) => {
            if (!this.stateFocused) return;
            if (functionKeys.includes(e.key)) {
                if (e.key === 'Delete') {
                    this.userAnsElement.value = '';
                }
                if (e.key === 'Backspace') {
                    this.userAnsElement.value = this.userAnsElement.value.slice(0, -1);
                }
            } else if (numberKeys.includes(e.key)) {
                this.userAnsElement.value += e.key;
            }
        });
    }

    clear() {
        this.userAnsElement.value = '';
    }

    getUserAns() {
        return this.userAnsElement.value;
    }

    setFocused(bool) {
        this.stateFocused = bool;
    }

    updateProblem(problem) {
        if (problem == null) {
            this.shadowRoot.querySelector('.problem-info').innerHTML = '';
            this.shadowRoot.querySelector('.question').innerHTML = '';
            this.userAnsElement.value = '';
            return;
        }
        const problemInfo = this.shadowRoot.querySelector('.problem-info');
        const question = this.shadowRoot.querySelector('.question');

        problemInfo.innerHTML = problem.info;
        question.innerHTML = problem.question;
    }
    

}



customElements.define('question-display', QuestionDisplay);