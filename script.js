const questions = [
    "What planet is known as the 'Red Planet'?", 
    "Who painted the Mona Lisa?"];
  
const choicesArray = [
    ["Earth", "Mars", "Jupiter", "Saturn"], 
    ['Me', 'Your Mom', 'The Neighbour', 'Leonardo DaVinci']];
  
const correctAnswers = ["Mars", 'Leonardo DaVinci'];
  
let currentQuestionIndex = 0;
let score = 0;
let retriesCount = 0;
  
const question = document.getElementById('question');
const choices = document.getElementById('choices');
const result = document.getElementById('result');
const retryButton = document.getElementById('retryButton');
const resetButton = document.getElementById('resetButton');
  
function displayQuestion() {
    if (currentQuestionIndex < questions.length) {
      question.innerHTML = questions[currentQuestionIndex];
  
    for (let i = 0; i < 4; i++) {
      const btn = document.getElementById(`choice${i+1}`);
      btn.innerHTML = choicesArray[currentQuestionIndex][i];
      btn.value = choicesArray[currentQuestionIndex][i];
    }
    } else {
      result.innerHTML = `You correctly answered ${score} out of 2`;
      question.innerHTML = '';
      choices.innerHTML = '';
      resetButton.style.display = 'block';
    }
  }
  
function checkAnswer(button) {
    if (button.value === correctAnswers[currentQuestionIndex]) {
      score++;
      currentQuestionIndex++;
    } else if (retriesCount < 1) {
        retryButton.style.display = 'block';
        result.innerHTML = 'Incorrect! You can try one more time';
        choices.style.display = 'none';
        question.style.display = 'none';
        return;
    } else if (currentQuestionIndex < questions.length) {
        currentQuestionIndex++;
        retriesCount = 0;
        retryButton.style.display = 'none';
        displayQuestion();
        return;
    } else {
        result.innerHTML = `You correctly answered ${score} out of ${questions.length}`;
        choices.style.display = 'none';
        question.style.display = 'none';
        return;
        }
        
        displayQuestion();
    }
  
function retryQuestion() {
    choices.style.display = 'block';
    question.style.display = 'block';
    question.innerHTML = questions[currentQuestionIndex];
    result.innerHTML = '';
    retryButton.style.display = 'none';
    retriesCount++;
  }
  
function createChoiceButtons() {
    for (let i = 1; i <= 4; i++) {
        const button = document.createElement('button');
        button.id = `choice${i}`;
        button.onclick = function() { checkAnswer(this); };
        choices.appendChild(button);
      }
  }
  
function resetGame() {
    score = 0;
    retriesCount = 0;
    resetButton.style.display = 'none';
    result.innerHTML = '';
    currentQuestionIndex = 0;
    createChoiceButtons();
    displayQuestion();
  }
  
displayQuestion();