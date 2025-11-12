import React, { useState } from 'react';
import axios from 'axios';
import './AddClassForm.css';

function AddClassForm({ onClassAdded }) {
  const [name, setName] = useState('');
  const [trainer, setTrainer] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !trainer || !duration) {
      return alert("Please fill all fields");
    }

    const newClass = {
      name,
      trainer,
      duration: Number(duration),
    };

    try {
      const response = await axios.post('http://localhost:8000/api/classes', newClass);
      onClassAdded(response.data); // Parent component ko batayein ki class add ho gayi hai
      // Form fields ko reset karein
      setName('');
      setTrainer('');
      setDuration('');
    } catch (error) {
      console.error("Error adding class:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-class-form">
      <h2>Add a New Class</h2>
      <div className="form-group">
        <label>Class Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Trainer Name</label>
        <input type="text" value={trainer} onChange={(e) => setTrainer(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Duration (in mins)</label>
        <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />
      </div>
      <button type="submit" className="form-button">Add Class</button>
    </form>
  );
}

export default AddClassForm;