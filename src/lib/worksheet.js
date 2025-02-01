//worksheet.js
import { problemGenerators } from "./mathUtils.js";
export { WorkSheet };

class WorkSheet {
    constructor(testLen) {
        this.testLength = testLen;
        this.cur = 0;
        this.problems = [];
        this.userAns = '';
        this.init();
    }

    init() {
        for (let i = 0; i < this.testLength; i++) {
            const problem = this.createProblem(i + 1);
            this.problems.push(problem);
        }
    }
    
    dequeueProblem() {
        let result = this.problems[0];
        this.problems.shift();
        return result;
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
            problemGenerators.createMod7Problem
        ];
        const randomGenerator = enabledGenerators[Math.floor(Math.random() * enabledGenerators.length)];
        const problem = randomGenerator();
        problem.info = `${index}`;
        return problem;
    }

    // event handler
    clickNumber(num) {
        this.userAns += num;
    }

    clickDelete() {
        this.userAns = this.userAns.slice(0, -1);
    }

    clickClear() {
        this.userAns = '';
    }

    clickAns() {
        if (this.userAns === '') return;

        const currentProblem = this.problems[this.cur];

        if (currentProblem.isRight(this.userAns)) {
            this.cur++;
            this.clickClear();
        }
    }
}
