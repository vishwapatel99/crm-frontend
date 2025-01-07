import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, FormControl, Button } from "react-bootstrap";

const ForgotPassword = ({ handleOnChange, handleOnResetSubmit, formSwitcher, email }) => (
  <Container>
    <Row className="justify-content-center">
      <Col md={6}>
        <h1 className="text-dark text-center">Reset Password</h1>
        <hr />
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
          </Form.Group>

          <Form.Text className="text-center">
            <a href="#!" onClick={() => formSwitcher('Login')}>Login Now</a>
          </Form.Text>
        </Form>
      </Col>
    </Row>
  </Container>
);

ForgotPassword.propTypes = {
  handleOnChange: PropTypes.func.isRequired,
  handleOnResetSubmit: PropTypes.func.isRequired,
  formSwitcher: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};

export default ForgotPassword;