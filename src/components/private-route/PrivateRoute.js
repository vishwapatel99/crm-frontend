import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { loginSuccess, logoutSuccess } from "../Login/loginSlice";
import { getUserProfile } from "../../page/dashboard/userAction";
import { fetchNewAccessJWT } from "../../api/userApi";
import DefaultLayout from "../../layout/DefaultLayout";

const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth } = useSelector(state => state.login);
  const { user } = useSelector(state => state.user);

  useEffect(() => {
    const updateAccessJWT = async () => {
      try {
        const result = await fetchNewAccessJWT();
        result && dispatch(loginSuccess());
      } catch (error) {
        console.error('Error during updating access JWT:', error);
        dispatch(logoutSuccess()); 
        navigate('/'); 
      }
    };
    !user._id && dispatch(getUserProfile());
	  !sessionStorage.getItem("accessJWT") &&	localStorage.getItem("crmSite") && updateAccessJWT();

	  !isAuth && sessionStorage.getItem("accessJWT") && dispatch(loginSuccess());

  }, [dispatch, user._id, navigate, isAuth]);

  useEffect(() => {
    if (!isAuth && !sessionStorage.getItem("accessJWT")) {
      navigate('/');
    }
  }, [isAuth, navigate]);

  return isAuth || sessionStorage.getItem("accessJWT") ? (
    <DefaultLayout>{children}</DefaultLayout>
  ) :  (
	    <Navigate to="/" />
	  );
};

export default PrivateRoute;