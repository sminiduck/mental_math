// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', function() {
//         navigator.serviceWorker.register('service-worker.js').then(function(registration) {
//         console.log('ServiceWorker registration successful with scope: ', registration.scope);
//         }, function(err) {
//         console.log('ServiceWorker registration failed: ', err);
//         });
//     });
// }

document.addEventListener('DOMContentLoaded', function() {

    // 문제 class
    class Problem {
        constructor(info, question, answer) {
            this.info = info;
            this.question = question;
            this.answer = answer;
        }

        IsRight(ans) {
            ans = parseInt(ans);
            console.log(ans, this.answer);
            return ans === this.answer;
        }
    }

    // 19단 문제 생성기
    function createProblem(info) {
        const num1 = Math.floor(Math.random() * 9) + 1;
        const num2 = Math.floor(Math.random() * 9) + 1;
        return new Problem(info, `${num1} x ${num2} =`, num1 * num2);
    }

    class MathTest {
        constructor(len_test) {
            this.len_test = len_test;
            this.cur = 0;
            this.display = 0;
            this.problems = [];
            this.userAns = '';
            this.init();
        }

        init() {
            for (let i = 0; i < this.len_test; i++) {
                this.problems.push(createProblem(i+1));
            }
            this.problems.push(new Problem('x', '', 0));
            this.problems.push(new Problem('x', '', 0));
            this.updateProblem(0, 0);
            this.updateProblem(1, 1);
        }

        nextdisplay() {
            this.display++;
            if (this.display === 2) { this.display = 0; }
        }

        updateProblem(display, cur) {
            $('.problem-info').eq(display).text(this.problems[cur].info);
            $('.question').eq(display).text(this.problems[cur].question);
        }

        updateUserAns(display) {
            $('.user-ans').eq(display).text(this.userAns);
        }

        clickNumber(num) {
            this.userAns += num;
            this.updateUserAns(this.display);
        }

        clickDelete() {
            this.userAns = this.userAns.slice(0, -1);
            this.updateUserAns(this.display);
        }

        clickClear() {
            this.userAns = '';
            this.updateUserAns(this.display);
        }

        clickAns() {
            const currentProblem = this.problems[this.cur];
            appendToLog(currentProblem, this.userAns);
            
            if (currentProblem.IsRight(this.userAns)) {
                this.cur++;
                this.clickClear();
                if (this.cur === this.len_test + 1) {this.cur = -1; return;}
                this.updateProblem(this.display, this.cur+1);
                this.nextdisplay();
            }

            if (this.cur === this.len_test) {
                $('.numpad-num').prop('disabled', true);
                $('.numpad-delete').prop('disabled', true);
                $('.numpad-clear').prop('disabled', true);
                $('.numpad-ans').prop('disabled', true);
            }
        }

    }

    const mtest = new MathTest(10);

    // Function to create a new list item with the required structure
    function appendToLog(problem, userAns) {
        const number = problem.info;
        const question = problem.question;
        return $(`
        <li class="list-group-item">
            <span class="question-number">${number}. </span>
            <span class="question-content">${question}</span>
            <span class="user-input">${userAns}</span>
        </li>
        `).appendTo('.log-list');
    }

    $('.numpad-num').click(function() {
        mtest.clickNumber($(this).text());
    });

    $('.numpad-delete').click(function() {
        mtest.clickDelete();
    });

    $('.numpad-clear').click(function() {
        mtest.clickClear();
    });

    $('.numpad-ans').click(function() {
        mtest.clickAns();
    });

    // List item click event to toggle active class in log tab
    $('.log-list').on('click', '.list-group-item', function() {
        $('.list-group-item').removeClass('active');
        $(this).addClass('active');
    });
    $('h1').on('click', function() {
        $('.list-group-item').removeClass('active');
    });


});