import React from 'react';
import { useSelector } from 'react-redux';
import ForgotPassword from '../../components/ForgotPassword/ForgotPassword';
import '../../page/entry/Entry.css'
import UpdatePasswordForm from '../../components/ForgotPassword/ResetPasswordForm';

const PasswordOtpForm = () => {

  const {showUpdatePassForm} = useSelector(state => state.password)

  return (
    <div className="resetpassword-page bg-dark">
      <div className='form-box'>
        {showUpdatePassForm ? <UpdatePasswordForm /> : <ForgotPassword /> }
				<div className="text-center">
					<a href="/">Login Now</a>
				</div>
      </div>
    </div>
  );
};

export default PasswordOtpForm;