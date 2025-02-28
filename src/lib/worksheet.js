//worksheet.js
import { getQuestionGenerator } from "./mathUtils.js";

class WorkSheet {
  constructor() {
    this.questionQueue = [];
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
}

export class autoGenWorkSheet extends WorkSheet {
  constructor(problemType, count) {
    super();
    this.problemType = problemType;
    this.init(count);
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