import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Row, Col } from 'react-bootstrap';
// import PropTypes from 'prop-types';
import { filterSearchTicket } from '../../page/Ticket-List/ticketsAction';
import './SearchForm.css';

const SearchForm = () => {
  const dispatch = useDispatch()
  const handleOnChange = (e) => {
    const { value } = e.target;
    
    dispatch(filterSearchTicket(value));
  }
  
  return (
    <div className="search-form">
      <Form>
        <Form.Group as={Row} className="align-items-center">
          <Form.Label column xs="12" sm="2" className="search-label">Search:</Form.Label>
          <Col xs="12" sm="10">
            <Form.Control
              name="searchStr"
              // value={str}
              onChange={handleOnChange}
              placeholder="Search"
              className="search-input"
            />
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
};

// SearchForm.propTypes = {
//   handleOnChange: PropTypes.func.isRequired,
//   str: PropTypes.string.isRequired,
// };

export default SearchForm;