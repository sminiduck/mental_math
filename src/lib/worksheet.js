//worksheet.js
import { getProblemGenerator } from "./mathUtils.js";

export default class WorkSheet {
  constructor(problemType, totalProblem) {
    this.problemType = problemType;
    this.totalProblem = totalProblem;
    this.problemList = [];
    this.init();
  }

  init() {
    for (let i = 0; i < this.totalProblem; i++) {
      const problem = this.createProblem(i + 1);
      this.problemList.push(problem);
    }
  }

  deque() {
    let result = this.problemList[0] || null;
    this.problemList.shift();
    return result;
  }

  createProblem(num) {
    const problem = getProblemGenerator(this.problemType);
    console.log('proble', problem);
    problem.info = `${num}`;
    return problem;
  }
}
