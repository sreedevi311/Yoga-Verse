# import cv2
# import mediapipe as mp
# import math
# import pyttsx3
# import time
# import threading

# # Initialize text-to-speech engine
# engine = pyttsx3.init()
# engine.setProperty('rate', 150)
# engine.setProperty('volume', 1.0)

# def speak(text):
#     def run():
#         print("Speaking:", text)
#         engine.say(text)
#         engine.runAndWait()
#         time.sleep(0.5)
#     threading.Thread(target=run).start()

# def calculate_angle(a, b, c):
#     a = [a.x, a.y]
#     b = [b.x, b.y]
#     c = [c.x, c.y]
#     radians = math.atan2(c[1] - b[1], c[0] - b[0]) - math.atan2(a[1] - b[1], a[0] - b[0])
#     angle = abs(radians * 180.0 / math.pi)
#     if angle > 180:
#         angle = 360 - angle
#     return angle

# def distance_2d(a, b):
#     return math.sqrt((a.x - b.x)*2 + (a.y - b.y)*2)

# mp_drawing = mp.solutions.drawing_utils
# mp_pose = mp.solutions.pose

# cap = cv2.VideoCapture(0)

# current_step = 1
# step_instruction_given = False
# last_feedback = ""
# last_spoken_time = time.time()
# pose_hold_start_time = None
# pose_hold_duration = 20  # seconds

# with mp_pose.Pose(min_detection_confidence=0.8, min_tracking_confidence=0.8) as pose:
#     while cap.isOpened():
#         ret, frame = cap.read()
#         if not ret:
#             break

#         frame = cv2.flip(frame, 1)
#         image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
#         image.flags.writeable = False
#         results = pose.process(image)

#         image.flags.writeable = True
#         image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

#         feedback = []

#         # Step instructions
#         if current_step == 1 and not step_instruction_given:
#             speak("Step 1. Raise both arms above your head.")
#             step_instruction_given = True

#         if current_step == 2 and not step_instruction_given:
#             speak("Step 2. Place one foot on the opposite knee and keep the other leg straight.")
#             step_instruction_given = True

#         try:
#             landmarks = results.pose_landmarks.landmark

#             # Measurements
#             head_y = landmarks[mp_pose.PoseLandmark.NOSE.value].y
#             left_wrist_y = landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].y
#             right_wrist_y = landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].y

#             left_elbow_angle = calculate_angle(
#                 landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value],
#                 landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value],
#                 landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value],
#             )
#             right_elbow_angle = calculate_angle(
#                 landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value],
#                 landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value],
#                 landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value],
#             )

#             left_knee_angle = calculate_angle(
#                 landmarks[mp_pose.PoseLandmark.LEFT_HIP.value],
#                 landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value],
#                 landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value],
#             )
#             right_knee_angle = calculate_angle(
#                 landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value],
#                 landmarks[mp_pose.PoseLandmark.RIGHT_KNEE.value],
#                 landmarks[mp_pose.PoseLandmark.RIGHT_ANKLE.value],
#             )

#             left_ankle = landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value]
#             right_knee = landmarks[mp_pose.PoseLandmark.RIGHT_KNEE.value]
#             right_ankle = landmarks[mp_pose.PoseLandmark.RIGHT_ANKLE.value]
#             left_knee = landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value]

#             left_foot_near_right_knee = distance_2d(left_ankle, right_knee) < 0.06
#             right_foot_near_left_knee = distance_2d(right_ankle, left_knee) < 0.06
#             one_leg_straight = (160 <= left_knee_angle <= 200) or (160 <= right_knee_angle <= 200)

#             arms_straight = (170 <= left_elbow_angle <= 190) and (170 <= right_elbow_angle <= 190)
#             arms_raised = (left_wrist_y < head_y) and (right_wrist_y < head_y)

#             # Step 1 validation
#             if current_step == 1:
#                 if not arms_straight:
#                     feedback.append("Straighten both arms")
#                 if not arms_raised:
#                     feedback.append("Raise both arms above head")

#                 if not feedback:
#                     speak("Good job! Now move to Step 2.")
#                     current_step = 2
#                     step_instruction_given = False
#                     last_feedback = ""
#                 else:
#                     feedback_msg = ", ".join(feedback)
#                     if feedback_msg != last_feedback and time.time() - last_spoken_time > 2:
#                         speak(feedback_msg)
#                         last_feedback = feedback_msg
#                         last_spoken_time = time.time()

#             # Step 2 validation (includes Step 1 recheck)
#             elif current_step == 2:
#                 if not arms_straight:
#                     feedback.append("Straighten both arms")
#                 if not arms_raised:
#                     feedback.append("Raise both arms above head")
#                 if not one_leg_straight:
#                     feedback.append("Keep one leg straight")
#                 if not (left_foot_near_right_knee or right_foot_near_left_knee):
#                     feedback.append("Place one foot on opposite knee")

