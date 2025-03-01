//home.js
import QuestionRegistry, { loadAllProblems } from "../question/index.js";

const STYLE = /*css*/`
  :root {
    --background-color: #f0f0f0;
    --card-background-color: #ffffff;
    --text-color: #333;
    --primary-color: #6200ea;
    --secondary-color: #03dac6;
    --header-footer-height: 50px;
    --border-radius: 10px;
    --box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  * {
    margin: 0;
    box-sizing: border-box;
  }
  body {
    background-color: var(--background-color);
    height: 100vh;
    font-family: 'Roboto', sans-serif;
    color: var(--text-color);
  }
  header, footer {
    background-color: var(--primary-color);
    color: white;
    height: var(--header-footer-height);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--box-shadow);
  }
  main {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 2 * var(--header-footer-height));
    padding: 1em;
  }
  .stat {
    width: 100%;
    height: 150px;
    background-color: var(--card-background-color);
    border-radius: var(--border-radius);
    margin-bottom: 3em;
    box-shadow: var(--box-shadow);
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    width: 100%;
    height: 100px;
    margin-bottom: 1em;
    background-color: var(--card-background-color);
    border-radius: var(--border-radius);
    color: var(--text-color);
    font-size: 1rem;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: var(--box-shadow);
    transition: transform 0.2s;
  }
  li:hover {
    transform: translateY(-5px);
  }
  .modal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
    justify-content: center;
    align-items: center;
  }
  .modal-content {
    background-color: var(--card-background-color);
    padding: 20px;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    text-align: center;
  }
  .start-btn {
    background-color: var(--primary-color);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: background-color 0.3s;
  }
  .start-btn:hover {
    background-color: var(--secondary-color);
  }
`;

const TEMPLATE = /*html*/`
  <header>header</header>
  <main>
    <div class='stat'></div>
    <ul class="operation-list">
    </ul>
    <!-- 하단 모달창 -->
    <div class="modal" data-operation="">
      <div class="modal-content">
        <p class="modal-text">Some text in the Modal..</p>
        <button class="start-btn" data-navigate="#/calc/{:data-operation}">Start</button>
      </div>
    </div>
  </main>
  <footer>footer</footer>
`;

const createTemplate = (style, template) => /*html*/`
  <style>${style}</style>
  ${template}
`;

class HomePage extends HTMLElement {
  connectedCallback() {
    this.render();
    this.attachEventListeners();
  }

  async render() {
    this.innerHTML = createTemplate(STYLE, TEMPLATE);
    await loadAllProblems();
    
    const operations = QuestionRegistry.getQuestionTypes();
    console.log(operations);
    
    document.querySelector('.operation-list').innerHTML += operations.map(op =>
      `<li data-operation="${op.type}">${op.name}</li>`
    ).join('');
    
  }

  attachEventListeners() {
    this.querySelector(".operation-list").addEventListener("click", (event) => {
      if (event.target.tagName === "LI") {
        const operation = event.target.dataset.operation;
        this.querySelector(".modal .modal-text").textContent = `You selected ${operation}`;
        this.querySelector(".modal").style.display = "flex";
        this.querySelector(".start-btn").dataset.navigate = `#/calc/${operation}`;
      }
    });

    this.querySelector(".start-btn").addEventListener("click", () => {
      window.location.hash = this.querySelector(".start-btn").dataset.navigate;
    });
  }
}

customElements.define("home-page", HomePage);
