
let currentEmotion = "neutral";
let currentLevel = 1;
let correctAnswer = false;
let problem = [1, 1];

positiveEmotions = ["happy", "surprise", "neutral"]
NegativeEmotions = ["angry", "sad", "disgust", "fear"]

// Define the async function
async function callPythonFunction() {
    try {
        const response = await fetch('http://127.0.0.1:5000/get_emotions'); // Adjust URL for your server
        const data = await response.json();
        //console.log('Response from Python:', data.dominant_emotion);
        currentEmotion = data.dominant_emotion
        console.log(data.dominant_emotion);
    } catch (error) {
        console.error('Error calling Python function:', error);
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

    return [num1, num2];
}

// Set up window.onload
window.onload = function() {
    callPythonFunction();  // Call the function when the page has loaded
    setInterval(callPythonFunction, 5000);
};