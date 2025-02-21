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
      <question-display active></question-display>
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
  
  updateActiveDisplay(num, question, userAns) {
    this.active.setAttribute('num', num);
    this.active.setAttribute('question', question);
    this.active.setAttribute('user-ans', userAns);
  }

  updateDisabledDisplay(num, question, userAns) {
    this.disabled.setAttribute('num', num);
    this.disabled.setAttribute('question', question);
    this.disabled.setAttribute('user-ans', userAns);
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
    this.$displayPair.updateActiveDisplay(this.questionQueue[0].info, this.questionQueue[0].questionText, '');
    this.$displayPair.updateDisabledDisplay(this.questionQueue[1].info, this.questionQueue[1].questionText, '');
  }

  checkCureentAnswer() {
    const userAns = this.$displayPair.active.getAttribute('user-ans');
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
        this.$displayPair.updateDisplay('', '', '');
        return;
      }
      if (this.questionQueue[1] == null) {
        this.$displayPair.updateDisplay(this.questionQueue[0].info, this.questionQueue[0].questionText, '');
        this.$displayPair.updateDisplay('', '', '');
        return;
      }

      this.$displayPair.updateActiveDisplay(this.questionQueue[0].info, this.questionQueue[0].questionText, '');
      this.$displayPair.updateDisabledDisplay(this.questionQueue[1].info, this.questionQueue[1].questionText, '');
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
    const operation = this.getAttribute('oper');
    console.log(`Operation: ${operation}`);
    this.worksheet = new WorkSheet(operation, 5);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  
  // Called when the component is added to the DOM
  connectedCallback() {
    this.innerHTML = TEMPLATE;
    this.$displayPair = new DispalyPair(
      document.querySelector("question-display:not([disabled])"),
      document.querySelector("question-display[disabled]")
    );
    document.addEventListener('keydown', this.handleKeyDown);
    this.quiz = new Quiz(this.$displayPair, this.worksheet);
  }

  // Called when the component is removed from the DOM
  disconnectedCallback() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  // Key down event handler
  handleKeyDown(e) {
    if (e.key === 'Enter') {
      this.quiz.nextQuestion();
    }
  }
}

// Define custom element
customElements.define("calculation-page", CalculationPage);
