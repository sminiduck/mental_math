import QuestionRegistry from "./indexQ.js";
import { Question } from "../lib/mathUtils.js";
import { getRandomInt, isIntegerCorrect, isFloatCorrect } from "../lib/mathUtils.js";

class MultiplicationQuestion extends Question {
  constructor(num1, num2) {
    super(`${num1} × ${num2} =`, num1 * num2);
  }

  checkAnswer(userAnswer) {
    return parseInt(userAnswer, 10) === this.answer;
  }
}

// 문제 유형 등록
QuestionRegistry.register({
  name: "19 × 19 곱셈",
  type: "MultiplicationQuestion",
  generator: () => {
    const [num1, num2] = [getRandomInt(11, 19), getRandomInt(11, 19)];
    return new MultiplicationQuestion(num1, num2);
  }
});

class Mod7Question extends Question {
  constructor(num) {
    super(`${num} mod 7 =`, num % 7);
  }
  
  checkAnswer(userAnswer) {
    return isIntegerCorrect(userAnswer, this.answer);
  }
}

// 문제 유형 등록
QuestionRegistry.register({
  name: "날짜 mod 7",
  type: "Mod7Question",
  generator: () => {
    const num = getRandomInt(1, 31);
    return new Mod7Question(num);
  }
});

class SqrtQuestion extends Question {
  constructor(num) {
    super(`√${num} =`, Math.sqrt(num));
  }

  checkAnswer(userAnswer) {
    return isFloatCorrect(userAnswer, this.answer, 2);
  }
}

// 문제 유형 등록
QuestionRegistry.register({
  name: "제곱근",
  type: "SqrtQuestion",
  generator: () => {
    const num = getRandomInt(2, 5);
    return new SqrtQuestion(num);
  }
});

class DecToBinaryQuestion extends Question {
  constructor(num) {
    super(`${num}의 2진수 =`, num.toString(2));
  }

  checkAnswer(userAnswer) {
    return userAnswer === this.answer;
  }
}

// 문제 유형 등록
QuestionRegistry.register({
  name: "10진수 -> 2진수",
  type: "DecToBinaryQuestion",
  generator: () => {
    const num = getRandomInt(1, 31);
    return new DecToBinaryQuestion(num);
  }
});
