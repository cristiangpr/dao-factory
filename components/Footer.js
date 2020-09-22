import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from '../routes';

const Footer = () => {
  return (
   
    <Row className='footer mt-auto py-3 bg-dark text-white' style={{  textAlign:'center'}} >
      <Col md style={{paddingTop:"3vh"}}>
        <Link to="/about">
         About
         </Link>
      </Col>
      <Col md style={{paddingTop:"3vh"}} >
      <Link to="/contact">
         Contact
         </Link>
        </Col>
        <Col md style={{paddingTop:"3vh"}}>
        <Link to="/terms">
        Terms of Use
         </Link>
        </Col>
      

     

    </Row>
 
  );
};
export default Footer;