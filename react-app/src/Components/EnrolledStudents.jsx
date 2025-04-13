import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EnrolledStudents.css';

function EnrolledStudents() {
    const [enrolledStudents, setEnrolledStudents] = useState([]);
    const API_BASE_URL = 'http://127.0.0.1:5555';

    useEffect(() => {
        fetchEnrollments();
    }, []);

    const fetchEnrollments = () => {
        axios.get(`${API_BASE_URL}/enrollments`)
            .then((res) => {
                if (res.headers['content-type'].includes('application/json')) {
                    const enrollments = res.data;
                    const studentCoursePairs = enrollments.map(enrollment => ({
                        id: enrollment.id, // Include the enrollment ID
                        studentName: enrollment.student.name,
                        courseTitle: enrollment.course.title,
                        courseImage: enrollment.course.image_url,
                        courseDescription: enrollment.course.description,
                    }));
                    setEnrolledStudents(studentCoursePairs);
                } else {
                    console.error('Enrollment Data not in JSON:', res);
                    setEnrolledStudents([]);
                }
            })
            .catch((error) => console.error('Error fetching Enrollments:', error));
    };

    const handleRemoveEnrollment = (enrollmentId) => {
        axios.delete(`${API_BASE_URL}/enrollments/${enrollmentId}`)
            .then(() => {
                fetchEnrollments(); // Refresh the list after deletion
            })
            .catch((error) => console.error('Error removing enrollment:', error));
    };

    return (
        <div>
            <h1>Enrolled Students</h1>
            {enrolledStudents.length > 0 ? (
                <div className="enrolled-students-container">
                    {enrolledStudents.map((pair, index) => (
                        <div className="enrolled-student-card" key={index}>
                            <p><strong>Student:</strong> {pair.studentName}</p>
                            <p><strong>Course:</strong> {pair.courseTitle}</p>
                            {pair.courseImage && (
                                <img
                                    src={pair.courseImage}
                                    alt={pair.courseTitle}
                                    className="course-image"
                                />
                            )}
                            {pair.courseDescription && (
                                <p><strong>Description:</strong> {pair.courseDescription}</p>
                            )}
                            <button className="remove-btn" onClick={() => handleRemoveEnrollment(pair.id)}>
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading enrolled students...</p>
            )}
        </div>
    );
}

export default EnrolledStudents;