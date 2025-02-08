from flask import Flask, jsonify, request
from flask_cors import CORS
from deepface import DeepFace
import cv2
import time

app = Flask(__name__)
CORS(app)

#Gets emotion from webcam
@app.route('/get_emotions', methods=['GET'])
def get_emotions():
    #Starts video
    vid = cv2.VideoCapture(0)

    #Number of frames to analyze before determining emotion
    frames_to_analyze = 15

    #How often to grab a frame from the webcam
    frame_interval = 0.5

    #Get time
    prev_time = time.time()

    #Number of times each emotion was detected in a frame
    emotion_counts = {'angry': 0, 'happy': 0, 'neutral': 0, 'sad': 0, 'surprise': 0, 'disgust': 0, 'fear': 0}

    while True:

        #Grab current frame from webcam
        res, frame = vid.read()

        #break if frame couldn't be captured
        if res == False:
            print("Could not capture fram")
            break
        
        #Get current time
        current_time = time.time()

        #If time elapsed is greater than required interval between frames
        if current_time - prev_time >= frame_interval:
            prev_time = current_time
            #Analyze and grab emotion in frame
            result = DeepFace.analyze(frame, 'emotion', False)
            cur_emotion = result[0]['dominant_emotion']

            #Increase emotion count for emotion detected
            if cur_emotion in emotion_counts:
                emotion_counts[cur_emotion] += 1

        #If we reached the number of frames to analyze
        if sum(emotion_counts.values()) == frames_to_analyze:
            
            #grab the emotion with the highest count in analyzed frames
            max_emotion = max(emotion_counts, key=emotion_counts.get)
            max_count = emotion_counts[max_emotion]

            #Reset emotion counts and return
            emotion_counts = {emotion: 0 for emotion in emotion_counts}
            return jsonify({"dominant_emotion": max_emotion, "count": max_count})

if __name__ == "__main__":
    app.run(debug=False, threaded=True)
