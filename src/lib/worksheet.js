//worksheet.js
import { problemGenerators } from "./mathUtils.js";

export default class WorkSheet {
  constructor(testLen) {
    this.testLength = testLen;
    this.problems = [];
    this.init();
  }

  init() {
    for (let i = 0; i < this.testLength; i++) {
      const problem = this.createProblem(i + 1);
      this.problems.push(problem);
    }
  }

  deque() {
    let result = this.problems[0] || null;
    this.problems.shift();
    return result;
  }

  createProblem(num) {
    const enabledGenerators = [
      problemGenerators.createMultiplicationProblem,
      problemGenerators.createMod7Problem
    ];
    const randomGenerator = enabledGenerators[Math.floor(Math.random() * enabledGenerators.length)];
    const problem = randomGenerator();
    problem.info = `${num}`;
    return problem;
  }
}
