// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', function () {
//         navigator.serviceWorker.register('service-worker.js').then(function (registration) {
//             registration.update();
//             console.log('ServiceWorker registration successful with scope: ', registration.scope);

//             // 서비스 워커가 활성화되면 업데이트 확인
//             if (registration.waiting) {
//                 registration.waiting.postMessage({ type: 'SKIP_WAITING' });
//             }

//             // 서비스 워커가 업데이트되면 페이지 새로고침
//             registration.addEventListener('updatefound', function () {
//                 const newWorker = registration.installing;
//                 newWorker.addEventListener('statechange', function () {
//                     if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
//                         newWorker.postMessage({ type: 'SKIP_WAITING' });
//                         window.location.reload(); // 새로 고침
//                     }
//                 });
//             });
//         }).catch(function (err) {
//             console.log('ServiceWorker registration failed: ', err);
//         });
//     });
// }

// document.addEventListener('DOMContentLoaded', function () {



    import { Problem, problemGenerators} from "./mathUtils";


    // 활성화된 문제 생성기 설정
    const enabledGenerators = {
        createMultiplicationProblem: true,
        createSqrtProblem: true,
        createSinProblem: true,
        createTanProblem: true,
        createLogProblem: true,
        createCombinationProblem: true,
        createPermutationProblem: true,
        createExponentProblem: true
    };
    


    // 문제 생성기
    function createProblem(info, enabledGenerators) {
        const enabledProblemTypes = Object.keys(problemGenerators).filter(key => enabledGenerators[key]);
        const randomIndex = Math.floor(Math.random() * enabledProblemTypes.length);
        return problemGenerators[enabledProblemTypes[randomIndex]](info);
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
                this.problems.push(createProblem(i + 1, enabledGenerators));
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
            $('.problem-info').eq(display).html(this.problems[cur].info);
            $('.question').eq(display).html(this.problems[cur].question);
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
            if (this.userAns === '') return;
            const currentProblem = this.problems[this.cur];
            appendToLog(currentProblem, this.userAns);

            if (currentProblem.IsRight(this.userAns)) {
                this.cur++;
                this.clickClear();
                if (this.cur === this.len_test + 1) { this.cur = -1; return; }
                this.updateProblem(this.display, this.cur + 1);
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

    const mtest = new MathTest(20);

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

    // 클릭 이벤트와 터치 이벤트를 모두 처리하도록 설정
    function addTouchEvent(selector, handler) {
        $(selector).on('touchstart', function(event) {
            event.preventDefault(); // 기본 터치 동작 방지
            $(this).addClass('button-active'); // 버튼 누름 효과 추가
            handler.call(this, event);
        });
       
        $(selector).on('touchend', function(event) {
            $(this).removeClass('button-active'); // 버튼 누름 효과 제거
        });
    
        $(selector).on('touchcancel', function(event) {
            $(this).removeClass('button-active'); // 버튼 누름 효과 제거
        });
    }

    $('.numpad-num').on('click', function () {
        mtest.clickNumber($(this).text());
    });
    addTouchEvent('.numpad-num', function () {
        mtest.clickNumber($(this).text());
    });

    $('.numpad-delete').on('click', function () {
        mtest.clickDelete();
    });
    addTouchEvent('.numpad-delete', function () {
        mtest.clickDelete();
    });

    $('.numpad-clear').on('click', function () {
        mtest.clickClear();
    });
    addTouchEvent('.numpad-clear', function () {
        mtest.clickClear();
    });

    $('.numpad-ans').click(function () {
        mtest.clickAns();
    });

    // List item click event to toggle active class in log tab
    $('.log-list').on('click', '.list-group-item', function () {
        $('.list-group-item').removeClass('active');
        $(this).addClass('active');
    });

// });