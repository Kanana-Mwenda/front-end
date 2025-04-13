import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RemoveStudentForm from './RemoveStudentForm';
import StudentEnrollmentLineGraph from './StudentEnrollmentLineGraph';
import './Students.css';

function Students() {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lineGraphData, setLineGraphData] = useState([]);
  const API_BASE_URL = "http://127.0.0.1:5555";

  useEffect(() => {
    axios.get(`${API_BASE_URL}/students`)
      .then((res) => setStudents(res.data))
      .catch((error) => console.error('Error fetching students:', error));

    axios.get(`${API_BASE_URL}/student_enrollment_counts`)
      .then((res) => setLineGraphData(res.data))
      .catch((error) => console.error('Error fetching enrollment counts:', error));
  }, []);

  const handleRemoveStudent = (studentId) => {
    axios.delete(`${API_BASE_URL}/students/${studentId}`)
      .then(() => {
        setStudents(students.filter((student) => student.id !== studentId));
        setIsModalOpen(false);
        axios.get(`${API_BASE_URL}/student_enrollment_counts`)
        .then((res) => setLineGraphData(res.data))
        .catch((error) => console.error('Error fetching enrollment counts:', error));
      })
      .catch((error) => console.error('Error removing student:', error));
  };

  return (
    <div>
      <h1>Students</h1>
      <button
        className="remove-student-button"
        onClick={() => setIsModalOpen(true)}
      >
        Remove Student
      </button>

      {isModalOpen && (
        <RemoveStudentForm
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleRemoveStudent}
        />
      )}

      {students.length > 0 ? (
        <div className="card-container">
          {students.map((student) => (
            <div className="card" key={student.id}>
              <h3>{student.name}</h3>
              <p>Email: {student.email}</p>
              <p>ID: {student.id}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading students...</p>
      )}

      {lineGraphData.length > 0 && (
        <div className="line-graph-section">
          <h2>Student Enrollment Counts</h2>
          <StudentEnrollmentLineGraph data={lineGraphData} />
        </div>
      )}
    </div>
  );
}

export default Students;