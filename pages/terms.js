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
 
  header= 'Terms of Use'
  description='MIT License

  Copyright (c) [year] [fullname]
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:
  
  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.
  
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.'
                     />

  </Col>

</Row>

</Container>

     </LandingLayout>
   


)
}
}
 export default About;