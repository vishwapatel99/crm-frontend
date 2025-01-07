import React, {useState, useEffect} from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import '../../page/entry/Entry.css'

const initialState = {
    name: '',
    company: '',
    address: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const passVerificationError = {
    isLengthy: false,
    hasUpper: false,
    hasLower: false,
    hasNumber: false,
    hasSpclChr: false,
    confirmPassword: false,
};

const RegistrationForm = () => {

    const [newUser, setNewUser] = useState(initialState)
    const [passwordError, setPasswordError] = useState(passVerificationError)

    useEffect(()=>{},[newUser])

    const handleOnChange = e => {
        const { name, value } = e.target 

        setNewUser({...newUser, [name]:value})

        if(name === "password"){
            const isLengthy = value.length>=8
            const hasUpper = /[A-Z]/.test(value)
            const hasLower = /[a-z]/.test(value)
            const hasNumber = /[0-9]/.test(value)
            const hasSpclChr = /[@, #, $, %, &]/.test(value)

            setPasswordError({...passwordError, isLengthy, hasUpper, hasLower, hasNumber, hasSpclChr})
        }

        if(name === "confirmPassword"){
            setPasswordError({...passwordError, confirmPassword: newUser.password === value})
        }
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        console.log(newUser);
    }
    
  return (
    <Container>
        <Row>
            <Col>
                <h1 className="label">User Registration</h1>
            </Col>
        </Row>
        <hr />
        <Row>
            <Col>
                {/* {message && (<Alert variant={status === "success" ? "success" : "danger"}>{message}</Alert>)} */}
            </Col>
        </Row>

        <Row>
            <Col>
                <Form onSubmit={handleOnSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="name" 
                            value={newUser.name} 
                            onChange={handleOnChange} 
                            placeholder="Enter Name"
                            required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="company" 
                            value={newUser.company} 
                            onChange={handleOnChange} 
                            placeholder="Enter Company Name"
                            required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="address" 
                            value={newUser.address} 
                            onChange={handleOnChange} 
                            placeholder="Enter Address" 
                            required/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control 
                            type="tel" 
                            name="phone" 
                            pattern="[0-9]{10}" 
                            value={newUser.phone} 
                            onChange={handleOnChange} 
                            placeholder="Enter Phone Number" 
                            required/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control 
                            type="email" 
                            name="email" 
                            value={newUser.email} 
                            onChange={handleOnChange} 
                            placeholder="Enter email"
                            required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            name="password" 
                            value={newUser.password} 
                            onChange={handleOnChange} 
                            placeholder="Enter Password" 
                            required/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            name="confirmPassword" 
                            value={newUser.confirmPassword} 
                            onChange={handleOnChange} 
                            placeholder="Re-Enter Password" 
                            required/>
                    </Form.Group>
                    <Form.Text>
                        {!passwordError.confirmPassword && (
                            <div className='text-danger'>Password doesn't match!!</div>
                        )}
                    </Form.Text>
                    <ul className="mb-4">
                        <li className={passwordError.isLengthy ? "text-success":"text-danger"}>
                            Min 8 characters
                        </li>
                        <li className={passwordError.hasUpper ? "text-success":"text-danger"}>
                            At least one upper case
                        </li>
                        <li className={passwordError.hasLower ? "text-success":"text-danger"}>
                            At least one lower case
                        </li>
                        <li className={passwordError.hasNumber ? "text-success":"text-danger"}>
                            At least one number
                        </li>
                        <li className={passwordError.hasSpclChr ? "text-success":"text-danger"}>
                            At least one of the special characters i.e @ # $ % &{" "}
                        </li>
                    </ul>
                    <Button variant="primary" type="submit" disabled={Object.values(passwordError).includes(false)}>
                        Submit
                    </Button>
                </Form>
            </Col>
        </Row>
        <Row className='py-4'>
            <Col>
                Already have an account? <a href='/'>Login Now</a>
            </Col>
        </Row>
    </Container>
  )
}

export default RegistrationForm
