//Emotion of user
let currentEmotion = "neutral";

//Current problem level (1-10)
let currentLevel = 1;

//Numbers to add and answer
let num1 = 1;
let num2 = 1;
let ans = num1 + num2;
//User's inputed answer
let userAns = "";

//Get elements from html
const board = document.getElementById("placeholder-box");
const answerBox = document.querySelector('.answer-box');
const submitBtn = document.querySelector('.submit-btn');
const emotionDisplay = document.getElementById("emotion-display");

//When submit button is clicked, check answer
submitBtn.addEventListener('click', checkAnswer);

//Create elements for html
const number1 = document.createElement('h3');
const number2 = document.createElement('h3');
const line = document.createElement('h4');

//Positive and negative emotions that can be detected
positiveEmotions = ["happy", "surprise", "neutral"]
NegativeEmotions = ["angry", "sad", "disgust", "fear"]

//Gets emotion from webcam
async function getEmotions() {
    try {
        const response = await fetch('http://127.0.0.1:5000/get_emotions');
        const data = await response.json();
        currentEmotion = data.dominant_emotion
        console.log(data.dominant_emotion);

        //If positive emotion print out a positive message
        if (positiveEmotions.includes(currentEmotion))
        {
            emotionDisplay.innerHTML = "You're doing <br> amazing!! Keep <br> up the good <br> work!";
        }
        else //Print message that it is ok to feel down
        {
            emotionDisplay.innerHTML = "It's ok to feel <br> frustrated but <br> I believe in you!";
        }
        
    } catch (error) {
        console.error('Error calling getEmotions:', error);
    }
}

//Checks answer that user submits
function checkAnswer()
{
    //Get user's input
     userAns = parseInt(answerBox.value.trim(), 10);

    if (userAns == ans)
    {   //If user answered correctly and is in a positive mood increase level by 2
        if (currentLevel <= 8 && positiveEmotions.includes(currentEmotion))
        {
            currentLevel += 2;
        }
        //Reset user's answer, and get and display next problem
        answerBox.value = "";
        getNextProblem();
        displayProblem();
    }
    else if (NegativeEmotions.includes(currentEmotion) && currentLevel > 2) //If incorrect answer and negative emotion decrease level by 2
    {
       currentLevel -= 2;
    }
    else if (positiveEmotions.includes(currentEmotion) && currentLevel > 1) //If incorrect answer and positive mood decrease level by 1
    {
        currentLevel--;
    }
}

//Gets the next problem to display
function getNextProblem() {

    if (currentLevel < 4) // If easy level add two single digits
    {
       num1 = Math.floor(Math.random() * 10);
       num2 = Math.floor(Math.random() * 10);
    }
    else if (currentLevel < 8) //If medium level add a single and double digit
    {
        num1 = Math.floor(Math.random() * 10);
        num2 = Math.floor(Math.random() * (90)) + 10;
    }
    else //If hard level add two double digits
    {
        num1 = Math.floor(Math.random() * (90)) + 10;
        num2 = Math.floor(Math.random() * (90)) + 10;
    }

    //Update answer
    ans = num1 + num2;
}

//Displays problem on screen
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

//When application is loaded get user's emotion and display problem
window.onload = function() {
    getEmotions();
    getNextProblem();
    displayProblem();
    setInterval(getEmotions, 5000);
};