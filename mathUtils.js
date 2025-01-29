export { Problem, problemGenerators };

// 기본 문제 class
class Problem {
    constructor(question, answer) {
        this.question = question;
        this.answer = answer;
    }

    isRight(userAnswer) {
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
class MultiplicationProblem extends Problem {
    constructor(num1, num2) {
        const question = `${num1} &times; ${num2} =`;
        const answer = num1 * num2;
        super(question, answer);
    }

    isRight(userAnswer) {
        return isIntegerCorrect(userAnswer, this.answer);
    }
}

// 나머지 문제 class
class Mod7Problem extends Problem {
    constructor(num) {
        const question = `${num} mod 7 =`;
        const answer = num % 7;
        super(question, answer);
    }

    isRight(userAnswer) {
        return isIntegerCorrect(userAnswer, this.answer);
    }
}

// 제곱근 문제 class
class SqrtProblem extends Problem {
    constructor(num) {
        const question = `√${num} =`;
        const answer = Math.sqrt(num).toFixed(3);
        super(question, answer);
    }

    isRight(userAnswer) {
        return isFloatCorrect(userAnswer, this.answer, 3);
    }
}

// 사인 문제 class
class SinProblem extends Problem {
    constructor(degree) {
        const question = `sin(${degree}°) =`;
        const answer = Math.sin(degree * Math.PI / 180).toFixed(3);
        super(question, answer);
    }

    isRight(userAnswer) {
        return isFloatCorrect(userAnswer, this.answer, 3);
    }
}

// 탄젠트 문제 class
class TanProblem extends Problem {
    constructor(degree) {
        const question = `tan(${degree}°) =`;
        const answer = Math.tan(degree * Math.PI / 180).toFixed(3);
        super(question, answer);
    }

    isRight(userAnswer) {
        return isFloatCorrect(userAnswer, this.answer, 3);
    }
}

// 문제 생성기 객체
const problemGenerators = {
    createMultiplicationProblem() {
        const domain = createDomain2D([[[11, 19, 1], [11, 19, 1]]], []);
        const [num1, num2] = getRandomFromSet(domain);
        return new MultiplicationProblem(num1, num2);
    },
    createSqrtProblem() {
        const domain = createDomain([[1.5, 10, 0.5]], []);
        const num = getRandomFromSet(domain);
        return new SqrtProblem(num);
    },
    createSinProblem() {
        const degree = createDomain([[0, 90, 15], [0, 90, 10]], [90]);
        const x = getRandomFromSet(degree);
        return new SinProblem(x);
    },
    createTanProblem() {
        const degree = createDomain([[0, 90, 15], [0, 90, 10]], [90]);
        const x = getRandomFromSet(degree);
        return new TanProblem(x);
    },
    createLogProblem() {
        const domain = createDomain([[2, 10, 1]], []);
        const x = getRandomFromSet(domain);
        const correctAnswer = new Decimal(x).log(10).toFixed(3);
        return new Problem(
            `log(${x}) =`,
            correctAnswer,
            (userAns) => isFloatCorrect(userAns, correctAnswer, 3)
        );
    },
    createCombinationProblem() {
        const domain = createDomain2D([
            [[7,10,1],[2,5,1]],
            [[6,6,1],[2,6,1]],
            [[5,5,1],[2,5,1]],
            [[4,4,1],[1,4,1]],
            [[3,3,1],[1,3,1]],
            [[2,2,1],[1,2,1]],
        ], []);
        const [n, r] = getRandomFromSet(domain);
        const correctAnswer = factorial(n) / (factorial(r) * factorial(n - r));
        return new Problem(
            `<sub>${n}</sub>C<sub>${r}</sub> =`,
            correctAnswer,
            (userAns) => isIntegerCorrect(userAns, correctAnswer)
        );
    },
    createPermutationProblem() {
        const domain = createDomain2D([
            [[7,10,1],[2,3,1]],
            [[6,6,1],[2,6,1]],
            [[5,5,1],[2,5,1]],
            [[4,4,1],[1,4,1]],
            [[3,3,1],[1,3,1]],
            [[2,2,1],[1,2,1]],
        ], []);
        const [n, r] = getRandomFromSet(domain);
        const correctAnswer = factorial(n) / factorial(n - r);
        return new Problem(
            `<sub>${n}</sub>P<sub>${r}</sub> =`,
            correctAnswer,
            (userAns) => isIntegerCorrect(userAns, correctAnswer)
        );
    },
    createExponentProblem() {
        const domain = createDomain2D([
            [[2,2,1],[2,12,1]],
            [[3,5,1],[2,5,1]],
            [[6,9,1],[2,3,1]],
            [[10,19,1],[2,2,1]]
        ], [
        ]);
        const [base, exponent] = getRandomFromSet(domain);
        const correctAnswer = Math.pow(base, exponent);
        return new Problem(
            `${base}<sup>${exponent}</sup> =`,
            correctAnswer,
            (userAns) => isIntegerCorrect(userAns, correctAnswer)
        );
    },
    createInverseProblem() {
        const domain = createDomain([[2, 10, 1]], []);
        const num = getRandomFromSet(domain);
        const correctAnswer = new Decimal(1).div(num).toFixed(3);
        return new Problem(
            `1/${num} =`,
            correctAnswer,
            (userAns) => isFloatCorrect(userAns, correctAnswer)
        );
    },
    createMod7Problem() {
        const domain = createDomain([[1, 31, 1]], []);
        const num = getRandomFromSet(domain);
        const correctAnswer = num % 7;
        return new Problem(
            `${num} mod 7 =`,
            correctAnswer,
            (userAns) => isIntegerCorrect(userAns, correctAnswer)
        );
    },
    createMod7Problem() {
        const domain = createDomain([[1, 31, 1]], []);
        const num = getRandomFromSet(domain);
        return new Mod7Problem(num);
    },
};

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
