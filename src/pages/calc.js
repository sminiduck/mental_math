//calc.js
import "../components/question-display.js";
import "../components/virtual-keyboard.js";
import { autoGenWorkSheet } from "../lib/worksheet.js";

// Define styles
const STYLE = /*css*/`
  * {
    margin: 0;
    box-sizing: border-box;
  }
  body {
    height: 100vh;
    font-family: 'Roboto', sans-serif;
    background-color: #f0f0f0;
    color: #333;
  }
  header {
    height: 4vh;
    background-color: #6200ea;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  main {
    height: 96vh;
    display: flex;
    flex-direction: column;
  }
  .display {
    height: 50%;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
  }
  question-display {
    flex: 1;
    border-bottom: 1px solid #ccc;
  }
  virtual-keyboard {
    height: 50%;
  }
`;

// Define template
const TEMPLATE = /*html*/`
  <style>${STYLE}</style>
  <header>
    <button id="back-button" data-navigate="#/">뒤로가기</button>
    <h1>Calculation Problems</h1>
  </header>
  <main>
    <div class="display">
      <question-display></question-display>
      <question-display disabled></question-display>
    </div>
    <virtual-keyboard></virtual-keyboard>
  </main>
`;

class DispalyPair {
  constructor(active, disabled) {
    this.active = active;
    this.disabled = disabled;
  }

  get userAns() {
    return this.active.getAttribute('user-ans');
  }

  updateDisplay(state, data={}) {
    const { num='', question='', userAns = '' } = data;
    this[state].setAttribute('num', num);
    this[state].setAttribute('question', question);
    this[state].setAttribute('user-ans', userAns);
  }

  swap() {
    [this.active, this.disabled] = [this.disabled, this.active];
    this.active.removeAttribute('disabled');
    this.disabled.setAttribute('disabled', '');
  }
}

class Quiz {
  constructor(worksheet, $displayPair) {
    this.worksheet = worksheet;
    
    const { active, disabled } = $displayPair;
    this.$displayPair = new DispalyPair(active, disabled);

    this.$displayPair.updateDisplay('active', this.worksheet.peekObj(0));
    this.$displayPair.updateDisplay('disabled', this.worksheet.peekObj(1));
  }

  checkCureentAnswer() {
    const userAns = this.$displayPair.userAns;
    const question = this.worksheet.peek(0);
    console.log('userAns', userAns);
    console.log('this.worksheet.peek(0)', question);
    return question.checkAnswer(userAns);
  }

  nextQuestion() {
    if (this.checkCureentAnswer()) {
      console.log('Correct');

      this.worksheet.deque();
      this.$displayPair.swap();

      if (this.worksheet.peek(0) == null) {
        console.log('Finish');
        this.$displayPair.updateDisplay('disabled');
        this.$displayPair.active.setAttribute('disabled', '');
        return 0;
      }

      if (this.worksheet.peek(1) == null) {
        this.$displayPair.updateDisplay('disabled');
        return;
      }

      this.$displayPair.updateDisplay('disabled', this.worksheet.peekObj(1));
      console.log('Next');
    } else {
      console.log('Wrong');
    }
  }
}

// Define CalculationPage class
class CalculationPage extends HTMLElement {
  constructor() {
    super();
    this.operation = this.getAttribute('oper');
    console.log(`Operation: ${this.operation}`);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  
  connectedCallback() {
    this.render();
    this.init();
    this.attachEventListeners();
  }
  
  disconnectedCallback() {
    this.removeEventListeners();
  }

  render() {
    this.innerHTML = TEMPLATE;
  }

  init() {
    const displayPair = {
      active: document.querySelector("question-display:not([disabled])"),
      disabled: document.querySelector("question-display[disabled]")
    }
    
    const worksheet = new autoGenWorkSheet(this.operation, 5);
    this.quiz = new Quiz(worksheet, displayPair);
  }

  attachEventListeners() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  removeEventListeners() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(e) {
    if (e.key !== 'Enter') return;
    const end = this.quiz.nextQuestion();
    if(end === 0) {
      alert('Finish');
      this.removeEventListeners();
    }
  }
}

customElements.define("calculation-page", CalculationPage);
