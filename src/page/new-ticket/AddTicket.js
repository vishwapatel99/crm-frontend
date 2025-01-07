import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import PageBreadcrumb from '../../components/Breadcrumb/Breadcrumb';
import AddTicketForm from '../../components/AddTicketForm/AddTicketForm';

const AddTicket = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <PageBreadcrumb page="New Ticket" />
                </Col>
            </Row>
            <Row>
                <Col>
                    <AddTicketForm
                        // handleOnSubmit={handleOnSubmit}
                        // handleOnChange={handleOnChange}
                        // frmDt={frmData}
                        // frmDataError={frmDataError}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default AddTicket;