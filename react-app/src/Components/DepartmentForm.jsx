import React, { useState } from 'react';
import './DepartmentForm.css';

function DepartmentForm({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({ name: '', location: '', head: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass the form data to the parent component
    setFormData({ name: '', location: '', head: '' }); // Reset the form
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add Department</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="head"
            placeholder="Head"
            value={formData.head}
            onChange={handleChange}
            required
          />
          <div className="form-buttons">
            <button type="submit" className="submit-button">Add</button>
            <button type="button" className="close-button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DepartmentForm;
