import { MathTest } from "./mathTest.js";


document.addEventListener('DOMContentLoaded', function () {


    const mtest = new MathTest(30);

    // 메인 DOM에서 이벤트 리스너 추가
    document.querySelector('.current-container').addEventListener('key-press', (e) => {
        console.log('Key pressed:', e.detail.key);
        // 추가 동작 수행
    });

    document.querySelector('.current-container').addEventListener('key-press', (e) => {
        const key = e.detail.key;
        switch (key) {
            case '<':
                mtest.clickDelete();
                break;
            case 'AC':
                mtest.clickClear();
                break;
            case 'V':
                mtest.clickAns();
                break;
            default:
                 mtest.clickNumber(key);
                break;
        }
    });

});