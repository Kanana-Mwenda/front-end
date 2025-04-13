import React from 'react'
import './Hero.css';
import classroom from '../../assets/class.jpg/';

const Hero = () => {
  return (
    <div>
      <div className="hero">
        <h1 className="hero_header">
          Unlock your potential with top Tier 
          <br />Online Courses
        </h1>
        <p>Personalized Learning Experiences designed to help you achieve your professional <br /> personal goals. Gain the skils to excel in today's fast paced world</p>
        <img src={classroom} alt="hero_img" className='hero_img'/>
      </div>
    </div>
  )
}

export default Hero
