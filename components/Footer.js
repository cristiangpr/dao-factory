import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from '../routes';

export default () => {
  return (
   <Container fluid>
    <Row className='footer' style={{ marginTop: '10px', background:'#0F93FE', height: '200px', textAlign:'center'}} >
      
      <Col md={4}>
        <h1 className="item" id='footer'>OUR ORG </h1>
        <h3>Open Space Network Foundation <br/>503c</h3>



      </Col>

      <Col md={4}>
        <h1 className="item" id='footer'>Head Office </h1>
         <h3>San Francisco, CA 94158</h3>
        </Col>
      <Col md={4}>
        <h1 className="item" id='footer'>Case Studies </h1>
        <h3>Learn with case studies</h3>
      </Col>

     

    </Row>
    </Container>
  );
};
