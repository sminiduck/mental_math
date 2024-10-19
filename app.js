if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('service-worker.js').then(function (registration) {
            registration.update();
            console.log('ServiceWorker registration successful with scope: ', registration.scope);

            // 서비스 워커가 활성화되면 업데이트 확인
            if (registration.waiting) {
                registration.waiting.postMessage({ type: 'SKIP_WAITING' });
            }

            // 서비스 워커가 업데이트되면 페이지 새로고침
            registration.addEventListener('updatefound', function () {
                const newWorker = registration.installing;
                newWorker.addEventListener('statechange', function () {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        newWorker.postMessage({ type: 'SKIP_WAITING' });
                        window.location.reload(); // 새로 고침
                    }
                });
            });
        }).catch(function (err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

import { Problem, problemGenerators } from "./mathUtils.js";
document.addEventListener('DOMContentLoaded', function () {

    // 활성화된 문제 생성기 설정
    const enabledGenerators = {
        createMultiplicationProblem: true,
        createSqrtProblem: true,
        createSinProblem: true,
        createTanProblem: true,
        createLogProblem: true,
        createCombinationProblem: true,
        createPermutationProblem: true,
        createExponentProblem: true,
        createInverseProblem: false,
        createMod7Problem: true
    };



    // 문제 생성기
    function createProblem(info, enabledGenerators) {
        const enabledLi = Object.keys(problemGenerators)
            .filter(key => enabledGenerators[key]);
        const randomIndex = Math.floor(Math.random() * enabledLi.length);
        return problemGenerators[
            enabledLi[randomIndex]](info);
    }


    class MathTest {
        constructor(testLen) {
            this.testLen = testLen;
            this.cur = 0;
            this.display = 0;
            this.problems = [];
            this.userAns = '';
            this.init();
        }

        init() {
            for (let i = 0; i < this.testLen; i++) {
                this.problems.push(createProblem(i + 1, enabledGenerators));
            }
            this.problems.push(new Problem('x', '', 0));
            this.problems.push(new Problem('x', '', 0));
            this.updateProblem(0, 0);
            this.updateProblem(1, 1);
        }

        // display control
        nextDisplay() {
            this.display++;
            if (this.display === 2) { this.display = 0; }
        }

        updateProblem(display, cur) {
            $('.problem-info').eq(display)
                .html(this.problems[cur].info);

            $('.question').eq(display)
                .html(this.problems[cur].question);
        }

        updateUserAns(display) {
            $('.user-ans').eq(display).text(this.userAns);
        }


        // event handler
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

            if (currentProblem.IsRight(this.userAns)) {
                this.cur++;
                this.clickClear();

                this.updateProblem(this.display, this.cur + 1);
                this.nextDisplay();
            }

            appendToLog(currentProblem, this.userAns);

            if (this.cur === this.testLen) {
                $('.numpad-num').prop('disabled', true);
                $('.numpad-delete').prop('disabled', true);
                $('.numpad-clear').prop('disabled', true);
                $('.numpad-ans').prop('disabled', true);
            }
        }

    }

    const mtest = new MathTest(3);

    // 클릭 이벤트와 터치 이벤트를 모두 처리하도록 설정
    function addTouchEvent(selector, handler) {
        $(selector).on('touchstart', function (event) {
            event.preventDefault(); // 기본 터치 동작 방지
            $(this).addClass('button-active'); // 버튼 누름 효과 추가
            handler.call(this, event);
        });

        $(selector).on('touchend', function (event) {
            $(this).removeClass('button-active'); // 버튼 누름 효과 제거
        });

        $(selector).on('touchcancel', function (event) {
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


    $('.log-list').on('click', '.list-group-item', function () {
        $('.list-group-item').removeClass('active');
        $(this).addClass('active');
    });

});