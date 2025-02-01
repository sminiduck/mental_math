//about.js
import "../components/question-display.js";
import "../components/virtual-keyboard.js";
import WorkSheet from "../lib/worksheet.js";"../lib/worksheet.js";

class AboutPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const worksheet = new WorkSheet(3);
    }

    connectedCallback() {
        const template = /*html*/`
            <h1>Calc Page</h1>
            <button id="change">click me</button>
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
    }

    disconnectedCallback() {
        this.removeEventListeners();
    }

    addEventListeners() {
        this.shadowRoot.getElementById("change").addEventListener("click", this.handleChangeClick);
        document.addEventListener('keydown', this.handleKeyDown);
    }

    removeEventListeners() {
        this.shadowRoot.getElementById("change").removeEventListener("click", this.handleChangeClick);
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    handleChangeClick = () => {
        this.handleDisplayChange(20, "2+4=", 5);
    }

    handleKeyDown = (e) => {
        if (e.key !== 'Enter') return;
        console.log("enter");
    }

    handleDisplayChange = (num, question, userAns) => {
        let display = this.shadowRoot.querySelector("question-display");
        display.setAttribute('num', num);
        display.setAttribute('question', question);
        display.setAttribute('user-ans', userAns);
        console.log("change");
    }
}

customElements.define("about-page", AboutPage);
