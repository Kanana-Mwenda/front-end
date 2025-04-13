import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { useNavigate, useLocation } from 'react-router-dom';
import './LoginSignup.css';
import axios from 'axios';

const LoginSignup = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [action, setAction] = useState('login');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const userType = location.state?.userType || 'student';
    const baseUrl = 'http://localhost:5555';

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = userType === 'student' ? '/students' : '/instructors';
        const data = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
        };

        try {
            if (action === 'login') {
                axios.get(`${baseUrl}${url}`)
                    .then((response) => {
                        const users = response.data;
                        const user = users.find(
                            (u) =>
                                u.email === formData.email &&
                                u.name === formData.name // Validate email and name
                        );
                        if (user) {
                            alert('Successfully logged in.');
                            if (userType === 'student') {
                                navigate('/home');
                            } else {
                                navigate('/dashboard');
                            }
                        } else {
                            alert('Invalid email or name.');
                        }
                    })
                    .catch(() => {
                        alert('An error occurred. Please try again.');
                    });
            } else {
                axios.get(`${baseUrl}${url}`)
                    .then((response) => {
                        const users = response.data;
                        const existingUser = users.find(
                            (u) => u.name === formData.name && u.email === formData.email // Check if name and email already exist
                        );
                        if (existingUser) {
                            alert('User already exists.');
                        } else {
                            axios.post(`${baseUrl}${url}`, data)
                                .then((response) => {
                                    const responseData = response.data;
                                    if (responseData && responseData.email) {
                                        alert('Registration successful.');
                                        if (userType === 'student') {
                                            navigate('/home');
                                        } else {
                                            navigate('/dashboard');
                                        }
                                    } else {
                                        alert('Registration failed. Please try again.');
                                    }
                                })
                                .catch(() => {
                                    alert('Registration failed. Email might already exist.');
                                });
                        }
                    })
                    .catch(() => {
                        alert('An error occurred while checking for existing users.');
                    });
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An unexpected error occurred. Please try again.');
        }
    };

    const toggleAction = () => {
        setAction(action === 'login' ? 'register' : 'login');
    };

    return (
        <div className="login-container">
            <div className={`wrapper ${action === 'register' ? 'active' : ''}`}>
                <div className="form-box login">
                    <form onSubmit={handleSubmit}>
                        <h1>{userType === 'student' ? 'Student Login' : 'Instructor Login'}</h1>
                        <div className="input-box">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <FaUser className="icon" />
                        </div>
                        <div className="input-box">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <MdEmail className="icon" />
                        </div>
                        <button type="submit">Login</button>
                        <div className="register-link">
                            <p>
                                Don't have an account?{' '}
                                <a href="#" onClick={(e) => { e.preventDefault(); toggleAction(); }}>
                                    Register
                                </a>
                            </p>
                        </div>
                    </form>
                </div>

                <div className="form-box register">
                    <form onSubmit={handleSubmit}>
                        <h1>{userType === 'student' ? 'Student Registration' : 'Instructor Registration'}</h1>
                        <div className="input-box">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <FaUser className="icon" />
                        </div>
                        <div className="input-box">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <MdEmail className="icon" />
                        </div>
                        <div className="input-box">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <FaLock className="icon" />
                        </div>
                        <button type="submit">Register</button>
                        <div className="register-link">
                            <p>
                                Already have an account?{' '}
                                <a href="#" onClick={(e) => { e.preventDefault(); toggleAction(); }}>
                                    Login
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;
