import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendPasswordResetOtp } from './passwordAction';
import { Container, Row, Col, Form, FormControl, Button, Alert, Spinner } from "react-bootstrap";

const ForgotPassword = () => {
  const dispatch = useDispatch()

  const [email, setEmail] = useState("")

  const {isLoading, status, message} = useSelector(state => state.password)

  const handleOnResetSubmit = e => {
    e.preventDefault();
    dispatch(sendPasswordResetOtp(email));
  }
  
  const handleOnChange = e => {
    const {value} = e.target
    setEmail(value)
  }

  return(
  <Container>
    <Row className="justify-content-center">
      <Col md={6}>
        <h1 className="text-dark text-center">Reset Password</h1>
        <hr />
        {message && (
            <Alert variant={status === 'success' ? "success" : "danger"}>
              {message}
            </Alert>
          )}
        <Form onSubmit={handleOnResetSubmit}>
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

          <Form.Group className="d-grid gap-2 mb-3">
            <Button type="submit" variant="primary">Reset Password</Button>
            {isLoading && <Spinner variant='primary' animation='border'/>}
          </Form.Group>
        </Form>
      </Col>
    </Row>
  </Container>
  )
};

export default ForgotPassword;