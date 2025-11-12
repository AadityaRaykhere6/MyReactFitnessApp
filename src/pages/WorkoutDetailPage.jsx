import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { workoutData } from '../data'; // Aapke data file ka sahi path
import './WorkoutDetailPage.css'; // Is page ke liye CSS file

function WorkoutDetailPage() {
  const { level } = useParams();

  const workout = workoutData.find(
    (w) => w.level.toLowerCase() === level.toLowerCase()
  );

  if (!workout) {
    return (
      <div className="workout-detail-container">
        <h2>Workout not found!</h2>
        <p>The workout level you are looking for does not exist.</p>
        <Link to="/" className="back-link"> &larr; Go back to Home</Link>
      </div>
    );
  }

  return (
    <div className="workout-detail-container">
      <div className="workout-header">
        <i className={`${workout.icon}`} style={{ color: workout.color }}></i>
        <h1>{workout.title} - {workout.level} Workouts</h1>
        <p>{workout.description}</p>
      </div>
      
      <div className="exercise-list">
        <h2>Today's Routine 🏋️</h2>
        {workout.exercises.map((exercise, index) => (
          <div className="exercise-card" key={index} style={{ borderLeftColor: workout.color }}>
            
            {/* ## YAHAN IMG KO VIDEO SE BADLA GAYA HAI ## */}
            <video 
              src={exercise.videoUrl} 
              className="exercise-video" 
              autoPlay 
              loop 
              muted 
              playsInline
            >
              Your browser does not support the video tag.
            </video>
            
            <div className="exercise-info">
              <h3>{exercise.name}</h3>
              <div className="exercise-details">
                <span>Sets: {exercise.sets}</span>
                <span>Reps: {exercise.reps}</span>
              </div>
            </div>

          </div>
        ))}
      </div>
      <Link to="/" className="back-link"> &larr; Back to Home</Link>
    </div>
  );
}

export default WorkoutDetailPage;