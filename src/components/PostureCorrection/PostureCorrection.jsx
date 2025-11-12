import React, { useRef, useState, useEffect, useCallback } from 'react';
import './PostureCorrection.css';

const PostureCorrection = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [feedback, setFeedback] = useState('Select an exercise and start the camera.');
  const [feedbackStatus, setFeedbackStatus] = useState('neutral');
  const [repCount, setRepCount] = useState(0);
  const [selectedExercise, setSelectedExercise] = useState('none');
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  // Rep tracking state
  const repCounterRef = useRef(0);
  const repStateRef = useRef({
    leftStage: 'down',
    rightStage: 'down',
    squatStage: 'up',
    shoulderPressLeftStage: 'down',
    shoulderPressRightStage: 'down',
  });

  const setFeedbackAndStatus = (message, status) => {
    setFeedback(message);
    setFeedbackStatus(status);
  };

  const loadScripts = useCallback(() => {
    const scriptUrls = [
      'https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js',
      'https://cdn.jsdelivr.net/npm/@mediapipe/control_utils/control_utils.js',
      'https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js',
      'https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose.js',
    ];

    let scriptsLoadedCount = 0;
    scriptUrls.forEach((url) => {
      if (document.querySelector(`script[src="${url}"]`)) {
        scriptsLoadedCount++;
        if (scriptsLoadedCount === scriptUrls.length) setScriptsLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = url;
      script.crossOrigin = "anonymous";
      script.async = true;
      script.onload = () => {
        scriptsLoadedCount++;
        if (scriptsLoadedCount === scriptUrls.length) {
          setScriptsLoaded(true);
        }
      };
      document.body.appendChild(script);
    });
  }, []);

  useEffect(() => {
    loadScripts();
  }, [loadScripts]);

  const calculateAngle = (a, b, c) => {
    if (!a || !b || !c || a.visibility < 0.5 || b.visibility < 0.5 || c.visibility < 0.5) {
      return null;
    }
    const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
    let angle = Math.abs((radians * 180.0) / Math.PI);
    if (angle > 180.0) {
      angle = 360 - angle;
    }
    return angle;
  };

  const handleStartStop = () => {
    if (selectedExercise === 'none') {
      alert('Please select an exercise first.');
      return;
    }
    if (!isCameraActive) {
      setFeedbackAndStatus('Loading model...', 'neutral');
      setRepCount(0);
      repCounterRef.current = 0;
      repStateRef.current = { 
        leftStage: 'down', 
        rightStage: 'down', 
        squatStage: 'up',
        shoulderPressLeftStage: 'down',
        shoulderPressRightStage: 'down',
      };
    } else {
      setFeedbackAndStatus('Select an exercise and start the camera.', 'neutral');
    }
    setIsCameraActive((prev) => !prev);
  };

  useEffect(() => {
    if (!scriptsLoaded || !isCameraActive) {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
      return;
    }

    const videoElement = videoRef.current;
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext('2d');

    function onResults(results) {
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

      // Mirror canvas
      canvasCtx.translate(canvasElement.width, 0);
      canvasCtx.scale(-1, 1);

      canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

      let isFormGood = true;

      if (results.poseLandmarks) {
        const landmarks = results.poseLandmarks;

        try {
          if (selectedExercise === 'bicep_curl') {
            const [leftShoulder, leftElbow, leftWrist] = [landmarks[11], landmarks[13], landmarks[15]];
            const [rightShoulder, rightElbow, rightWrist] = [landmarks[12], landmarks[14], landmarks[16]];

            const leftElbowAngle = calculateAngle(leftShoulder, leftElbow, leftWrist);
            const rightElbowAngle = calculateAngle(rightShoulder, rightElbow, rightWrist);

            if (leftElbowAngle === null || rightElbowAngle === null) {
              setFeedbackAndStatus("Make sure both arms are visible", 'bad');
              isFormGood = false;
            } else {
              if (leftElbow.y < leftShoulder.y - 0.05 || rightElbow.y < rightShoulder.y - 0.05) {
                isFormGood = false;
                setFeedbackAndStatus("Don't lift your elbows!", 'bad');
              } else {
                setFeedbackAndStatus("Keep Going!", 'good');
              }

              if (leftElbowAngle > 160) repStateRef.current.leftStage = "down";
              if (leftElbowAngle < 40 && repStateRef.current.leftStage === 'down' && isFormGood) {
                repStateRef.current.leftStage = "up";
                repCounterRef.current++;
              }
              if (rightElbowAngle > 160) repStateRef.current.rightStage = "down";
              if (rightElbowAngle < 40 && repStateRef.current.rightStage === 'down' && isFormGood) {
                repStateRef.current.rightStage = "up";
                repCounterRef.current++;
              }
              setRepCount(Math.floor(repCounterRef.current / 2));
            }
          } else if (selectedExercise === 'squat') {
            const [hip, knee, ankle, shoulder, toe] = [landmarks[23], landmarks[25], landmarks[27], landmarks[11], landmarks[31]];

            const kneeAngle = calculateAngle(hip, knee, ankle);
            const backAngle = calculateAngle(shoulder, hip, knee);

            if (kneeAngle === null || backAngle === null) {
              setFeedbackAndStatus("Make sure your side profile is visible", 'bad');
              isFormGood = false;
            } else {
              if (kneeAngle > 165) repStateRef.current.squatStage = "up";

              if (kneeAngle < 100 && repStateRef.current.squatStage === 'up') {
                if (backAngle < 80) {
                  isFormGood = false;
                  setFeedbackAndStatus("Keep your back straighter!", 'bad');
                } else if (knee.x > toe.x + 0.05) {
                  isFormGood = false;
                  setFeedbackAndStatus("Don't let your knees go past your toes!", 'bad');
                } else {
                  isFormGood = true;
                  repStateRef.current.squatStage = "down";
                  repCounterRef.current++;
                  setRepCount(repCounterRef.current);
                  setFeedbackAndStatus("Perfect Squat!", 'good');
                }
              } else if (kneeAngle > 100 && repStateRef.current.squatStage === 'up' && kneeAngle < 150) {
                setFeedbackAndStatus("Go Lower!", 'neutral');
                isFormGood = true;
              }
            }
          } else if (selectedExercise === 'shoulder_press') {
            // IMPROVED SHOULDER PRESS LOGIC - FIXED ELBOW POSITION
            const [leftShoulder, leftElbow, leftWrist] = [landmarks[11], landmarks[13], landmarks[15]];
            const [rightShoulder, rightElbow, rightWrist] = [landmarks[12], landmarks[14], landmarks[16]];

            // Calculate shoulder angles for form check
            const leftElbowAngle = calculateAngle(leftShoulder, leftElbow, leftWrist);
            const rightElbowAngle = calculateAngle(rightShoulder, rightElbow, rightWrist);

            if (leftElbowAngle === null || rightElbowAngle === null) {
              setFeedbackAndStatus("Make sure both arms are visible", 'bad');
              isFormGood = false;
            } else {
              // Check for proper shoulder press form - FIXED ELBOW LOGIC
              const leftArmExtended = leftWrist.y < leftShoulder.y - 0.25; // Wrist well above shoulder
              const rightArmExtended = rightWrist.y < rightShoulder.y - 0.25;
              const leftArmBent = leftWrist.y > leftShoulder.y + 0.1; // Wrist at or below shoulder level
              const rightArmBent = rightWrist.y > rightShoulder.y + 0.1;

              // Check for excessive elbow flare (only warn if elbows go too far out)
              const leftElbowFlared = Math.abs(leftElbow.x - leftShoulder.x) > 0.25; // Increased threshold
              const rightElbowFlared = Math.abs(rightElbow.x - rightShoulder.x) > 0.25;

              // Only show warning for extreme elbow flare
              if (leftElbowFlared || rightElbowFlared) {
                setFeedbackAndStatus("Good! Try to keep elbows slightly forward", 'neutral');
                isFormGood = true;
              } else if (leftArmExtended && rightArmExtended) {
                // Both arms fully extended - COUNT REP
                if (repStateRef.current.shoulderPressLeftStage === 'down' && repStateRef.current.shoulderPressRightStage === 'down') {
                  repStateRef.current.shoulderPressLeftStage = 'up';
                  repStateRef.current.shoulderPressRightStage = 'up';
                  repCounterRef.current++;
                  setRepCount(repCounterRef.current);
                  setFeedbackAndStatus("Perfect! Full extension overhead", 'good');
                } else {
                  setFeedbackAndStatus("Hold at the top position", 'good');
                }
              } else if (leftArmBent && rightArmBent) {
                // Both arms bent (starting position) - READY FOR NEXT REP
                if (repStateRef.current.shoulderPressLeftStage === 'up' && repStateRef.current.shoulderPressRightStage === 'up') {
                  repStateRef.current.shoulderPressLeftStage = 'down';
                  repStateRef.current.shoulderPressRightStage = 'down';
                  setFeedbackAndStatus("Ready for next rep - press up!", 'neutral');
                } else {
                  setFeedbackAndStatus("Start position - press overhead", 'neutral');
                }
              } else {
                // In between positions - ENCOURAGEMENT
                if (leftWrist.y < leftShoulder.y || rightWrist.y < rightShoulder.y) {
                  setFeedbackAndStatus("Great! Keep pressing up", 'good');
                } else {
                  setFeedbackAndStatus("Press overhead with control", 'neutral');
                }
                isFormGood = true;
              }

              // Additional form tips based on elbow position
              const leftElbowForward = leftElbow.x > leftShoulder.x;
              const rightElbowForward = rightElbow.x < rightShoulder.x; // Mirrored

              if (leftElbowForward && rightElbowForward) {
                // Elbows are in good forward position
                if (!leftArmExtended && !rightArmExtended) {
                  setFeedbackAndStatus("Perfect elbow position! Continue pressing", 'good');
                }
              }
            }
          }
        } catch (error) {
          setFeedbackAndStatus("Body not fully visible", 'bad');
          isFormGood = false;
        }

        // Draw connectors
        const connectorColor = isFormGood ? '#00FF00' : '#FF0000';

        if (window.drawConnectors && window.drawLandmarks) {
          // Arms
          window.drawConnectors(canvasCtx, landmarks, [[11, 13], [13, 15]], { color: connectorColor, lineWidth: 4 });
          window.drawConnectors(canvasCtx, landmarks, [[12, 14], [14, 16]], { color: connectorColor, lineWidth: 4 });
          // Torso
          window.drawConnectors(canvasCtx, landmarks, [[11, 12], [11, 23], [12, 24], [23, 24]], { color: connectorColor, lineWidth: 4 });
          // Legs
          window.drawConnectors(canvasCtx, landmarks, [[23, 25], [25, 27], [24, 26], [26, 28]], { color: connectorColor, lineWidth: 4 });

          // Draw body landmarks
          const landmarksToDraw = [...landmarks.slice(11, 17), ...landmarks.slice(23, 33)];
          window.drawLandmarks(canvasCtx, landmarksToDraw, {
            color: '#42A5F5',
            lineWidth: 2,
            radius: 4,
          });
        }
      }
      canvasCtx.restore();
    }

    const pose = new window.Pose({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
      },
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      smoothSegmentation: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    pose.onResults(onResults);

    let camera;
    if (window.Camera) {
      camera = new window.Camera(videoElement, {
        onFrame: async () => {
          await pose.send({ image: videoElement });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }

    return () => {
      if (camera) {
        camera.stop();
      }
      if (videoElement && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
      if (pose) {
        pose.reset();
      }
      // Reset reps
      repCounterRef.current = 0;
      setRepCount(0);
      repStateRef.current = { 
        leftStage: 'down', 
        rightStage: 'down', 
        squatStage: 'up',
        shoulderPressLeftStage: 'down',
        shoulderPressRightStage: 'down',
      };
    };
  }, [isCameraActive, scriptsLoaded, selectedExercise]);

  return (
    <section id="fitness-coach" className="how-it-works-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">AI Fitness Coach</h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">
            Real-time form analysis powered by AI
          </p>
        </div>
        
        <div className="coach-container">
          <div className="coach-header">
            <div className="coach-badge">
              <i className="fas fa-robot"></i>
              AI Powered
            </div>
          </div>

          <p className="coach-description">
            Select an exercise and let our AI analyze your form in real-time. Stand back so your full body is visible!
            {selectedExercise === 'shoulder_press' && " For shoulder press, elbows will naturally move forward - this is normal!"}
          </p>

          <div className="coach-controls">
            <div className="control-group">
              <div className="control-label">
                <i className="fas fa-dumbbell"></i>
                Choose Exercise
              </div>
              <select
                className="exercise-select"
                value={selectedExercise}
                onChange={(e) => setSelectedExercise(e.target.value)}
                disabled={isCameraActive}
              >
                <option value="none">-- Select Exercise --</option>
                <option value="bicep_curl">Bicep Curls</option>
                <option value="squat">Squats</option>
                <option value="shoulder_press">Shoulder Press</option>
              </select>
            </div>
            
            <button 
              className={`coach-btn ${isCameraActive ? 'stop' : 'start'}`}
              onClick={handleStartStop}
            >
              {isCameraActive ? (
                <>
                  <i className="fas fa-stop"></i>
                  Stop Camera
                </>
              ) : (
                <>
                  <i className="fas fa-play"></i>
                  Start Camera
                </>
              )}
            </button>
          </div>

          <div className="coach-main-area">
            <div className="video-section">
              <div className="video-header">
                <h3>
                  <i className="fas fa-video"></i>
                  Live Camera Feed
                </h3>
                <div className="camera-status">
                  <div className={`status-indicator ${isCameraActive ? 'active' : 'inactive'}`}></div>
                  {isCameraActive ? 'Camera Active' : 'Camera Off'}
                </div>
              </div>
              <div className="coach-video-container">
                <video ref={videoRef} className="coach-video-feed" autoPlay playsInline muted></video>
                <canvas ref={canvasRef} className="coach-canvas" width="640" height="480"></canvas>
                {!isCameraActive && (
                  <div className="camera-overlay">
                    <i className="fas fa-camera"></i>
                    <p>Camera will activate when you start</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="feedback-section">
              <div className="feedback-header">
                <h3>
                  <i className="fas fa-comment-dots"></i>
                  Live Feedback
                </h3>
                <div className="feedback-emoji">
                  {feedbackStatus === 'good' ? '😊' : feedbackStatus === 'bad' ? '😟' : '💡'}
                </div>
              </div>
              
              <div className={`feedback-card ${feedbackStatus}`}>
                <div className="feedback-content">
                  <div className="feedback-icon">
                    {feedbackStatus === 'good' ? '✓' : feedbackStatus === 'bad' ? '!' : '●'}
                  </div>
                  <p className="feedback-text">{feedback}</p>
                </div>
              </div>
              
              <div className="stats-grid">
                <div className="stat-card primary">
                  <div className="stat-icon">
                    <i className="fas fa-repeat"></i>
                  </div>
                  <div className="stat-info">
                    <div className="stat-label">Reps Completed</div>
                    <div className="stat-value">{repCount}</div>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon">
                    <i className="fas fa-running"></i>
                  </div>
                  <div className="stat-info">
                    <div className="stat-label">Current Exercise</div>
                    <div className="stat-value exercise-name">
                      {selectedExercise === 'bicep_curl' ? 'Bicep Curls' : 
                       selectedExercise === 'squat' ? 'Squats' : 
                       selectedExercise === 'shoulder_press' ? 'Shoulder Press' : 'None'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostureCorrection;