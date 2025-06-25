import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../body/body.css'
const Body = ({children}) => {
  const navigate = useNavigate()
  const goToHome = () => {
    navigate('/');
  };
  return (
    <div>
            <div className='body-main'>
            <div className="logout"  onClick={goToHome}>
                <button>Log out</button>
            </div>
              <div className='body-card'>
                {children}
              </div>
            </div>

    </div>
  );
}
export default Body