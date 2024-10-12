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
        const num1 = Math.floor(Math.random() * 19) + 1;
        const num2 = Math.floor(Math.random() * 19) + 1;
        return new Problem(info, `${num1} x ${num2} = `, num1 * num2);
    }

    class MathTest {
        constructor(len_test) {
            this.len_test = len_test;
            this.cur = 0;
            this.pointer = 0;
            this.problems = [];
            this.userAns = '';
            this.init();
        }

        init() {
            for (let i = 0; i < this.len_test; i++) {
                this.problems.push(createProblem(i+1));
            }
            this.updateProblem(this.pointer, 0);
        }

        nextPointer() {
            this.pointer++;
            if (this.pointer === 2) { this.pointer = 0; }
        }

        updateProblem(pointer, cur) {
            $('.problem-info').eq(pointer).text(this.problems[cur].info);
            $('.question').eq(pointer).text(this.problems[cur].question);
        }

        updateUserAns(cur) {
            $('.user-ans').eq(cur).text(this.userAns);
        }

        clickNumber(num) {
            this.userAns += num;
            this.updateUserAns(this.pointer);
        }

        clickDelete() {
            this.userAns = this.userAns.slice(0, -1);
            this.updateUserAns(this.pointer);
        }

        clickClear() {
            this.userAns = '';
            this.updateUserAns(this.pointer);
        }

        clickAns() {
            if (this.cur === -1) { return; }
            const currentProblem = this.problems[this.cur];
            appendToLog(currentProblem, this.userAns);
            
            if (currentProblem.IsRight(this.userAns)) {
                this.cur++;
                if (this.cur === this.len_test) {this.cur = -1;}
                this.clickClear();
                this.updateProblem(this.pointer, this.cur+1);
                this.nextPointer();
            }
        }

    }

    const mtest = new MathTest(3);

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