#                 if not feedback:
#                     speak("Excellent! Hold the Tree Pose for 20 seconds.")
#                     current_step = 3
#                     pose_hold_start_time = time.time()
#                     last_feedback = ""
#                 else:
#                     feedback_msg = ", ".join(feedback)
#                     if feedback_msg != last_feedback and time.time() - last_spoken_time > 2:
#                         speak(feedback_msg)
#                         last_feedback = feedback_msg
#                         last_spoken_time = time.time()

#             # Step 3: Hold pose for 20 seconds
#             elif current_step == 3:
#                 if not arms_straight or not arms_raised or not one_leg_straight or not (left_foot_near_right_knee or right_foot_near_left_knee):
#                     feedback.append("Maintain the Tree Pose")
#                     pose_hold_start_time = None  # Reset timer
#                     if feedback_msg != last_feedback and time.time() - last_spoken_time > 2:
#                         speak("You broke the pose. Please hold again.")
#                         last_feedback = "You broke the pose"
#                         last_spoken_time = time.time()
#                 else:
#                     if pose_hold_start_time:
#                         elapsed = time.time() - pose_hold_start_time
#                         if elapsed >= pose_hold_duration:
#                             speak("Well done! You held the Tree Pose for 20 seconds.")
#                             current_step = 4
#                         else:
#                             feedback_msg = f"Hold the pose... {int(pose_hold_duration - elapsed)} seconds left"
#                     else:
#                         pose_hold_start_time = time.time()

#             feedback_msg = " ".join(feedback) if feedback else feedback_msg if 'feedback_msg' in locals() else "Pose looks good"
#             cv2.putText(image, feedback_msg, (20, 50), cv2.FONT_HERSHEY_SIMPLEX,
#                         1, (0, 0, 255), 2, cv2.LINE_AA)

#             mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)

#         except Exception:
#             feedback_msg = "Pose not detected, please adjust"
#             if feedback_msg != last_feedback and time.time() - last_spoken_time > 2:
#                 speak(feedback_msg)
#                 last_feedback = feedback_msg
#                 last_spoken_time = time.time()
#             cv2.putText(image, feedback_msg, (20, 50), cv2.FONT_HERSHEY_SIMPLEX,
#                         1, (0, 0, 255), 2, cv2.LINE_AA)

#         cv2.imshow('Tree Pose Detection', image)

#         if cv2.waitKey(10) & 0xFF == ord('q'):
#             break

# cap.release()
# cv2.destroyAllWindows()

import cv2
import mediapipe as mp
import math
import pyttsx3
import time
import threading
from flask import Flask, Response, jsonify
from flask_cors import CORS, cross_origin

# ===== Flask app =====
app = Flask(__name__)
CORS(app)  # allow cross-origin requests

# ===== TTS setup =====
engine = pyttsx3.init()
engine.setProperty('rate', 150)
engine.setProperty('volume', 1.0)

def speak(text):
    def run():
        engine.say(text)
        engine.runAndWait()
    threading.Thread(target=run).start()

# ===== Helper functions =====
def calculate_angle(a, b, c):
    a = [a.x, a.y]
    b = [b.x, b.y]
    c = [c.x, c.y]
    radians = math.atan2(c[1]-b[1], c[0]-b[0]) - math.atan2(a[1]-b[1], a[0]-b[0])
    angle = abs(radians*180.0/math.pi)
    if angle > 180: angle = 360 - angle
    return angle

def distance_2d(a, b):
    return math.sqrt((a.x-b.x)**2 + (a.y-b.y)**2)  # corrected formula

