import {
    registrationPending,
    registrationSuccess,
    registrationError,
  } from "./userRegistrationSlice";
import { userRegistration } from "../../api/userApi";
  
export const newUserRegistration = (frmData) => async (dispatch) => {
    try {
        dispatch(registrationPending());

        const result = await userRegistration(frmData);
        result.status === "success"
        ? dispatch(registrationSuccess(result.message))
        : dispatch(registrationError(result.message));
        
        console.log(result);
    } catch (error) {
        dispatch(registrationError(error.message));
    }
};