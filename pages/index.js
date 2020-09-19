import React, { Component, Fragment }from 'react';

import { Card ,  Grid} from 'semantic-ui-react';
import {  Col, Row, Container, Jumbotron, Button,} from 'react-bootstrap';
import LandingLayout from '../components/LandingLayout';
import Footer from '../components/Footer';
import Carousel from 'react-bootstrap/Carousel';



import { Link } from '../routes.js'

class Index extends Component {

render(){
  return (
   
      <LandingLayout>


<Container>
<Row  style={{paddingTop:"5vh"}}>
  <Col md style={{justifyContent:"center", display:"flex"}}>
  <Link to="/entities/new">
  <Card style={{ background:"gray",  height:"10rem" }}
 
  header= 'Create DAO'
  description="Create a token and payment system for your org"
                   href="/entities/new"
                     />
</Link>
  </Col>
  <Col md style={{justifyContent:"center", display:"flex"}} >
  <Card style={{  background:"gray",  height:"10rem"  }}
  
  header= 'View DAOs'
  description="View and join what others have created"
  href="/entityIndex"
                     />

  </Col>
  <Col md style={{justifyContent:"center", display:"flex"}} >
  <Card style={{ background:"gray", height:"10rem"}}
  
 
  header= 'About'
  description="Learn about the DAO factory"
                   href="/entities/new"
                     />
  </Col>
</Row>

</Container>

     </LandingLayout>
   


)
}
}
 export default Index;
