import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from '../routes';

const Footer = () => {
  return (
   
    <Row className='footer mt-auto py-3 bg-dark text-white' style={{  textAlign:'center'}} >
      <Col md style={{paddingTop:"3vh"}}>
         Contact
      </Col>
      <Col md style={{paddingTop:"3vh"}} >
        Terms of Use
        </Col>
        <Col md style={{paddingTop:"3vh"}}>
        Leave a Tip
        </Col>
      

     

    </Row>
 
  );
};
export default Footer;