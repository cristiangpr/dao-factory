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
  
               <Card style={{ background:"gray",  height:"100%", width:"80%" }}
                      header= 'About the DAO Factory'
                       description="I have created this app for the purpose of developing my crypto development skills. It currently runs on the Rinkeby testnet
                so make sure you have it selected in your Metamask. The app allows you to create a DAO with a token of a certain ETH value to be used for payment to members. 
                The manager of the DAO may add and remove members through the dashboard. Users can purchase tokens to fund the DAO. Members can
                 create payment requests by entering the hours worked and their compensation factor. Once a request is approved by all members the manager must finalize the request in order for the payment to be completed. Once the beneficiary
                 recieves the tokens he or she may exchange them for ETH via the Token page. This webapp is built using Next.js, Web3, Solidity and Openzeppelin.  https://github.com/cristiangpr/dao-factory "
                 
                     />
                </Col>
             </Row>
           </Container>

        </LandingLayout>
   


)
}
}
 export default About;