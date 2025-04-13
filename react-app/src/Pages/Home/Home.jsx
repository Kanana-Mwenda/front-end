import React from 'react'
import Hero from '../../Components/Hero/Hero'
import CourseList from '../../Components/CourseList/CourseList.jsx'
import Info from '../../Components/Info/Info.jsx'

const Home = () => {
  return (
    <div className="home-container">
      <Hero />
      <div className="courses-section">
        <CourseList />
      </div>
      <Info />
    </div>
  )
}

export default Home
