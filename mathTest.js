import { problemGenerators } from "./mathUtils.js";
export { MathTest };



class MathTest {
    constructor(testLen) {
        this.testLen = testLen;
        this.cur = 0;
        this.display = 0;
        this.problems = [];
        this.userAns = '';
        this.init();
    }

    init() {
        for (let i = 0; i < this.testLen; i++) {
            const problem = this.createProblem(i + 1);
            this.problems.push(problem);
        }
        this.updateProblem(0, 0);
        this.updateProblem(1, 1);
    }

    createProblem(index) {
        const enabledGenerators = [
            problemGenerators.createMultiplicationProblem,
            // problemGenerators.createSqrtProblem,
            // problemGenerators.createSinProblem,
            // problemGenerators.createTanProblem,
            // problemGenerators.createLogProblem,
            // problemGenerators.createCombinationProblem,
            // problemGenerators.createPermutationProblem,
            // problemGenerators.createExponentProblem,
            // problemGenerators.createInverseProblem,
            // problemGenerators.createMod7Problem
        ];
        const randomGenerator = enabledGenerators[Math.floor(Math.random() * enabledGenerators.length)];
        const problem = randomGenerator();
        problem.info = `문항 ${index}`;
        return problem;
    }

    // display control
    nextDisplay() {
        this.display++;
        if (this.display === 2) { this.display = 0; }
    }

    updateProblem(display, cur) {
        $('.problem-info').eq(display)
            .html(this.problems[cur].info);

        $('.question').eq(display)
            .html(this.problems[cur].question);
    }

    updateUserAns(display) {
        $('.user-ans').eq(display).text(this.userAns);
    }


    // event handler
    clickNumber(num) {
        this.userAns += num;
        this.updateUserAns(this.display);
    }

    clickDelete() {
        this.userAns = this.userAns.slice(0, -1);
        this.updateUserAns(this.display);
    }

    clickClear() {
        this.userAns = '';
        this.updateUserAns(this.display);
    }

    clickAns() {
        if (this.userAns === '') return;

        const currentProblem = this.problems[this.cur];

        if (currentProblem.isRight(this.userAns)) {
            this.cur++;
            this.clickClear();

            this.updateProblem(this.display, this.cur + 1);
            this.nextDisplay();
        }

        if (this.cur === this.testLen) {
            $('.numpad-num').prop('disabled', true);
            $('.numpad-delete').prop('disabled', true);
            $('.numpad-clear').prop('disabled', true);
            $('.numpad-ans').prop('disabled', true);
        }
    }

}
