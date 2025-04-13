import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './EnrollmentForm.css';

const EnrollmentForm = ({ course, onClose }) => {
    const validationSchema = Yup.object({
        studentId: Yup.number()
            .typeError('Student ID must be a number')
            .required('Student ID is required'),
    });

    const [enrollmentStatus, setEnrollmentStatus] = useState('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (values, { setSubmitting }) => {
        setEnrollmentStatus('processing');
        setErrorMessage('');
        try {
            const studentResponse = await fetch(`http://127.0.0.1:5555/students/${values.studentId}`);
            if (!studentResponse.ok) {
                setEnrollmentStatus('failure');
                setErrorMessage('Student not found. Please ensure the Student ID is correct.');
                setSubmitting(false);
                return;
            }

            const enrollmentResponse = await fetch('http://127.0.0.1:5555/enrollments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    student_id: values.studentId,
                    course_id: course.id,
                    grade: '0', // Default grade
                }),
            });

            if (enrollmentResponse.ok) {
                setEnrollmentStatus('success');
                alert(`Enrollment successful for the course: ${course.title}`);
                onClose();
            } else {
                const errorData = await enrollmentResponse.json();
                setErrorMessage(`Enrollment failed: ${errorData.error || 'Unknown error'}`);
                setEnrollmentStatus('failure');
            }
        } catch (error) {
            console.error('Enrollment error:', error);
            setErrorMessage('An error occurred during enrollment. Please try again later.');
            setEnrollmentStatus('failure');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="enrollment-form-overlay">
            <div className="enrollment-form-container">
                <h2>Enroll in {course.title}</h2>
                <Formik
                    initialValues={{ studentId: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Field type="hidden" name="courseId" value={course.id} />
                            <div className="form-group">
                                <label htmlFor="studentId">Student ID:</label>
                                <Field type="number" name="studentId" id="studentId" className="form-field" />
                                <ErrorMessage name="studentId" component="div" className="error-message" />
                            </div>
                            <div className="form-actions">
                                <button
                                    type="submit"
                                    disabled={isSubmitting || enrollmentStatus === 'processing'}
                                    className="submit-btn"
                                >
                                    {enrollmentStatus === 'processing' ? 'Enrolling...' : 'Enroll'}
                                </button>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="cancel-btn"
                                    disabled={enrollmentStatus === 'processing'}
                                >
                                    Cancel
                                </button>
                            </div>
                            {enrollmentStatus === 'failure' && (
                                <div className="error-message">{errorMessage}</div>
                            )}
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default EnrollmentForm;