import { WorkSheet } from "./worksheet.js";

document.addEventListener('DOMContentLoaded', function () {




    const worksheet = new WorkSheet(10);

    worksheet.printMahtTest();

    const questionDisplay = document.querySelector('question-display');
    questionDisplay.updateProblem(worksheet.problems[0]);


    const keyboard = document.querySelector('virtual-keyboard');

    document.addEventListener('keydown', (e) => {
        if (worksheet.problems.length === 0) {
            console.log('연습이 끝났습니다.');
            return;
        }
        if (e.key === 'Enter') {
            const userAns = questionDisplay.getUserAns();
            const problem = worksheet.dequeueProblem();
            questionDisplay.updateProblem(problem);
            if (problem.isRight(userAns)) {
                questionDisplay.clear();
                console.log('정답입니다.');
            } else {
                console.log('오답입니다.');
            }
        }
    });

});