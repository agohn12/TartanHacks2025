
let currentEmotion = "neutral";
let currentLevel = 1;
let num1 = 1;
let num2 = 1;
let ans = num1 + num2;
let userAns = "";
const board = document.getElementById("placeholder-box");
const answerBox = document.querySelector('.answer-box');
const submitBtn = document.querySelector('.submit-btn');
const emotionDisplay = document.getElementById("emotion-display");
submitBtn.addEventListener('click', checkAnswer);
const number1 = document.createElement('h3');
const number2 = document.createElement('h3');
const line = document.createElement('h4');

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
        if (positiveEmotions.includes(currentEmotion))
        {
            emotionDisplay.textContent = `You're doing amazing!! Keep up the good work!`;
        }
        else
        {
            emotionDisplay.textContent = "It's ok to feel frustrated but I believe in you!";
        }
        
    } catch (error) {
        console.error('Error calling Python function:', error);
    }
}

function checkAnswer()
{
     userAns = parseInt(answerBox.value.trim(), 10);

    if (userAns == ans)
    {
        if (currentLevel <= 8 && positiveEmotions.includes(currentEmotion))
        {
            currentLevel += 2;
        }
        answerBox.value = "";
        getNextProblem();
        displayProblem();
    }
    else if (NegativeEmotions.includes(currentEmotion) && currentLevel > 2)
    {
       currentLevel -= 2;
    }
    else if (PositiveEmotions.includes(currentEmotion) && currentLevel > 1)
    {
        currentLevel--;
    }
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
    line.textContent = "____________";

    board.innerHTML = '';         
    board.appendChild(number1);          
    board.appendChild(number2);
    board.appendChild(line);
}

// Set up window.onload
window.onload = function() {
    getEmotions();
    getNextProblem();
    displayProblem();
    setInterval(getEmotions, 5000);
};