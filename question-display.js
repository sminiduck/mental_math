class QuestionDisplay extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    render() {
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
                    <div class="user-ans"></div>
                </div>
            </div>
        `;

        this.shadowRoot.innerHTML = template;

        const userAnsElement = this.shadowRoot.querySelector('.user-ans');
        const functionKeys = ['Backspace', 'Delete'];
        const numberKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

        document.addEventListener('keydown', (e) => {
            if (functionKeys.includes(e.key)) {
                if (e.key === 'Delete') {
                    userAnsElement.textContent = '';
                }
                if (e.key === 'Backspace') {
                    userAnsElement.textContent = userAnsElement.textContent.slice(0, -1);
                }
            } else if (numberKeys.includes(e.key)) {
                userAnsElement.textContent += e.key;
            }
        });
    }

    clear() {
        this.shadowRoot.querySelector('.user-ans').textContent = '';
    }

    getUserAns() {
        return this.shadowRoot.querySelector('.user-ans').textContent;
    }

    updateProblem(problem) {
        const problemInfo = this.shadowRoot.querySelector('.problem-info');
        const question = this.shadowRoot.querySelector('.question');

        problemInfo.innerHTML = problem.info;
        question.innerHTML = problem.question;
    }
    

}



customElements.define('question-display', QuestionDisplay);