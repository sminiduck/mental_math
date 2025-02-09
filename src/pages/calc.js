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
	}
	header {
		height: 50px;
		background-color: #333;
		color: white;
	}
	main {
		height: calc(100vh - 50px);
		display: flex;
		flex-direction: column;
	}
	.display {
		height: 50%;
		display: flex;
		flex-direction: column;
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

// Function to update display attributes
const updateDisplay = (num, question, userAns, $display) => {
	$display.setAttribute('num', num);
	$display.setAttribute('question', question);
	$display.setAttribute('user-ans', userAns);
};

// Function to swap active and disabled displays
const swapDisplays = ($displays) => {
	[$displays.active, $displays.disabled] = [$displays.disabled, $displays.active];
	$displays.active.removeAttribute('disabled');
	$displays.disabled.setAttribute('disabled', '');
};

// Handle Enter key press event
const handleEnterKey = (e, problemsQueue, worksheet, $displays) => {
	if (e.key !== 'Enter') return;

	const userAns = $displays.active.getAttribute('user-ans');

	if (problemsQueue[0].isRight(userAns)) {
		console.log('Correct');

		problemsQueue.shift();
		problemsQueue.push(worksheet.dequeueProblem());

		swapDisplays($displays);

		// Handle completion of problems
		if (problemsQueue[0] == null) {
			console.log('Finish');
			updateDisplay('', '', '', $displays.disabled);
			return;
		}
		if (problemsQueue[1] == null) {
			updateDisplay(problemsQueue[0].info, problemsQueue[0].question, '', $displays.active);
			updateDisplay('', '', '', $displays.disabled);
			return;
		}

		updateDisplay(problemsQueue[0].info, problemsQueue[0].question, '', $displays.active);
		updateDisplay(problemsQueue[1].info, problemsQueue[1].question, '', $displays.disabled);
		console.log('Next');
	} else {
		console.log('Wrong');
	}
};

// Define CalculationPage class
class CalculationPage extends HTMLElement {
	constructor() {
		super();
		this.worksheet = new WorkSheet(10);
		this.problemsQueue = [this.worksheet.dequeueProblem(), this.worksheet.dequeueProblem()];
		this.$displays = {
			active: null,
			disabled: null
		};
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}

	// Called when the component is added to the DOM
	connectedCallback() {
		this.innerHTML = TEMPLATE;
		this.$displays.active = document.querySelector("question-display:not([disabled])");
		this.$displays.disabled = document.querySelector("question-display[disabled]");
		updateDisplay(this.problemsQueue[0].info, this.problemsQueue[0].question, '', this.$displays.active);
		updateDisplay(this.problemsQueue[1].info, this.problemsQueue[1].question, '', this.$displays.disabled);
		document.addEventListener('keydown', this.handleKeyDown);
	}

	// Called when the component is removed from the DOM
	disconnectedCallback() {
		document.removeEventListener('keydown', this.handleKeyDown);
	}

	// Key down event handler
	handleKeyDown(e) {
		handleEnterKey(e, this.problemsQueue, this.worksheet, this.$displays);
	}
}

// Define custom element
customElements.define("calculation-page", CalculationPage);
