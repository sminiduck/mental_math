class HomePage extends HTMLElement {
    connectedCallback() {
        const style = /*css*/`
        body {
            display: flex;
            flex-direction: column;
            height: 100vh;
            margin: 0;
            font-family: Arial, sans-serif;
        }
        header, footer {
            background-color: #f8f9fa;
            padding: 1em;
            text-align: center;
            flex-shrink: 0;
        }
        main {
            flex: 1;
            padding: 1em;
            overflow-y: auto;
            display: flex;
            justify-content: center;
            align-items: flex-start; /* 변경된 부분 */
        }
        ul {
            list-style-type: none;
            padding: 0;
        }
        li {
            background-color: #f0f0f0;
            border: 1px solid #ccc;
            margin: 10px 0;
            width: 200px;
            padding: 40px;
            border-radius: 5px;
        }
        a {
            text-decoration: none;
            color: #007bff;
            font-size: 18px;
        }
        `;


        this.innerHTML = /*html*/`
        <style>${style}</style>
        <ul>
            <li><a href="/about" data-link>Multiplication</a></li>
            <li><a href="/about" data-link>mod7</a></li>
            <li><a href="/about" data-link>Sqrt</a></li>
        </ul>
        `;
    }
}

customElements.define("home-page", HomePage);
