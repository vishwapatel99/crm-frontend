import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openNewTicket } from './AddTicketAction';
import { Form, Button, Row, Col, Spinner, Alert } from 'react-bootstrap';
// import PropTypes from 'prop-types';
import { shortText } from "../../utils/validation";
import { resetSuccessMSg } from './AddTicketSlice';
import './AddTicketForm.css';

const initialFrmData = {
    subject: '',
    issueDate: '',
    message: ''
};
const initialFrmError = {
    subject: false,
    issueDate: false,
    message: false
};

const AddTicketForm = () => {
  const dispatch = useDispatch()
  const {user: {name}} = useSelector(state => state.user)
  const {isLoading, error, successMsg} = useSelector(state => state.openTicket)
  const [frmData, setFrmData] = useState(initialFrmData);
  const [frmDataError, setFrmDataError] = useState(initialFrmError);

  useEffect(() => {
    return () => {
      successMsg && dispatch(resetSuccessMSg());
    };
  }, [dispatch, frmData, frmDataError]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFrmData({
      ...frmData,
      [name]: value
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setFrmDataError(initialFrmError)
    const isSubjectValid = await shortText(frmData.subject);

    setFrmDataError({
      ...initialFrmError,
      subject: !isSubjectValid
    });

    if (isSubjectValid) {
      const { subject, issueDate, message } = frmData;
      dispatch(openNewTicket({ subject, issueDate, message, sender: name }));
      console.log("Form submitted", frmData);
    }

    // dispatch(openNewTicket({...frmData, sender: name}))
    // if (isSubjectValid) {
    //   // Submit the form
    //   
    // }
  };

  return (
    <div className="add-ticket-form mt-3 bg-light">
      <h1 className='text-center'>Add New Ticket</h1>
      <hr/>
      <div>
        {error && <Alert variant='danger'>{error}</Alert>}
        {successMsg && <Alert variant='success'>{successMsg}</Alert>}
        {isLoading && <Spinner variant='primary' animation='border'/>}
      </div>
      <Form onSubmit={handleOnSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>Subject</Form.Label>
          <Col sm={9}>
            <Form.Control
              name="subject"
              value={frmData.subject}
            //   minLength={4}
              onChange={handleOnChange}
              placeholder='Subject'
              required
            />
            <Form.Text className="text-danger">{frmDataError.subject && "Subject is required"}</Form.Text>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>Date</Form.Label>
          <Col sm={9}>
            <Form.Control
              type="date"
              name="issueDate"
              value={frmData.issueDate}
              onChange={handleOnChange}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>Message</Form.Label>
          <Col sm={9}>
            <Form.Control
              as="textarea"
              name="message"
              rows="5"
              value={frmData.message}
              onChange={handleOnChange}
              placeholder='Message'
              required
            />
          </Col>
        </Form.Group>
        <Button type="submit"  className="submit-btn">Submit</Button>
      </Form>
    </div>
  );
}

// AddTicketForm.propTypes = {
//   handleOnSubmit: PropTypes.func.isRequired,
//   handleOnChange: PropTypes.func.isRequired,
//   frmData: PropTypes.object.isRequired,
//   frmDataError: PropTypes.object.isRequired,
// };

export default AddTicketForm;