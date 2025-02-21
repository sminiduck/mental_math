//mathUtils.js
import './decimal.js';

export { getProblemGenerator };

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

// 정수로 완전히 일치하는지 확인하는 함수
function isIntegerCorrect(userAnswer, correctAnswer) {
  return parseInt(userAnswer, 10) === parseInt(correctAnswer, 10);
}

// 특정 소수점 범위까지 일치하는지 확인하는 함수
function isFloatCorrect(userAnswer, correctAnswer, precision = 3) {
  return Math.abs(parseFloat(userAnswer) - parseFloat(correctAnswer)) < Math.pow(10, -precision);
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

function generateProblem(domain, problem) {
  const arg = randArg(problem.argInfo, domain);
  return new problem(arg);
}

// 문제 생성기 객체
const problemGenerators = {
  multiplication: () => {
    const domain = createDomain2D([[[11, 19, 1], [11, 19, 1]]], []);
    const [num1, num2] = getRandomFromSet(domain);
    return new MultiplicationQuestion(num1, num2);
  },
  mod7: () => {
    const domain = createDomain([[1, 31, 1]], []);
    const num = getRandomFromSet(domain);
    return new Mod7Question(num);
  }
};

// 문제 생성기 함수
function getProblemGenerator(type) {
  const generator = problemGenerators[type];
  if (!generator) {
    throw new Error(`Unknown problem type: ${type}`);
  }
  return generator();
}

// 팩토리얼 함수 (메모이제이션을 사용하여 성능 개선)
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

/**
 * 주어진 범위와 스텝 정보에 따라 도메인을 생성합니다.
 * @param {Array<Array<number>>} rangeSteps - 각 범위와 스텝 정보가 포함된 배열. 각 요소는 [start, end, step] 형태의 배열입니다.
 * @param {Array<number>} excludes - 도메인에서 제외할 값들의 배열.
 * @returns {Set<number>} 생성된 도메인 값들의 집합.
 */
function createDomain(rangeSteps, excludes) {
  const domain = new Set();

  // 각 범위와 스텝 정보가 포함된 배열을 순회
  for (const [start, end, step] of rangeSteps) {
    let j = new Decimal(start);
    const endDecimal = new Decimal(end);
    const stepDecimal = new Decimal(step);

    while (j.lte(endDecimal)) {
      const value = j.toNumber(); // Decimal 객체를 숫자로 변환
      if (!excludes.includes(value)) {
        domain.add(value);
      }
      j = j.plus(stepDecimal);
    }
  }

  return domain;
}

/**
 * 주어진 2차원 범위 쌍 배열에 따라 2차원 도메인을 생성합니다.
 * @param {Array<Array<Array<number>>>} pairs - 2차원 범위 쌍이 포함된 배열. 각 요소는 [[startX, endX, stepX], [startY, endY, stepY]] 형태의 배열입니다.
 * @param {Array<Array<number>>} excludes - 도메인에서 제외할 좌표 쌍들의 배열. 각 요소는 [x, y] 형태의 배열입니다.
 * @returns {Set<Array<number>>} 생성된 2차원 도메인 값들의 집합. 각 값은 [x, y] 형태의 배열입니다.
 */
function createDomain2D(pairs, excludes) {
  const domain = new Set();

  for (const [rangeX, rangeY] of pairs) {

    const domainX = createDomain([rangeX], []);
    const domainY = createDomain([rangeY], []);


    for (const x of domainX) {
      for (const y of domainY) {
        if (!excludes.includes([x, y])) {
          domain.add([x, y]);
        }
      }
    }
  }
  return domain;
}

function getRandomFromSet(set) {
  const arr = [...set]; // Set을 배열로 변환
  const randomIndex = Math.floor(Math.random() * arr.length); // 랜덤 인덱스 선택
  return arr[randomIndex];
}

function getRandomNumberInSequence(start, end, step) {
  const domain = createDomain([[start, end, step]], []);
  return getRandomFromSet(domain);
}
