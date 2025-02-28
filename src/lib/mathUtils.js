//mathUtils.js

export { getQuestionGenerator };

// 기본 문제 class
class Question {
  constructor(questionText, answer) {
    this.questionText = questionText;
    this.answer = answer;
  }

  checkAnswer(userAnswer) {
    throw new Error('isRight method should be implemented by subclasses');
  }
}


// 곱셈 문제 class
class MultiplicationQuestion extends Question {
  constructor(num1, num2) {
    const question = `${num1} &times; ${num2} =`;
    const answer = num1 * num2;
    super(question, answer);
  }
  
  checkAnswer(userAnswer) {
    return isIntegerCorrect(userAnswer, this.answer);
  }
}

// 나머지 문제 class
class Mod7Question extends Question {
  constructor(num) {
    const question = `${num} mod 7 =`;
    const answer = num % 7;
    super(question, answer);
  }
  
  checkAnswer(userAnswer) {
    return isIntegerCorrect(userAnswer, this.answer);
  }
}

const questionGenerators = {
  multiplication: () => {
    const [num1, num2] = [ getRandomInt(11, 19), getRandomInt(11, 19) ];
    return new MultiplicationQuestion(num1, num2);
  },
  mod7: () => {
    const num = getRandomInt(1, 31);
    return new Mod7Question(num);
  }
};

function getQuestionGenerator(type) {
  const generator = questionGenerators[type];
  if (!generator) {
    throw new Error(`Unknown problem type: ${type}`);
  }
  return generator();
}


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 정수로 완전히 일치하는지 확인하는 함수
function isIntegerCorrect(userAnswer, correctAnswer) {
  return parseInt(userAnswer, 10) === parseInt(correctAnswer, 10);
  }
  
// 특정 소수점 범위까지 일치하는지 확인하는 함수
function isFloatCorrect(userAnswer, correctAnswer, precision = 3) {
  return Math.abs(parseFloat(userAnswer) - parseFloat(correctAnswer)) < Math.pow(10, -precision);
}

const factorialCache = {
  0: 1,
  1: 1,
  2: 2,
  3: 6,
  4: 24,
  5: 120,
  6: 720,
  7: 5040,
  8: 40320,
  9: 362880,
  10: 3628800
};

function factorial(n) {
  if (n <= 1) return 1;
  if (factorialCache[n]) return factorialCache[n];
  factorialCache[n] = n * factorial(n - 1);
  return factorialCache[n];
}