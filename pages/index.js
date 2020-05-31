import React, { Component, Fragment }from 'react';

import { Card, Button, Grid} from 'semantic-ui-react';
import {  Col, Row, Container  } from 'react-bootstrap';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import Carousel from 'react-bootstrap/Carousel';



import { Link } from '../routes.js'

class Index extends Component {

render(){
  return (
    <Fragment>
  <Layout style={{color:'white'}}>
  <Container>
     <Row>
        
         <Col md={6} style={{ alignItems:'center'}} >
            <Card  style={{height:'250px', background:'#0F93FE', textAlign:'center', width:'100%', fontSize:'3em', color:'white'}}
                   header= 'Create Entity'
                   href="/entities/new"
                     />
        </Col>

           <Col md={6}>
            <Card style={{height:'250px', background:'rgba(247, 138, 42, 1)', textAlign:'center', width:'100%',  fontSize:'3em'}}

              header='Collaborate'
              href='/entityIndex'
               />
        </Col>
    
          </Row>
           <Row style={{paddingTop: '10px'}}>
       
          <Col md={6} style={{height:'300px', background:'rgba(50, 50, 50, 1)',   width:'100%',  fontSize:'2em'}} >
            <p>COLLABORATIVE <br/>ECONOMICS</p>
          <p>THE NEW<br/> ECONOMIC <br/>PARADIGM</p>
          </Col>
          <Col md={6} style={{height:'300px', background:'rgba(50, 50, 50, 1)',  width:'100%',  fontSize:'2em'}} >
            <p>"Science that studys how<br/> abundant resources are<br/>shared by nodes"</p>
            <p>Click for more...</p>
          </Col>
       


    </Row>

    </Container>



  <Row style={{ paddingTop: '10px'}}>
    <Col id="revolution" md={12} style={{height:'300px', background:'rgba(247, 138, 42, 1)', textAlign:'center', width:'100%',  fontSize:'3em'}}>
    <p  id="revolution">JOIN THE RE-EVOLUTION</p>
    </Col>
  </Row>
  <Row>
    <Col md={12} style={{height:'100px', textAlign:'center', width:'100%',  fontSize:'3em',paddingBottom:'0'}}>
    <p style={{color:'#0F93FE'}}>Why CC?</p>
    </Col>
  </Row>
  <Container>
    <Row > 
      <Col className='why-column' md={3}style={{height:'200px', textAlign:'center',  fontSize:'3em'}} >
<h1 style={{color:'#0F93FE'}}>Peer to Peer</h1>
     </Col>


        <Col className='why-column' md={3} style={{height:'200px', textAlign:'center',   fontSize:'3em'}}>
<h1  style={{color:'#0F93FE'}}>Smart Contracts</h1>
     </Col>


        <Col className='why-column' md={3} style={{height:'200px', textAlign:'center',  fontSize:'3em'}} >
<h1 style={{color:'#0F93FE'}}>Compatible with global regulations</h1>
       </Col>

          <Col className='why-column-r' md={3}style={{height:'200px', textAlign:'center',  fontSize:'3em'}}>
<h1 style={{color:'#0F93FE'}}>Proof of work for humans</h1>
       </Col>
 

       </Row>
</Container>

  <Row>
    <Col md={12} style={{height:'100px', textAlign:'center', width:'100%',  fontSize:'3em'}}>
    <p style={{color:'#0F93FE'}}>Do You Need Help?</p>
    </Col>
  </Row>
<Container>
  <Row style={{paddingBottom:'0'}}>
   
      <Col md={6} style={{ alignItems:'center'  }} >
         <Card  style={{height:'200px', textAlign:'center', width:'100%', fontSize:'3em',   background:'rgba(247, 138, 42, 1)'}}
                header = 'Join CC'
                href="/entities/new"

                  />
     </Col>

        <Col md={6}>
         <Card style={{height:'200px', background:'#0F93FE', textAlign:'center', width:'100%',  fontSize:'2.9em'}}

           header='Benefit Corporation'
           href='/entityIndex'
            />
     </Col>
     
       </Row>
       <Row style={{paddingTop:'0'}}>
       
           <Col md={6} style={{ alignItems:'center'}} >
              <Card  style={{height:'200px', background:'gray', textAlign:'center', width:'100%', fontSize:'3em', color:'white'}}
                     header= 'Smart pack'
                     href="/entities/new"
                       />
          </Col>

             <Col md={6} >
              <Card style={{height:'200px', background:'rgba(50, 50, 50, 1)', textAlign:'center', width:'100%',  fontSize:'3em'}}

                header='Lets Chat'
                href='/entityIndex'
                 />
          </Col>
         
            </Row>
   </Container>

    <Row>
      <Col style={{width:'100%', paddingLeft: 0, paddingRight: 0, paddingTop: '10px'}}>
            <Carousel style={{background:'#0F93FE', height:'400px', position:'relative', textAlign:'center', width:'100%'}}>
              <Carousel.Item >
              <div >
              <h1>COLLABOREATIVE ECONOMICS</h1>
              <p>
Science that studies how the abundant resources are exchanged by the nodes</p>
              </div>

              </Carousel.Item>
              <Carousel.Item>
              <h1>JEREMY RIFKIN</h1>
              <p>"The Zero Marginal Cost Society"
The Internet of Things, the Collaborative Commons, and the Eclipse of Capitalism</p>

              </Carousel.Item>
              <Carousel.Item>
              <h1>YUNUS SOCIAL BUSINESS</h1>
              <p>Apply Yunus Social Business Model in few clicks</p>

              </Carousel.Item>
            </Carousel>
          </Col>
</Row>
<Row>
  <Col md={12} style={{height:'100px', textAlign:'center', width:'100%',  fontSize:'3em'}}>
  <h1 style={{color:'#0F93FE'}}>COLLABORATIVE BUSINESS</h1>
  </Col>
</Row>
<Container>
<Row >

    
   
    <Col  md={6}style={{height:'200px', textAlign:'center',  fontSize:'3em'}} >
<h1 style={{color:'#0F93FE'}}>The best professionals are ready to help you create or transform an entity.</h1>
   </Col>


      <Col  md={6} style={{height:'200px', textAlign:'center',   fontSize:'3em'}}>
<h1  style={{color:'#0F93FE'}}>Collaborate Now</h1>
   </Col>



     <Col width={2}>
     </Col>

     </Row>
   
     </Container>


     </Layout>
   

</Fragment>
)
}
}
 export default Index;
