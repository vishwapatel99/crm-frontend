import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import TicketTable from '../../components/TicketTable/TicketTable';
import PageBreadcrumb from '../../components/Breadcrumb/Breadcrumb';
import './Dashboard.css';
import { Link } from 'react-router-dom'
import { fetchAllTickets } from '../Ticket-List/ticketsAction';

ChartJS.register(ArcElement, Tooltip, Legend);

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

  const chartData = {
    labels: ['Pending Tickets', 'Completed Tickets'],
    datasets: [
      {
        data: [pendingTickets.length, completedTickets.length],
        backgroundColor: ['#f39c12', '#2ecc71'],
        hoverBackgroundColor: ['#e67e22', '#27ae60'],
      },
    ],
  };

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
        <Row className="chart-row mt-5">
          <Col md={6} className="offset-md-3">
            {tickets.length > 0 && (
              <>
                <h5 className="text-center">Ticket Status Overview</h5>
                <Doughnut data={chartData} />
              </>
            )}
          </Col>
        </Row>
        {/* <hr/>
        <Row>
          <Col>
            <TicketTable tickets={tickets} />
          </Col>
        </Row> */}
      </Container>
    </div>
  );
}

export default Dashboard;