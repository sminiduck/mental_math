import { WorkSheet } from "./worksheet.js";

document.addEventListener('DOMContentLoaded', function () {
    const worksheet = new WorkSheet(3);
    const questionDisplays = document.querySelectorAll('question-display');
    let focusedDisplay = questionDisplays[0];
    let watingDisplay = questionDisplays[1];
    focusedDisplay.setFocused(true);
    watingDisplay.setFocused(false);
    
    function toggleDisplay() {
        [focusedDisplay, watingDisplay] = [watingDisplay, focusedDisplay];
        focusedDisplay.setFocused(true);
        watingDisplay.setFocused(false);    
    }    
    
    const keyboard = document.querySelector('virtual-keyboard');
    
    let problem = worksheet.dequeueProblem();
    let watingProblem = worksheet.dequeueProblem();
    focusedDisplay.updateProblem(problem);
    watingDisplay.updateProblem(watingProblem);
    

    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter') return;

        const userAns = focusedDisplay.getUserAns();

        if (problem.isRight(userAns)) {
            focusedDisplay.clear();
            console.log('정답입니다.');

            problem = watingProblem;
            watingProblem = worksheet.dequeueProblem();

            toggleDisplay();
            watingDisplay.updateProblem(watingProblem);
        } else {
            console.log('오답입니다.');
        }


    });
});