//qestion-display.js

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
        
        const template = /*html*/`
        <style>${style}</style>
        <div class="problem">
            <span class="problem-info"></span>
            <span class="question"></span>
            <input class="user-ans" type="text" />
        </div>
        <script>
            //calc.js
            console.log('calc.js');
            document.addEventListener('DOMContentLoaded', function () {
                const worksheet = new WorkSheet(3);
                let questionDisplays = document.querySelectorAll('question-display');
                console.log(questionDisplays);
                let focusedDisplay = questionDisplays[0];
                let watingDisplay = questionDisplays[1];
                focusedDisplay.setFocused(true);
                watingDisplay.setFocused(false);
                
                function toggleDisplay() {
                    [focusedDisplay, watingDisplay] = [watingDisplay, focusedDisplay];
                    focusedDisplay.setFocused(true);
                    watingDisplay.setFocused(false);    
                }    
                
                let problem = worksheet.dequeueProblem();
                let watingProblem = worksheet.dequeueProblem();
                focusedDisplay.updateProblem(problem);
                watingDisplay.updateProblem(watingProblem);
                

                document.addEventListener('keydown', (e) => {
                    if (e.key !== 'Enter') return;

                    const userAns = focusedDisplay.getUserAns();

                    if (problem.isRight(userAns)) {
                        focusedDisplay.clear();
                        console.log('정답입니다.');

                        problem = watingProblem;
                        watingProblem = worksheet.dequeueProblem();

                        toggleDisplay();
                        watingDisplay.updateProblem(watingProblem);
                    } else {
                        console.log('오답입니다.');
                    }

                });
            });
        </script>
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