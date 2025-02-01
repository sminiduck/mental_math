//about.js
import "../components/question-display.js";
import "../components/virtual-keyboard.js";

class AboutPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = /*html*/`
        <h1>About Page</h1>
        <question-display></question-display>
        <question-display></question-display>
        <virtual-keyboard></virtual-keyboard>
        `;
    }
}

customElements.define("about-page", AboutPage);
