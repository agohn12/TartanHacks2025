
let currentEmotion = "neutral";
let currentLevel = 1;
let correctAnswer = false;
let num1 = "" + 1;
let num2 = "" + 1;
let ans = num1 + num2;
let user_ans = "";
submitBtn.addEventListener('click', checkAnswer);
const board = document.getElementById("placeholder-box");
const answerBox = document.querySelector('.answer-box');
const number1 = document.createElement('h3');
const number2 = document.createElement('h3');
const line = document.createElement('h3');

positiveEmotions = ["happy", "surprise", "neutral"]
NegativeEmotions = ["angry", "sad", "disgust", "fear"]

// Define the async function
async function getEmotions() {
    try {
        const response = await fetch('http://127.0.0.1:5000/get_emotions');
        const data = await response.json();
        //console.log('Response from Python:', data.dominant_emotion);
        currentEmotion = data.dominant_emotion
        console.log(data.dominant_emotion);
    } catch (error) {
        console.error('Error calling Python function:', error);
    }
}

function checkAnswer()
{
    const userAnswer = parseInt(answerBox.value.trim(), 10);
}

function getNextProblem() {
    num1 = 1;
    num2 = 1;

    if (currentLevel < 4)
    {
       num1 = Math.floor(Math.random() * 10);
       num2 = Math.floor(Math.random() * 10);
    }
    else if (currentLevel < 8)
    {
        num1 = Math.floor(Math.random() * 10);
        num2 = Math.floor(Math.random() * (90)) + 10;
    }
    else
    {
        num1 = Math.floor(Math.random() * (90)) + 10;
        num2 = Math.floor(Math.random() * (90)) + 10;
    }

    ans = num1 + num2;
}

function displayProblem()
{
    number1.textContent = num1;
    number2.textContent = "+ " + num2;
    line.textContent = "------------------------";

    board.innerHTML = '';         
    board.appendChild(number1);     
    board.appendChild(line);            
    board.appendChild(number2);
}

// Set up window.onload
window.onload = function() {
    getEmotions();
    displayProblem();
    setInterval(getEmotions, 5000);
};