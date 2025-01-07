import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllTickets } from './ticketsAction';
import { Container, Row, Col, Button } from 'react-bootstrap';
import PageBreadcrumb from '../../components/Breadcrumb/Breadcrumb';
import SearchForm from '../../components/SearchForm/SearchForm';
import TicketTable from '../../components/TicketTable/TicketTable';
import './TicketList.css';
import { Link } from "react-router-dom";

const TicketLists = () => {
  const dispatch = useDispatch();
  // const [str,setStr] = useState("");
  // const [dispTicket,setDispTicket] = useState([]);
  
  useEffect(() => {
    dispatch(fetchAllTickets());
  }, [dispatch]);

  // useEffect(() => {
  //   setDispTicket(tickets);
  // }, [tickets]);

  // const handleOnChange = (e) => {
  //   const { value } = e.target;
  //   setStr(value);
  //   searchTicket(value)
  // }

  // const searchTicket = (sttr) => {
  //   const displayTickets = tickets.filter((row) =>
  //   row.subject.toLowerCase().includes(sttr.toLowerCase())
  // )
  // setDispTicket(displayTickets)
  // }

  return (
    <Container className="ticket-list">
      <Row>
        <Col>
          <PageBreadcrumb page="Ticket Lists" />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col xs={12} sm={6} className="mb-2 mb-sm-0">
          <Link to='/add-ticket'>
            <Button variant="dark" className="add-ticket-btn">Add New Ticket</Button>
          </Link>
        </Col>
        <Col xs={12} sm={6} className="text-sm-right">
          {/* <SearchForm  handleOnChange={handleOnChange} str={str}/> */}
          <SearchForm />
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          {/* {isLoading && <Spinner animation="border" />}
          {error && <Alert variant="danger">{error}</Alert>} */}
          {/* <TicketTable tickets = {dispTicket} /> */}
          <TicketTable />
        </Col>
      </Row>
    </Container>
  );
};

export default TicketLists;