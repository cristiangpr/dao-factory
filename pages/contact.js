import React, { Component, Fragment }from 'react';

import { Card ,  Grid} from 'semantic-ui-react';
import {  Col, Row, Container, Jumbotron, Button,} from 'react-bootstrap';
import LandingLayout from '../components/LandingLayout';
import Footer from '../components/Footer';
import Carousel from 'react-bootstrap/Carousel';



import { Link } from '../routes.js'

class About extends Component {

render(){
  return (
   
      <LandingLayout>
         <Container fluid>
           <Row  style={{paddingTop:"5vh"}}>
             <Col md={12} style={{justifyContent:"center", display:"flex" , paddingBottom:"10px"}}>
               <Link to="/entities/new">
                 <Card style={{ background:"gray",  height:"100%", width:"80%" }}
 
                       header= 'Contact the Developer'
                       description="Feel free to contact me at cristiangp777@gmail.com. I am a javascript and ethereum developer passionate about DeFi trying to break into the space.
                                if you wish to support my journey you can tip me at 0x43Fd37b3587fB30E319De4A276AD49E7969E23DD"
                      />
                </Link>
               </Col>

             </Row>
          </Container>

     </LandingLayout>
   


)
}
}
 export default About;