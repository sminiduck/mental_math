if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('service-worker.js').then(function(registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
        console.log('ServiceWorker registration failed: ', err);
        });
    });
}

$(document).ready(function() {

let userInput = '';
let questionNumber = 1; // Initialize question number
let currentLi = createNewListItem(questionNumber);

// Function to create a new list item with the required structure
function createNewListItem(number) {
    const num1 = Math.floor(Math.random() * 19) + 1;
    const num2 = Math.floor(Math.random() * 19) + 1;
    const questionContent = `${num1} x ${num2} = `;
    const correctAnswer = num1 * num2;

    return $(`
    <li class="list-group-item">
        <span class="question-number">${number}. </span>
        <span class="question-content">${questionContent}</span>
        <span class="user-input"></span>
        <span class="correct-answer" style="display:none;">${correctAnswer}</span>
    </li>
    `).appendTo('.problems');
}

// 숫자 버튼 클릭 시 li의 값이 업데이트됨
$('.numpad-num').click(function() {
    userInput += this.value;
    currentLi.find('.user-input').text(userInput);  // Update user input part
});

// delete 버튼 클릭 시 마지막 입력값 한 칸 지우기
$('.numpad-delete').click(function() {
    userInput = userInput.slice(0, -1);  // Remove last character
    currentLi.find('.user-input').text(userInput);  // Update user input part
});

// clear 버튼 클릭 시 전체 입력값 지우기
$('.numpad-clear').click(function() {
    userInput = '';  // Clear input
    currentLi.find('.user-input').text('');  // Clear user input part
});

// V(확정) 버튼 클릭 시 입력값 확정 및 새 li 생성
$('.numpad-ans').click(function() {
    // if (userInput.trim() === '') return; // Ignore empty input
    const correctAnswer = currentLi.find('.correct-answer').text();
    if (userInput === correctAnswer) {
    currentLi.addClass('correct');
    currentLi.appendTo('.log-list');
    userInput = '';
    questionNumber++;
    currentLi = createNewListItem(questionNumber);  // Create new list item
    } else {
    currentLi.addClass('incorrect');
    currentLi.appendTo('.log-list');
    // 문제 내용과 문항 번호를 동일하게 유지
    old_currentLi = currentLi;
    currentLi = createNewListItem(questionNumber);  // Create new list item
    currentLi.find('.question-number').text(`${questionNumber}. `);
    currentLi.find('.question-content').text(old_currentLi.find('.question-content').text());
    currentLi.find('.user-input').text(userInput);
    currentLi.find('.correct-answer').text(correctAnswer);
    }

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