// RemoveStudentForm.jsx
import React, { useState } from 'react';
import './RemoveStudentForm.css';

function RemoveStudentForm({ onClose, onSubmit }) {
  const [studentId, setStudentId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedStudentId = parseInt(studentId, 10); // Convert studentId to a number
    if (!isNaN(parsedStudentId)) {
      onSubmit(parsedStudentId); // Pass the student ID to parent for removal
      setStudentId(''); // Reset the form
    } else {
      alert('Please enter a valid Student ID'); // Display error for invalid input
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Remove Student</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />
          <div className="form-buttons">
            <button type="submit" className="submit-button">Remove</button>
            <button type="button" className="close-button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RemoveStudentForm;