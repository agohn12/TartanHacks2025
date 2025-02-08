from flask import Flask, jsonify
from flask_cors import CORS
import openai
openai.api_key = '<OPENAI_API_KEY>'
from deepface import DeepFace
import cv2
import time

app = Flask(__name__)
CORS(app)

@app.route('/get_emotions', methods=['GET'])
def get_emotions():
    vid = cv2.VideoCapture(0)
    frames_to_analyze = 15
    frame_interval = 0.5
    prev_time = time.time()
    emotion_counts = {'angry': 0, 'happy': 0, 'neutral': 0, 'sad': 0, 'surprise': 0, 'disgust': 0, 'fear': 0}

    while True:
        res, frame = vid.read()

        if res == False:
            print("Could not capture fram")
            break

        current_time = time.time()

        if current_time - prev_time >= frame_interval:
            prev_time = current_time
            result = DeepFace.analyze(frame, 'emotion', False)
            cur_emotion = result[0]['dominant_emotion']
        
            if cur_emotion in emotion_counts:
                emotion_counts[cur_emotion] += 1

        if sum(emotion_counts.values()) == frames_to_analyze:
            max_emotion = max(emotion_counts, key=emotion_counts.get)
            max_count = emotion_counts[max_emotion]
            emotion_counts = {emotion: 0 for emotion in emotion_counts}
            print(f"'{max_emotion}' '{max_count}'")
            return jsonify({"dominant_emotion": max_emotion, "count": max_count})

if __name__ == "__main__":
    app.run(debug=False, threaded=True)
