export { Problem, problemGenerators };

// 문제 class
class Problem {
    constructor(info, question, answer, IsRight) {
        this.info = info;
        this.question = question;
        this.answer = answer;
        this.IsRight = IsRight;
    }
}

// 문제 생성기 객체
const problemGenerators = {
    createMultiplicationProblem(info) {
        // const excludes = createDomain2D([[[2, 10, 1], [2, 10, 1]]], []);
        const domain = createDomain2D([[[11, 19, 1], [11, 19, 1]]], []);
        const [num1, num2] = getRandomFromSet(domain);
        const correctAnswer = num1 * num2;
        return new Problem(
            info,
            `${num1} &times; ${num2} =`,
            correctAnswer,
            (userAns) => isIntegerCorrect(userAns, correctAnswer)
        );
    },
    createSqrtProblem(info) {
        const domain = createDomain([[1.5, 10, 0.5]], []);
        const num = getRandomFromSet(domain);
        const correctAnswer = Math.sqrt(num).toFixed(3);
        return new Problem(
            info,
            `√${num} =`,
            correctAnswer,
            (userAns) => isFloatCorrect(userAns, correctAnswer, 3)
        );
    },
    createSinProblem(info) {
        const degree = createDomain([[0, 90, 15], [0, 90, 10]], [90]);
        const x = getRandomFromSet(degree);
        const correctAnswer = Math.sin(x * Math.PI / 180).toFixed(3);
        return new Problem(
            info,
            `sin(${x}°) =`,
            correctAnswer,
            (userAns) => isFloatCorrect(userAns, correctAnswer, 3)
        );
    },
    createTanProblem(info) {
        const degree = createDomain([[0, 90, 15], [0, 90, 10]], [90]);
        const x = getRandomFromSet(degree);
        const correctAnswer = Math.tan(x * Math.PI / 180).toFixed(3);
        return new Problem(
            info,
            `tan(${x}°) =`,
            correctAnswer,
            (userAns) => isFloatCorrect(userAns, correctAnswer, 3)
        );
    },
    createLogProblem(info) {
        const domain = createDomain([[2, 10, 1]], []);
        const x = getRandomFromSet(domain);
        const correctAnswer = new Decimal(x).log(10).toFixed(3);
        return new Problem(
            info,
            `log(${x}) =`,
            correctAnswer,
            (userAns) => isFloatCorrect(userAns, correctAnswer, 3)
        );
    },
    createCombinationProblem(info) {
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
            info,
            `<sub>${n}</sub>C<sub>${r}</sub> =`,
            correctAnswer,
            (userAns) => isIntegerCorrect(userAns, correctAnswer)
        );
    },
    createPermutationProblem(info) {
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
            info,
            `<sub>${n}</sub>P<sub>${r}</sub> =`,
            correctAnswer,
            (userAns) => isIntegerCorrect(userAns, correctAnswer)
        );
    },
    createExponentProblem(info) {
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
            info,
            `${base}<sup>${exponent}</sup> =`,
            correctAnswer,
            (userAns) => isIntegerCorrect(userAns, correctAnswer)
        );
    },
    createInverseProblem(info) {
        const domain = createDomain([[2, 10, 1]], []);
        const num = getRandomFromSet(domain);
        const correctAnswer = new Decimal(1).div(num).toFixed(3);
        return new Problem(
            info,
            `1/${num} =`,
            correctAnswer,
            (userAns) => isFloatCorrect(userAns, correctAnswer)
        );
    },
    createMod7Problem(info) {
        const domain = createDomain([[1, 31, 1]], []);
        const num = getRandomFromSet(domain);
        const correctAnswer = num % 7;
        return new Problem(
            info,
            `${num} mod 7 =`,
            correctAnswer,
            (userAns) => isIntegerCorrect(userAns, correctAnswer)
        );
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

function isIntegerCorrect(userAns, correctAnswer) {
    return parseInt(userAns) === correctAnswer;
}

function isFloatCorrect(userAns, correctAnswer, decimalPlaces = 3) {
    const parsedAns = new Decimal(userAns).toFixed(decimalPlaces);
    const correctAns = new Decimal(correctAnswer).toFixed(decimalPlaces);
    return parsedAns === correctAns;
}

function getRandomNumberInSequence(start, end, step) {
    const domain = createDomain([[start, end, step]], []);
    return getRandomFromSet(domain);
}
