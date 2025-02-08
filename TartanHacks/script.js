
let currentEmotion = "neutral";
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

// Set up window.onload
window.onload = function() {
    callPythonFunction();  // Call the function when the page has loaded
    setInterval(callPythonFunction, 5000);
};