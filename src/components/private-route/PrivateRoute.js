// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// // import { useNavigate } from 'react-router-dom';
// import { loginSuccess } from '../Login/loginSlice';
// import DefaultLayout from '../../layout/DefaultLayout';

// const PrivateRoute = ({ children }) => {
//   const dispatch = useDispatch();
//   const { isAuth } = useSelector((state) => state.login);

//   useEffect(() => {
//     (!isAuth && sessionStorage.getItem("accessJWT")) && dispatch(loginSuccess());
//   }, [isAuth, dispatch]);

//   return isAuth || sessionStorage.getItem("accessJWT") ? <DefaultLayout>{children}</DefaultLayout> : null;
// };

// export default PrivateRoute;

// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { loginSuccess } from '../Login/loginSlice';

// const PrivateRoute = ({ children }) => {
//   const dispatch = useDispatch();
//   const { isAuth } = useSelector((state) => state.login);

//   useEffect(() => {
//      sessionStorage.getItem("accessJWT") &&
//       dispatch(loginSuccess());
//   }, [ dispatch ]);

//   return isAuth ? children : null;
// };

// export default PrivateRoute;

//------Pass---------// 
// import React, { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import DefaultLayout from '../../layout/DefaultLayout';
// import {fetchNewAccessJWT} from '../../api/userApi'

// const PrivateRoute = ({ children }) => {
//   const navigate = useNavigate();
//   const { isAuth } = useSelector((state) => state.login);

//   useEffect(() => {
//     const updateAccessJWT = async () => {
//       const result = await fetchNewAccessJWT();
//     }
//     if (!isAuth && !sessionStorage.getItem("accessJWT")) {
//       navigate("/");
//     }
//   }, [isAuth, navigate]);

//   return isAuth || sessionStorage.getItem("accessJWT") ? <DefaultLayout>{children}</DefaultLayout> : null;
// };

// export default PrivateRoute;

// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Navigate } from "react-router-dom";
// import { loginSuccess, logoutSuccess} from "../Login/loginSlice";
// import { getUserProfile } from "../../page/dashboard/userAction";
// import { fetchNewAccessJWT } from "../../api/userApi";
// import DefaultLayout from "../../layout/DefaultLayout";

// const PrivateRoute = ({ children, ...rest }) => {
// 	const dispatch = useDispatch();
// 	const { isAuth } = useSelector(state => state.login);
// 	const { user } = useSelector(state => state.user);

// 	useEffect(() => {
// 		const updateAccessJWT = async () => {
// 			try {
// 			  const result = await fetchNewAccessJWT();
// 			  result && dispatch(loginSuccess());
// 			} catch (error) {
// 			  console.error('Error during updating access JWT:', error);
// 			  dispatch(logoutSuccess());
// 			}
// 		};
// 		// const updateAccessJWT = async () => {
// 		// 	const result = await fetchNewAccessJWT();
// 		// 	result && dispatch(loginSuccess());
// 		// };

// 	// 	!user._id && dispatch(getUserProfile());

// 	// 	!sessionStorage.getItem("accessJWT") &&
// 	// 		localStorage.getItem("crmSite") &&
// 			// updateAccessJWT();

// 	// 	!isAuth && sessionStorage.getItem("accessJWT") && dispatch(loginSuccess());
// 	// }, [dispatch, isAuth, user._id]);
//     if (!user._id) {
//       dispatch(getUserProfile());
//     } else{
// 		updateAccessJWT();
// 	}
//   }, [dispatch, user._id]);

// 	return isAuth || sessionStorage.getItem("accessJWT") ? (
//     <DefaultLayout>{children}</DefaultLayout>
//   ) : (
//     <Navigate to="/" />
//   );
// };

// export default PrivateRoute;

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
        dispatch(logoutSuccess()); // Ensure logout on error
        navigate('/'); // Redirect to login page on error
      }
    };
    !user._id && dispatch(getUserProfile());
	  !sessionStorage.getItem("accessJWT") &&	localStorage.getItem("crmSite") && updateAccessJWT();

	  !isAuth && sessionStorage.getItem("accessJWT") && dispatch(loginSuccess());

    // if (!user._id) {
    //   dispatch(getUserProfile());
    // } else {
    //   updateAccessJWT();
    // }
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