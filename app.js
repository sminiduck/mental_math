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

    /** problems를 관리하는 test class
     * 1. 문제를 len_test만큼 생성
     * 2. 현재 문제를 .problem-info, .question에 반영
     * 3. 정답을 입력하면 다음 문제로 넘어감
     * 4. 오답을 입력하면 반응없음
     * 5. 유저의 입력을 즉시 .user-ans에 반영
     * 6. V클릭시 정답을 확인한다.
     * 
     */
    class MathTest {
        constructor(len_test) {
            this.problems = [];
            this.len_test = len_test;
            this.current_problem = 0;
            this.init();
        }

        init() {
            for (let i = 0; i < this.len_test; i++) {
                this.problems.push(createProblem(i+1));
            }
            this.updateProblem();
        }

        updateProblem() {
            $('.problem-info').text(this.problems[this.current_problem].info);
            $('.question').text(this.problems[this.current_problem].question);
        }

        checkAnswer() {
            if (this.problems[this.current_problem].IsRight(parseInt($('.user-ans').text()))) {
                this.current_problem++;
                console.log('Correct!');
                $('.user-ans').text('');
                userInput = '';
                this.updateProblem();
            }
        }
    }

    const mtest = new MathTest(10);

    let userInput = '';
    // let currentLi = createNewListItem(questionNumber);

    // // Function to create a new list item with the required structure
    // function createNewListItem(number) {
    //     const num1 = Math.floor(Math.random() * 19) + 1;
    //     const num2 = Math.floor(Math.random() * 19) + 1;
    //     const question = `${num1} x ${num2} = `;
    //     const correctAnswer = num1 * num2;

    //     return $(`
    //     <li class="list-group-item">
    //         <span class="question-number">${number}. </span>
    //         <span class="question-content">${question}</span>
    //         <span class="user-input"></span>
    //         <span class="correct-answer" style="display:none;">${correctAnswer}</span>
    //     </li>
    //     `).appendTo('.problems');
    // }

    $('.numpad-num').click(function() {
        userInput += this.value;
        $('.user-ans').text(userInput);
    });

    $('.numpad-delete').click(function() {
        userInput = userInput.slice(0, -1);  // Remove last character
        $('.user-ans').text(userInput);
    });

    $('.numpad-clear').click(function() {
        userInput = '';  // Clear input
        $('.user-ans').text(userInput);
    });

    // V(확정) 버튼 클릭 시 입력값 확정 및 새 li 생성
    $('.numpad-ans').click(function() {
        // if (userInput.trim() === '') return; // Ignore empty input
        mtest.checkAnswer(userInput);
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