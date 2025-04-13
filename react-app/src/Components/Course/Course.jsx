import React from 'react';
import './Course.css';

const Course = ({ course }) => {
  return (
    <div className="course_card">
      <div className="course_image">
        <img src={course.image} alt={course.title} />
      </div>
      <div className="course_info">
        <h3>{course.title}</h3>
        <p>{course.description}</p>
        <div className="course_meta">
          <span>{course.duration}</span>
          <span>{course.level}</span>
        </div>
      </div>
    </div>
  );
};

export default Course;
