
const correctAnswer = new Audio('static/sounds/correct_answer.mp3');
const incorrectAnswer = new Audio('static/sounds/incorrect_answer.mp3');

function playSound(sound) {
    if (muted == true) {} else {sound.play();};
};
