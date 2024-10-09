// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', function() {
//         navigator.serviceWorker.register('service-worker.js').then(function(registration) {
//         console.log('ServiceWorker registration successful with scope: ', registration.scope);
//         }, function(err) {
//         console.log('ServiceWorker registration failed: ', err);
//         });
//     });
// }

$(document).ready(function() {

    // 문제 class
    class Problem {
        constructor(info, question, answer) {
            this.info = info;
            this.question = question;
            this.answer = answer;
        }

        IsRight(ans) {
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
            this.problems = [];
            this.userAns = '';
            this.init();
        }

        init() {
            for (let i = 0; i < this.len_test; i++) {
                this.problems.push(createProblem(i+1));
            }
            this.updateProblem();
        }

        updateProblem() {
            $('.problem-info').text(this.problems[this.cur].info);
            $('.question').text(this.problems[this.cur].question);
        }

        clickNumber(num) {
            this.userAns += num;
            $('.user-ans').text(this.userAns);
        }

        clickDelete() {
            this.userAns = this.userAns.slice(0, -1);
            $('.user-ans').text(this.userAns);
        }

        clickClear() {
            this.userAns = '';
            $('.user-ans').text('');
        }

        clickAns() {
            const currentProblem = this.problems[this.cur];
            console.log(currentProblem.IsRight, this,this.userAns);
            if (currentProblem.IsRight(this.userAns)) {
                createNewListItem(this.cur + 1);
                this.cur++;

                if (this.cur === this.len_test) {
                    alert('모든 문제를 풀었습니다.');
                    this.cur = 0;
                }

                // Clear user answer and update the problem
                this.userAns = '';
                $('.user-ans').text('');
                this.updateProblem();
            }
        }

    }

    const mtest = new MathTest(10);

    // Function to create a new list item with the required structure
    function createNewListItem(number) {
        const num1 = Math.floor(Math.random() * 19) + 1;
        const num2 = Math.floor(Math.random() * 19) + 1;
        const question = `${num1} x ${num2} = `;
        const correctAnswer = num1 * num2;
        return $(`
        <li class="list-group-item">
            <span class="question-number">${number}. </span>
            <span class="question-content">${question}</span>
            <span class="user-input"></span>
            <span class="correct-answer" style="display:none;">${correctAnswer}</span>
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