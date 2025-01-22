import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import PageBreadcrumb from '../../components/Breadcrumb/Breadcrumb';
import MessageHistory from '../../components/MessageHistory/MessageHistory';
import UpdateTicket from '../../components/Update-Ticket/UpdateTicket';
import './Ticket.css';
import { useParams } from 'react-router-dom';
import { closeTicket, fetchSingleTicket } from '../Ticket-List/ticketsAction';
import { resetResponseMsg } from '../Ticket-List/ticketsSlice';

const Ticket = () => {
  const {tId} = useParams();
  const dispatch = useDispatch();
  const { isLoading, error, selectedTicket, replyMsg, replyTicketError } = useSelector(state => state.tickets);
 
  useEffect(() => {
    dispatch(fetchSingleTicket(tId));
    
    return () => {
      (replyMsg || replyTicketError) && dispatch(resetResponseMsg())
    }
  }, [tId, dispatch, replyMsg, replyTicketError]);

  if (isLoading) {
    return <Spinner variant='primary' animation='border' />;
  }

  if (error) {
    return <Alert variant='danger'>{error}</Alert>;
  }

  if (!selectedTicket) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="ticket-page">
      <Row>
        <Col>
          <PageBreadcrumb page="Ticket" />
        </Col>
      </Row>
      <Row>
        <Col>
          {isLoading && <Spinner variant='primary' animation='border' />}
          {error && <Alert variant='danger'>{error}</Alert>}
          {replyTicketError && <Alert variant='danger'>{replyTicketError}</Alert>}
          {replyMsg && <Alert variant="success">{replyMsg}</Alert>}
        </Col>
      </Row>
      <Row>
        <Col className='fw-bold text-secondary'>
          <div className='subject'>Subject: {selectedTicket.subject}</div>
          <div className='date'>Opened Date: {selectedTicket.openAt && new Date(selectedTicket.openAt).toLocaleString()}</div>
          <div className='status'>Status: {selectedTicket.status}</div>
        </Col>
        <Col className='text-right'>
            <Button variant='outline-danger' 
              onClick={() => dispatch(closeTicket(tId))}
              disabled = {selectedTicket.status === "Closed"}
            >Close Ticket</Button>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>{selectedTicket.conversations && <MessageHistory msg={selectedTicket.conversations} />}  
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <UpdateTicket _id = {tId} />
        </Col>
      </Row>
    </Container>
  );
};

export default Ticket;