# ===== Pose Detector Thread =====
class PoseDetector(threading.Thread):
    def __init__(self):
        super().__init__()
        self.cap = None
        # Try multiple camera indices if 0 fails
        for i in range(3):
            cap = cv2.VideoCapture(i)
            if cap.isOpened():
                self.cap = cap
                print(f"Camera found at index {i}")
                break
        if self.cap is None:
            print("ERROR: Cannot access camera")
            exit(1)

        self.mp_pose = mp.solutions.pose
        self.mp_drawing = mp.solutions.drawing_utils
        self.frame = None
        self.feedback_msg = "Waiting for pose detection..."
        self.running = True

        self.current_step = 1
        self.step_instruction_given = False
        self.last_spoken_time = time.time()
        self.pose_hold_start_time = None
        self.pose_hold_duration = 20  # seconds

    def run(self):
        with self.mp_pose.Pose(min_detection_confidence=0.8, min_tracking_confidence=0.8) as pose:
            while self.running:
                ret, frame = self.cap.read()
                if not ret: continue
                frame = cv2.flip(frame, 1)
                image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                image.flags.writeable = False
                results = pose.process(image)
                image.flags.writeable = True
                image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
                feedback = []

                try:
                    landmarks = results.pose_landmarks.landmark
                    head_y = landmarks[self.mp_pose.PoseLandmark.NOSE.value].y
                    left_wrist_y = landmarks[self.mp_pose.PoseLandmark.LEFT_WRIST.value].y
                    right_wrist_y = landmarks[self.mp_pose.PoseLandmark.RIGHT_WRIST.value].y

                    left_elbow_angle = calculate_angle(
                        landmarks[self.mp_pose.PoseLandmark.LEFT_SHOULDER.value],
                        landmarks[self.mp_pose.PoseLandmark.LEFT_ELBOW.value],
                        landmarks[self.mp_pose.PoseLandmark.LEFT_WRIST.value]
                    )
                    right_elbow_angle = calculate_angle(
                        landmarks[self.mp_pose.PoseLandmark.RIGHT_SHOULDER.value],
                        landmarks[self.mp_pose.PoseLandmark.RIGHT_ELBOW.value],
                        landmarks[self.mp_pose.PoseLandmark.RIGHT_WRIST.value]
                    )

                    left_knee_angle = calculate_angle(
                        landmarks[self.mp_pose.PoseLandmark.LEFT_HIP.value],
                        landmarks[self.mp_pose.PoseLandmark.LEFT_KNEE.value],
                        landmarks[self.mp_pose.PoseLandmark.LEFT_ANKLE.value]
                    )
                    right_knee_angle = calculate_angle(
                        landmarks[self.mp_pose.PoseLandmark.RIGHT_HIP.value],
                        landmarks[self.mp_pose.PoseLandmark.RIGHT_KNEE.value],
                        landmarks[self.mp_pose.PoseLandmark.RIGHT_ANKLE.value]
                    )

                    left_ankle = landmarks[self.mp_pose.PoseLandmark.LEFT_ANKLE.value]
                    right_knee = landmarks[self.mp_pose.PoseLandmark.RIGHT_KNEE.value]
                    right_ankle = landmarks[self.mp_pose.PoseLandmark.RIGHT_ANKLE.value]
                    left_knee = landmarks[self.mp_pose.PoseLandmark.LEFT_KNEE.value]

                    left_foot_near_right_knee = distance_2d(left_ankle, right_knee) < 0.06
                    right_foot_near_left_knee = distance_2d(right_ankle, left_knee) < 0.06
                    one_leg_straight = (160 <= left_knee_angle <= 200) or (160 <= right_knee_angle <= 200)
                    arms_straight = (170 <= left_elbow_angle <= 190) and (170 <= right_elbow_angle <= 190)
                    arms_raised = (left_wrist_y < head_y) and (right_wrist_y < head_y)

                    # Step logic (same as your original)
                    if self.current_step == 1 and not self.step_instruction_given:
                        speak("Step 1. Raise both arms above your head.")
                        self.step_instruction_given = True
                    if self.current_step == 1:
                        if not arms_straight: feedback.append("Straighten both arms")
                        if not arms_raised: feedback.append("Raise both arms above head")
                        if not feedback:
                            speak("Good job! Now move to Step 2.")
                            self.current_step = 2
                            self.step_instruction_given = False
                    elif self.current_step == 2:
                        if not arms_straight: feedback.append("Straighten both arms")
                        if not arms_raised: feedback.append("Raise both arms above head")
                        if not one_leg_straight: feedback.append("Keep one leg straight")
                        if not (left_foot_near_right_knee or right_foot_near_left_knee): feedback.append("Place one foot on opposite knee")
                        if not feedback:
                            speak("Excellent! Hold the Tree Pose for 20 seconds.")
                            self.current_step = 3
                            self.pose_hold_start_time = time.time()
                    elif self.current_step == 3:
                        if not arms_straight or not arms_raised or not one_leg_straight or not (left_foot_near_right_knee or right_foot_near_left_knee):
                            feedback.append("Maintain the Tree Pose")
                            self.pose_hold_start_time = None
                        else:
                            if self.pose_hold_start_time:
                                elapsed = time.time() - self.pose_hold_start_time
                                if elapsed >= self.pose_hold_duration:
                                    speak("Well done! You held the Tree Pose for 20 seconds.")
                                    self.current_step = 4
                                else:
                                    feedback.append(f"Hold the pose... {int(self.pose_hold_duration - elapsed)}s left")
                            else:
                                self.pose_hold_start_time = time.time()

                    self.feedback_msg = ", ".join(feedback) if feedback else "Pose looks good"
                    self.mp_drawing.draw_landmarks(image, results.pose_landmarks, self.mp_pose.POSE_CONNECTIONS)
                    self.frame = image

                except Exception:
                    self.feedback_msg = "Pose not detected, please adjust"
                    self.frame = frame

detector = PoseDetector()
detector.start()

# ===== Flask MJPEG feed =====
def gen_frames():
    while True:
        if detector.frame is None:
            continue
        _, buffer = cv2.imencode('.jpg', detector.frame)
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


@cross_origin()
@app.route('/video_feed')
@cross_origin()
def video_feed():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/feedback')
def feedback():
    return jsonify({"feedback": detector.feedback_msg})

if __name__ == "__main__":
    try:
        app.run(host="0.0.0.0", port=5001, debug=False, threaded=True)
    finally:
        detector.running = False
        if detector.cap:
            detector.cap.release()

