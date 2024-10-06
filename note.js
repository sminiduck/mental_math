
$(document).ready(function() {
let userInput = '';
let questionNumber = 1; // Initialize question number
let currentLi = createNewListItem(questionNumber);

// Function to create a new list item with the required structure
function createNewListItem(number) {
    const num1 = Math.floor(Math.random() * 19) + 1;
    const num2 = Math.floor(Math.random() * 19) + 1;
    const questionContent = `${num1} x ${num2}`;
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

// V 버튼 클릭 시 정답 확인
$('.numpad-validate').click(function() {
    const correctAnswer = currentLi.find('.correct-answer').text();
    if (userInput === correctAnswer) {
    currentLi.appendTo('.log');  // Move to log
    currentLi = createNewListItem(++questionNumber);  // Create new question
    userInput = '';  // Reset user input

});
});
