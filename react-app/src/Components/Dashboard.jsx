import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Link, useLocation } from "react-router-dom";
import { Chart, registerables } from "chart.js";
import axios from "axios";
import "./Dashboard.css";
import DashboardBarGraph from './DashboardBarGraph';

Chart.register(...registerables);

const Dashboard = () => {
    const [courses, setCourses] = useState([]);
    const [studentProgress, setStudentProgress] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [enrollmentsData, setEnrollmentsData] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const API_BASE_URL = "http://127.0.0.1:5555";
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const coursesResponse = await axios.get(`${API_BASE_URL}/courses`);
                if (coursesResponse.headers["content-type"].includes("application/json")) {
                    setCourses(coursesResponse.data);
                } else {
                    console.error("Courses data is not JSON:", coursesResponse);
                    setCourses([]);
                }

                const studentsResponse = await axios.get(`${API_BASE_URL}/students`);
                if (studentsResponse.headers["content-type"].includes("application/json")) {
                    const progressData = Array.isArray(studentsResponse.data)
                        ? studentsResponse.data.map((student) => ({
                            course: Array.isArray(student.courses) && student.courses.length > 0
                                ? student.courses.map((course) => course.title).join(", ")
                                : "No Courses Available",
                            progress: Array.isArray(student.enrollments)
                                ? student.enrollments.length
                                : 0,
                            name: student.name,
                        }))
                        : [];
                    setStudentProgress(progressData);
                } else {
                    console.error("Students data is not JSON:", studentsResponse);
                    setStudentProgress([]);
                }

                const enrollmentsResponse = await axios.get(`${API_BASE_URL}/enrollments`);
                if (enrollmentsResponse.headers["content-type"].includes("application/json")) {
                    const enrollments = Array.isArray(enrollmentsResponse.data)
                        ? enrollmentsResponse.data.map((enrollment) => ({
                            studentName: enrollment.student?.name || "Unknown",
                            courseTitle: enrollment.course?.title || "Unknown Course",
                            grade: enrollment.grade || "0",
                        }))
                        : [];
                    setEnrollmentsData(enrollments);
                } else {
                    console.error("Enrollments data is not JSON:", enrollmentsResponse);
                    setEnrollmentsData([]);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const coursePieData = {
        labels: courses.map((course) => course.title),
        datasets: [
            {
                data: courses.map((course) => parseInt(course.duration, 10) || 0),
                backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(153, 102, 255, 0.6)",
                    "rgba(255, 159, 64, 0.6)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    const handleViewDetails = (course) => {
        setSelectedCourse(course);
    };

    const handleCloseDetails = () => {
        setSelectedCourse(null);
    };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const uniqueCourses = [...new Set(enrollmentsData.map(item => item.courseTitle))];
    const barGraphData = uniqueCourses.map(courseTitle => {
        const filteredEnrollments = enrollmentsData.filter(item => item.courseTitle === courseTitle);
        const enrollmentCount = filteredEnrollments.length;
        const averageGrade = filteredEnrollments.reduce((acc, item) => acc + (parseInt(item.grade) || 0), 0) / enrollmentCount || 0;
        return { courseTitle, enrollmentCount, averageGrade };
    });

    return (
        <div className={`dashboard-container ${isDarkMode ? "dark-mode" : "light-mode"}`}>
            <div className="navigation-links">
                <Link to="/dashboard" className={location.pathname === "/dashboard" ? "active" : ""}>Dashboard</Link>
                <Link to="/departments" className={location.pathname === "/departments" ? "active" : ""}>Departments</Link>
                <Link to="/students" className={location.pathname === "/students" ? "active" : ""}>Students</Link>
                <Link to='/enrolled-students' className={location.pathname === "/enrolled-students" ? "active" : ""}>Enrolled Students</Link>
            </div>
            <button className="theme-toggle-button" onClick={toggleTheme}>
                Switch to {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
            <div className="courses-section">
                <h2>Courses</h2>
                <div className="courses-grid">
                    {courses.map((course) => (
                        <div key={course.id} className="course-card">
                            <img src={course.image_url} alt={course.title} className="course-image" />
                            <h3>{course.title}</h3>
                            <p>
                                <strong>Duration:</strong> {course.duration}
                            </p>
                            <button onClick={() => handleViewDetails(course)}>View Details</button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="progress-section">
                <h2>Student Progress</h2>
                <Pie data={coursePieData} options={{ responsive: true }} />
            </div>
            <div className="progress-section-2">
                <h2>Enrollments and Grades by Course</h2>
                {barGraphData.length > 0 ? (
                    <DashboardBarGraph data={barGraphData} />
                ) : (
                    <p>Loading enrollment data...</p>
                )}
            </div>
            {selectedCourse && (
                <div className="course-details-modal">
                    <div className="course-details-content">
                        <h3>{selectedCourse.title}</h3>
                        <p>{selectedCourse.description}</p>
                        <button onClick={handleCloseDetails}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;