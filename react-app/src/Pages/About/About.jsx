import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1>About TechAcademy</h1>
      <div className="about-content">
        <p>
        Founded in 2015, Tech Academy was created to provide accessible, high-quality tech education that meets the growing demand for skilled professionals. Our mission is to equip students with the practical knowledge and experience needed to succeed in the rapidly evolving tech industry.

We offer a variety of courses, including Software Engineering, Data Science, Web and Mobile App Development, Cybersecurity, Cloud Computing. Whether you're just starting out or looking to advance your skills, our hands-on, project-based approach ensures you gain the expertise needed for real-world success.

At Tech Academy, we are committed to helping you unlock your potential and thrive in your tech career.TechAcademy is a leading online learning platform dedicated to providing 
          high-quality technology education to students worldwide.
        </p>
      </div>

      <div className="about-image">
        <img src="/src/assets/aboutpage.png" alt="About TechAcademy" />
      </div>

      <div className="mission-container">
        <h2>Our Mission</h2>
        <p>
        to provide accessible, inclusive, and high-quality technology education that bridges the gap between learning and real-world application. Through hands-on training, industry-relevant curriculum, and personalized mentorship, we equip learners with the technical expertise and critical thinking skills required to succeed in today’s fast-paced digital landscape. We are committed to fostering a supportive learning environment that encourages growth, innovation, and lifelong learning, helping our students thrive in meaningful and impactful tech careers.
        </p>
      </div>

      <div className="vision-container">
        <h2>Our Vision</h2>
        <p>
        to become a global leader in technology education by nurturing a generation of innovators, problem-solvers, and forward-thinkers. We aim to empower individuals from all backgrounds with the skills and confidence to shape the future through innovation, creativity, and digital transformation. We envision a world where technology is a tool for positive change, and where our graduates drive that change in industries across the globe.
        </p>
      </div>

      <div className="testimonials-container">
        <h2>Student Testimonials</h2>
        <div className="testimonials-grid">
          {/* Testimonial 1 */}
          <div className="testimonial-card">
            <div className="testimonial-image">
              <img src="/src/assets/AIimage.jpg" alt="Student 1" />
            </div>
            <div className="testimonial-content">
              <p className="testimonial-text">"Tech Academy gave me the confidence to transition into a career in data science. The hands-on approach and expert instructors made complex concepts easy to understand. Thanks to their support, I landed my first data analyst job within months!"</p>
              <p className="testimonial-name">- Damon Salvatore</p>
              <p className="testimonial-course">Data Science</p>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="testimonial-card">
            <div className="testimonial-image">
              <img src="/src/assets/AIimage2.jpeg" alt="Student 2" />
            </div>
            <div className="testimonial-content">
              <p className="testimonial-text">"I came to Tech Academy with no coding experience, and now I'm a web developer at a top tech company. The course structure and real-world projects helped me build the skills I needed to succeed. I couldn’t have asked for a better start!"</p>
              <p className="testimonial-name">- Elena Gilbert</p>
              <p className="testimonial-course">Web Development</p>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="testimonial-card">
            <div className="testimonial-image">
              <img src="/src/assets/AIimage3.png" alt="Student 3" />
            </div>
            <div className="testimonial-content">
              <p className="testimonial-text">"The cybersecurity course at Tech Academy opened doors to a new career path I hadn’t even considered. The curriculum was comprehensive, and the industry connections helped me secure an internship right after graduation."</p>
              <p className="testimonial-name">- Klaus Mikaelson</p>
              <p className="testimonial-course">Cyber Security</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
