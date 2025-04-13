import React from 'react';
import { Link } from 'react-router-dom';
import './CourseList.css';
import Course from '../Course/Course';
import { coursesData as courses } from '../../data'

const CourseList = () => {
  return (
    <div>
      <div className="course_wrapper">
        <h2 style={{textAlign: 'center'}}>In-demand <span>Courses</span></h2>
        <div className="course_container" style={{
          backdropFilter: 'blur',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '10px',
          padding: '20px'
        }}>
            {courses.map((course, index) => {
                return (
                    <Link to={`/course/${course.id}`} key={index}>
                      <Course course={course}/>
                    </Link>
                )
            })}
        </div>
      </div>
    </div>
  )
}

export default CourseList;
