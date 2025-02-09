//calc.js
import "../components/question-display.js";
import "../components/virtual-keyboard.js";
import WorkSheet from "../lib/worksheet.js";

class CalcPage extends HTMLElement {
	constructor() {
		super();
		this.worksheet = new WorkSheet(3);
		this.tmp = [];
		this.tmp.push(this.worksheet.dequeueProblem(), this.worksheet.dequeueProblem());
		this.$ADisplay = null;
		this.$DDisplay = null;
		// this.problem = this.worksheet.dequeueProblem();
	}

	connectedCallback() {
		const style = /*css*/`
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
		const template = /*html*/`
			<style>${style}</style>
			<header>
				<h1>계산 문제</h1>
			</header>
			<main>
				<div class="display">
					<question-display active></question-display>
					<question-display disabled></question-display>
				</div>
				<virtual-keyboard></virtual-keyboard>
			</main>
		`;
		this.innerHTML = template;
		this.addEventListeners();
		this.$ADisplay = document.querySelector("question-display:not([disabled])");
		this.$DDisplay = document.querySelector("question-display[disabled]");
		this.handleDisplayChange(this.tmp[0].info, this.tmp[0].question, '', this.$ADisplay);
		this.handleDisplayChange(this.tmp[1].info, this.tmp[1].question, '', this.$DDisplay);
	}

	addEventListeners() {
		document.addEventListener('keydown', this.handleKeyDown);
	}

	handleKeyDown = (e) => {
		if (e.key !== 'Enter') return;


		const userAns = this.$ADisplay.getAttribute('user-ans');

		if (this.tmp[0].isRight(userAns)) {
			console.log('정답입니다.');
			this.tmp.shift();
			this.tmp.push(this.worksheet.dequeueProblem());
			[this.$ADisplay, this.$DDisplay] = [this.$DDisplay, this.$ADisplay];
			this.$ADisplay.removeAttribute('disabled');
			this.$DDisplay.setAttribute('disabled', '');
			if (this.tmp[0] == null) {
				console.log('테스트 종료');
				this.handleDisplayChange('', '', '', this.$DDisplay);
				return;
			}
			if (this.tmp[1] == null) {
				this.handleDisplayChange(this.tmp[0].info, this.tmp[0].question, '', this.$ADisplay);
				this.handleDisplayChange('', '', '', this.$DDisplay);
				return;
			}
			this.handleDisplayChange(this.tmp[0].info, this.tmp[0].question, '', this.$ADisplay);
			this.handleDisplayChange(this.tmp[1].info, this.tmp[1].question, '', this.$DDisplay);
		} else {
			console.log('오답입니다.');
		}
	}

	handleDisplayChange = (num, question, userAns, $display) => {
		console.log($display);
		$display.setAttribute('num', num);
		$display.setAttribute('question', question);
		$display.setAttribute('user-ans', userAns);
	}
}

customElements.define("calc-page", CalcPage);
