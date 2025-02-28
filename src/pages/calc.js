//calc.js
import "../components/question-display.js";
import "../components/virtual-keyboard.js";
import WorkSheet from "../lib/worksheet.js";

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

  getUserAns() {
    return this.active.getAttribute('user-ans');
  }
  
  updateDisplay(state, num, question, userAns='') {
    this[state].setAttribute('num', num);
    this[state].setAttribute('question', question);
    this[state].setAttribute('user-ans', userAns);
  }

  setDisabled() {
    this.disabled.setAttribute('disabled', '');
    this.active.setAttribute('disabled', '');
  }

  swap() {
    [this.active, this.disabled] = [this.disabled, this.active];
    this.active.removeAttribute('disabled');
    this.disabled.setAttribute('disabled', '');
  }
}

class Quiz {
  constructor($displayPair, worksheet) {
    this.worksheet = worksheet;
    this.questionQueue = [this.worksheet.deque(), this.worksheet.deque()];
    this.$displayPair = $displayPair;
    this.$displayPair.updateDisplay('active', this.questionQueue[0].info, this.questionQueue[0].questionText, '');
    this.$displayPair.updateDisplay('disabled', this.questionQueue[1].info, this.questionQueue[1].questionText, '');
  }

  checkCureentAnswer() {
    const userAns = this.$displayPair.getUserAns();
    console.log('userAns', userAns);
    console.log('this.questionQueue[0]', this.questionQueue[0]);
    return this.questionQueue[0].checkAnswer(userAns);
  }

  nextQuestion() {
    if (this.checkCureentAnswer()) {
      console.log('Correct');

      this.questionQueue.shift();
      this.questionQueue.push(this.worksheet.deque());

      this.$displayPair.swap();

      if (this.questionQueue[0] == null) {
        console.log('Finish');
        this.$displayPair.updateDisplay('disabled', '', '', '');
        this.$displayPair.active.setAttribute('disabled', '');
        return 0;
      }
      if (this.questionQueue[1] == null) {
        this.$displayPair.updateDisplay('disabled', '', '', '');
        return;
      }

      this.$displayPair.updateDisplay('disabled', this.questionQueue[1].info, this.questionQueue[1].questionText, '');
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
  }
  
  // Called when the component is added to the DOM
  connectedCallback() {
    this.innerHTML = TEMPLATE;

    const $displayPair = new DispalyPair(
      document.querySelector("question-display:not([disabled])"),
      document.querySelector("question-display[disabled]")
    );
    
    const worksheet = new WorkSheet(this.operation, 2);

    this.quiz = new Quiz($displayPair, worksheet);

    document.addEventListener('keydown', (e) => this.handleKeyDown(e));
  }

  // Called when the component is removed from the DOM
  disconnectedCallback() {
    document.removeEventListener('keydown', (e) => this.handleKeyDown(e));
  }

  // Key down event handler
  handleKeyDown(e) {
    if (e.key === 'Enter') {
      if(this.quiz.nextQuestion() == 0) {
        alert('Finish');
        document.removeEventListener('keydown', (e) => this.handleKeyDown(e));
      }
    }
  }
}

// Define custom element
customElements.define("calculation-page", CalculationPage);
