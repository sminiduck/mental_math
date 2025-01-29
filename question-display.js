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
                <div class="problem">
                    <div class="problem-info"></div>
                    <div class="question"></div>
                    <div class="user-ans"></div>
                </div>
            </div>
        `;

        this.shadowRoot.innerHTML = template;
    }
}

customElements.define('question-display', QuestionDisplay);