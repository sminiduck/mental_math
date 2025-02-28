//worksheet.js
import { getQuestionGenerator } from "./mathUtils.js";

export default class WorkSheet {
  constructor(problemType, count) {
    this.problemType = problemType;
    this.questionQueue = [];
    this.init(count);
  }

  peek(index) {
    return this.questionQueue[index];
  }

  peekObj(index) {
    if (this.questionQueue[index] == null) {
      return null;
    }
    const data = {
      num: this.questionQueue[index].info,
      question: this.questionQueue[index].questionText,
    }
    return data;
  }
  
  deque() {
    return this.questionQueue.shift();
  }
  
  init(count) {
    for (let i = 0; i < count; i++) {
      const problem = this.createProblem(i + 1);
      this.questionQueue.push(problem);
    }
  }

  createProblem(num) {
    const problem = getQuestionGenerator(this.problemType);
    console.log('proble', problem);
    problem.info = `${num}`;
    return problem;
  }
}
