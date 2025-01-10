import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Col, Container, Row } from 'react-bootstrap';
import TicketTable from '../../components/TicketTable/TicketTable';
import PageBreadcrumb from '../../components/Breadcrumb/Breadcrumb';
import './Dashboard.css';
import { Link } from 'react-router-dom'
import { fetchAllTickets } from '../Ticket-List/ticketsAction';

const Dashboard = () => {
  const dispatch = useDispatch()

  const {tickets} = useSelector(state => state.tickets)

  useEffect(() => {
    if(!tickets.length){
      dispatch(fetchAllTickets())
    }
  },[tickets,dispatch])

  const pendingTickets = tickets.filter((row) => row.status !== "Closed");
  const totalTickets = tickets.length;
  const completedTickets = tickets.filter((row) => row.status === "Closed");

  return (
    <div className="dashboard">
      <Container>
        <Row className="breadcrumb-container">
          <Col>
            <PageBreadcrumb page="Dashboard" />
          </Col>
        </Row>
        <Row>
          <Col className='text-center mt-5 mb-2'>
            <Link to='/add-ticket'>
              <Button variant='dark' className="add-ticket-btn">Add New Ticket</Button>
            </Link>
            
          </Col>
        </Row>
        <Row>
          <Col className='text-center mt-5 mb-2'>
            <div className="ticket-info">Total Tickets: {totalTickets}</div>
            <div className="ticket-info">Pending Tickets: {pendingTickets.length}</div>
            <div className="ticket-info">Completed Tickets: {completedTickets.length}</div>
          </Col>
        </Row>
        <Row>
          <Col>
            <TicketTable tickets={tickets} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;