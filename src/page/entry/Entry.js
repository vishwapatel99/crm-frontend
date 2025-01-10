import React, { useState } from 'react';
import './Entry.css';
import Login from '../../components/Login/Login';
import ForgotPassword from '../../components/ForgotPassword/ForgotPassword';

const Entry = () => {
  const [formLoad, setFormLoad] = useState("Login");

  

  const handleOnResetSubmit = (e) => {
    e.preventDefault();
  };

  const formSwitcher = (formType) => setFormLoad(formType);

  return (
    <div className="entry-page bg-dark">
      <div className='form-box'>
      {formLoad === 'Login' && (
        <Login
          formSwitcher={formSwitcher}
        />
      )}
      {formLoad === 'reset' && (
        <ForgotPassword
          handleOnResetSubmit={handleOnResetSubmit}
          formSwitcher={formSwitcher}
        />
      )}
      </div>
    </div>
  );
};

export default Entry;
