import React from 'react'
import RegistrationForm from '../../components/Registration-Form/registrationForm'
import '../../page/entry/Entry.css'

const Registration = () => {
  return (
    <div className="registration-page bg-dark">
        <div className="form-box">
            <RegistrationForm/>
        </div>
    </div>
    
  )
}

export default Registration
