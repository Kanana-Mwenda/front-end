import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './SelectOption.css';

const SelectOption = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('');

  const handleSelection = (type) => {
    setUserType(type);
    navigate('/login', {state:{userType:type} });
  };

  return (
    <div className="select-wrapper">
      <h1>Welcome! Please select your role:</h1>
      <div className="buttons">
        <button onClick={() => handleSelection('student')}>Student</button>
        <button onClick={() => handleSelection('instructor')}>Instructor</button>
      </div>
    </div>
  );
};
export default SelectOption;