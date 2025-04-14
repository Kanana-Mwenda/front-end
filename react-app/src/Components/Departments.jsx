import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BarChart from './BarChart'; 
import DepartmentForm from './DepartmentForm';
import './Departments.css';

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const API_BASE_URL = "http://127.0.0.1:5555";

  useEffect(() => {
    axios.get(`${API_BASE_URL}/departments`)
      .then(res => {
        if (res.headers['content-type'].includes('application/json')) {
          setDepartments(res.data);
        } else {
          console.error('Departments data is not JSON:', res);
          setDepartments([]);
        }
      })
      .catch(error => console.error('Error fetching departments:', error));
  }, []);

  const handleAddDepartment = (newDepartment) => {
    axios.post(`${API_BASE_URL}/departments`, newDepartment)
      .then(res => {
        setDepartments([...departments, res.data]);
        setIsModalOpen(false);
      })
      .catch(error => console.error('Error adding department:', error));
  };

  const handleDeleteDepartment = (id) => {
    axios.delete(`${API_BASE_URL}/departments/${id}`)
      .then(() => {
        setDepartments(departments.filter(department => department.id !== id));
      })
      .catch(error => console.error('Error deleting department:', error));
  };

  return (
    <div>
      <h1>Departments</h1>
      <button className="add-department-button" onClick={() => setIsModalOpen(true)}>
        Add Department
      </button>

      {isModalOpen && (
        <DepartmentForm 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={handleAddDepartment} 
        />
      )}

      {/* Display Departments */}
      {departments.length > 0 ? (
        <>
          <div className="card-container">
            {departments.map(department => (
              <div className="card" key={department.id}>
                <h3>{department.name}</h3>
                <p>Location: {department.location}</p>
                <p>Head: {department.head}</p>
                <button 
                  className="delete-button" 
                  onClick={() => handleDeleteDepartment(department.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          <BarChart departments={departments} /> {/* Render the bar chart */}
        </>
      ) : (
        <p>Loading departments...</p>
      )}
    </div>
  );
}

export default Departments;
