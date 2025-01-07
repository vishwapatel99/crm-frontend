import React,{useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, FormControl, Button, Spinner, Alert } from "react-bootstrap";
import {useDispatch,useSelector} from 'react-redux'
import { loginPending, loginSuccess, loginFail } from './loginSlice'
import { userLogin } from '../../api/userApi'
import { useNavigate } from 'react-router-dom'
import { getUserProfile } from '../../page/dashboard/userAction'
import '../../page/entry/Entry.css';

const Login = ({ formSwitcher }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isAuth, error } = useSelector((state) => state.login);

  useEffect(() => {
    if (isAuth || sessionStorage.getItem("accessJWT")) {
      navigate("/dashboard");
    }
  }, [isAuth, navigate]);

  const [email, setEmail] = useState("vishwapatel@gmail.com");
  const [password, setPassword] = useState("password");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
      if (!email || !password) {
        return alert("Please fill up the form");
      }
      // setIsLoading(true);
      // try {
      //   // Simulate login API call
      //   setTimeout(() => {
      //     setIsLoading(false);
      //     setError("");
      //     // Navigate to dashboard or perform other actions
      //   }, 2000);
      // } catch (error) {
      //   setIsLoading(false);
      //   setError("Login failed");
      // }
      dispatch(loginPending());
      try {
        const isAuth = await userLogin({ email, password });
        if (isAuth.status === "success") {
          sessionStorage.setItem("accessJWT", isAuth.accessJWT);
          localStorage.setItem("crmSite", JSON.stringify({ refreshJWT: isAuth.refreshJWT }));
          dispatch(loginSuccess());
          dispatch(getUserProfile());
          navigate("/dashboard");
        } else {
          dispatch(loginFail(isAuth.message));
        }
      } catch (error) {
        dispatch(loginFail(error.message));
      }
    };
  
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className="text-dark text-center">Login</h1>
          <hr />
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleOnSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <FormControl
                type="email"
                name="email"
                value={email}
                onChange={handleOnChange}
                placeholder="Enter Email"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <FormControl
                type="password"
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter Password"
                required
              />
            </Form.Group>
            <Form.Group className="d-grid gap-2 mb-3">
            <Button type="submit" variant="primary">Login</Button>
            {isLoading && <Spinner variant="primary" animation="border" />}
            </Form.Group>
            <Form.Text className="text-center">
              <a href="#!" onClick={() => formSwitcher('reset')}>Forgot Password?</a>
            </Form.Text>
            <Form.Text className="text-center">
              <br/>Are you new here?
              <br/><a href="/registration">Register Now </a>
            </Form.Text>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
Login.propTypes = {
  formSwitcher: PropTypes.func.isRequired,
};

export default Login;