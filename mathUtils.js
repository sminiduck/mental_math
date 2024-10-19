export { Problem, problemGenerators, factorial, isIntegerCorrect, isFloatCorrect, getRandomElementFromArray, getRandomNumberInSequence };

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
        const num1 = Math.floor(Math.random() * 19) + 1;
        const num2 = Math.floor(Math.random() * 19) + 1;
        const correctAnswer = num1 * num2;
        return new Problem(
            info,
            `${num1} &times; ${num2} =`,
            correctAnswer,
            (userAns) => isIntegerCorrect(userAns, correctAnswer)
        );
    },
    createSqrtProblem(info) {
        const num = getRandomNumberInSequence(1, 10, 0.5);
        const correctAnswer = Math.sqrt(num).toFixed(2);
        return new Problem(
            info,
            `√${num} =`,
            correctAnswer,
            (userAns) => isFloatCorrect(userAns, correctAnswer, 2)
        );
    },
    createSinProblem(info) {
        const angle = getRandomNumberInSequence(0, 90, 15);
        const correctAnswer = Math.sin(angle * Math.PI / 180).toFixed(2);
        return new Problem(
            info,
            `sin(${angle}°) =`,
            correctAnswer,
            (userAns) => isFloatCorrect(userAns, correctAnswer, 2)
        );
    },
    createTanProblem(info) {
        const angle = getRandomNumberInSequence(0, 75, 15);
        const correctAnswer = Math.tan(angle * Math.PI / 180).toFixed(2);
        return new Problem(
            info,
            `tan(${angle}°) =`,
            correctAnswer,
            (userAns) => isFloatCorrect(userAns, correctAnswer, 2)
        );
    },
    createLogProblem(info) {
        const num = Math.floor(Math.random() * 10) + 1;
        const correctAnswer = Math.log10(num).toFixed(2);
        return new Problem(
            info,
            `log(${num}) =`,
            correctAnswer,
            (userAns) => isFloatCorrect(userAns, correctAnswer, 2)
        );
    },
    createCombinationProblem(info) {
        const n = getRandomNumberInSequence(2, 10, 1);
        const r = Math.floor(Math.random() * n) + 1;
        const correctAnswer = factorial(n) / (factorial(r) * factorial(n - r));
        return new Problem(
            info,
            `<sub>${n}</sub>C<sub>${r}</sub> =`,
            correctAnswer,
            (userAns) => isIntegerCorrect(userAns, correctAnswer)
        );
    },
    createPermutationProblem(info) {
        const n = getRandomNumberInSequence(2, 10, 1)
        const r = Math.floor(Math.random() * n) + 1;
        const correctAnswer = factorial(n) / factorial(n - r);
        return new Problem(
            info,
            `<sub>${n}</sub>P<sub>${r}</sub> =`,
            correctAnswer,
            (userAns) => isIntegerCorrect(userAns, correctAnswer)
        );
    },
    createExponentProblem(info) {
        const base = getRandomNumberInSequence(2, 5, 1)
        const exponent = getRandomNumberInSequence(2, 4, 1)
        const correctAnswer = Math.pow(base, exponent);
        return new Problem(
            info,
            `${base}<sup>${exponent}</sup> =`,
            correctAnswer,
            (userAns) => isIntegerCorrect(userAns, correctAnswer)
        );
    }
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





// 정수형 정답 검증 함수
function isIntegerCorrect(userAns, correctAnswer) {
    return parseInt(userAns) === correctAnswer;
}

// 실수형 정답 검증 함수
function isFloatCorrect(userAns, correctAnswer, decimalPlaces = 2) {
    const parsedAns = parseFloat(userAns).toFixed(decimalPlaces);
    const correctAns = parseFloat(correctAnswer).toFixed(decimalPlaces);
    return parsedAns === correctAns;
}

// 배열에서 무작위로 하나의 요소를 선택하는 함수
function getRandomElementFromArray(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

// 일정한 간격의 시퀀스에서 무작위로 하나의 숫자를 선택하는 함수
function getRandomNumberInSequence(start, end, step) {
    const sequence = [];
    const multiplier = 1 / step;
    const adjustedStart = Math.round(start * multiplier);
    const adjustedEnd = Math.round(end * multiplier);
    const adjustedStep = Math.round(step * multiplier);

    for (let i = adjustedStart; i <= adjustedEnd; i += adjustedStep) {
        sequence.push(i / multiplier);
    }
    return getRandomElementFromArray(sequence);
}
