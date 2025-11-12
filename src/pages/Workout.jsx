import React from 'react';
import BodyMap from '../components/BodyMap/BodyMap';
import './Workout.css';

function Workout() {
  return (
    <div className="workout-page">
      {/* BodyMap component yahan directly add kiya */}
      <BodyMap />
      
      {/* Agar tumhe koi aur content add karna hai workout page pe */}
      <div className="workout-additional-content">
        {/* Yahan tum workout plans, routines, etc. add kar sakte ho */}
      </div>
    </div>
  );
}

export default Workout;