import { MathTest } from "./mathTest.js";


document.addEventListener('DOMContentLoaded', function () {


    const mtest = new MathTest(30);

    document.addEventListener('key-press', (e) => {
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