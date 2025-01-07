import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button } from "react-bootstrap";
import { replyOnTicket } from '../../page/Ticket-List/ticketsAction';
import './UpdateTicket.css';

const UpdateTicket = ({_id}) => {

  // const { replyMsg } = useSelector(state => state.tickets);
  const dispatch = useDispatch();
  const { user:{name} } = useSelector(state => state.user);
  const [message, setMessage] = useState('');

  const handleOnChange = (e) => {
    setMessage(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const msgObj = {
      message,
      sender: name
    }
    dispatch(replyOnTicket(_id, msgObj));
    setMessage("");
  };

  return (
    <div>
      {/* {replyMsg && <Alert variant='success'>{replyMsg}</Alert>} */}
      <Form onSubmit={handleOnSubmit} className="update-ticket-form">
        <Form.Group>
          <Form.Label>Reply</Form.Label>
          <div>
              <Form.Text>Please reply your message here</Form.Text>
          </div>
          <Form.Control
            value={message}
            onChange={handleOnChange}
            as="textarea"
            rows="5"
            name="detail"
            className="update-ticket-textarea"
          />
        </Form.Group>
        <div className='text-right mt-3 mb-3'>
          <Button variant='info' type='submit' className="update-ticket-button">Reply</Button>
        </div>
      </Form>
    </div>
  );
}

UpdateTicket.propTypes = {
  _id: PropTypes.string.isRequired
}

export default UpdateTicket;