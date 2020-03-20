import React, { Component, Fragment }from 'react';
import factory from '../ethereum/factory';
import { Card, Button, Grid, Container } from 'semantic-ui-react';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import Carousel from 'react-bootstrap/Carousel';


import { Link } from '../routes.js'

class Index extends Component {

render(){
  return (
    <Fragment>
  <Layout style={{color:'white'}}>
  <Grid style={{marginTop:'100px'}}>
     <Grid.Row>

         <Grid.Column width={8} style={{ alignItems:'center'}} >
            <Card  style={{height:'250px', background:'#0F93FE', textAlign:'center', width:'100%', fontSize:'3em', color:'white'}}
                   header= 'Create Entity'
                   href="/entities/new"
                     />
        </Grid.Column>

           <Grid.Column width={8}>
            <Card style={{height:'250px', background:'rgba(247, 138, 42, 1)', textAlign:'center', width:'100%',  fontSize:'3em'}}

              header='Collaborate'
              href='/entityIndex'
               />
        </Grid.Column>

          </Grid.Row>
           <Grid.Row>

          <Grid.Column width={8} style={{height:'300px', background:'rgba(50, 50, 50, 1)',   width:'100%',  fontSize:'2em'}} >
            <p>COLLABORATIVE <br/>ECONOMICS</p>
          <p>THE NEW<br/> ECONOMIC <br/>PARADIGM</p>
          </Grid.Column>
          <Grid.Column width={8} style={{height:'300px', background:'rgba(50, 50, 50, 1)',  width:'100%',  fontSize:'2em'}} >
            <p>"Science that studys how<br/> abundant resources are<br/>shared by nodes"</p>
            <p>Click for more...</p>
          </Grid.Column>


    </Grid.Row>

    </Grid>

</Layout>
<Grid>
  <Grid.Row>
    <Grid.Column id="revolution" widht={16} style={{height:'300px', background:'rgba(247, 138, 42, 1)', textAlign:'center', width:'100%',  fontSize:'3em'}}>
    <p  id="revolution">JOIN THE RE-EVOLUTION</p>
    </Grid.Column>
  </Grid.Row>
  <Grid.Row>
    <Grid.Column widht={16} style={{height:'100px', textAlign:'center', width:'100%',  fontSize:'3em',paddingBottom:'0'}}>
    <p style={{color:'#0F93FE'}}>Why CC?</p>
    </Grid.Column>
  </Grid.Row>

  <Grid.Row >

      <Grid.Column width={2}>
      </Grid.Column>
      <Grid.Column className='why-column' width={3}style={{height:'200px', textAlign:'center',  fontSize:'3em'}} >
<h1 style={{color:'#0F93FE'}}>Peer to Peer</h1>
     </Grid.Column>


        <Grid.Column className='why-column' width={3} style={{height:'200px', textAlign:'center',   fontSize:'3em'}}>
<h1  style={{color:'#0F93FE'}}>Smart Contracts</h1>
     </Grid.Column>


        <Grid.Column className='why-column' width={3} style={{height:'200px', textAlign:'center',  fontSize:'3em'}} >
<h1 style={{color:'#0F93FE'}}>Compatible with global regulations</h1>
       </Grid.Column>

          <Grid.Column className='why-column-r' width={3}style={{height:'200px', textAlign:'center',  fontSize:'3em'}}>
<h1 style={{color:'#0F93FE'}}>Proof of work for humans</h1>
       </Grid.Column>
       <Grid.Column width={2}>
       </Grid.Column>

       </Grid.Row>


  <Grid.Row>
    <Grid.Column widht={16} style={{height:'100px', textAlign:'center', width:'100%',  fontSize:'3em'}}>
    <p style={{color:'#0F93FE'}}>Do You Need Help?</p>
    </Grid.Column>
  </Grid.Row>

  <Grid.Row style={{paddingBottom:'0'}}>
   <Grid.Column width={4} >
    </Grid.Column>
      <Grid.Column width={4} style={{ alignItems:'center',  paddingRight:'0'}} >
         <Card  style={{height:'200px', textAlign:'center', width:'100%', fontSize:'3em',  paddingRight:'0',  background:'rgba(247, 138, 42, 1)'}}
                header = 'Join CC'
                href="/entities/new"

                  />
     </Grid.Column>

        <Grid.Column width={4} style={{paddingLeft:'0'}}>
         <Card style={{height:'200px', background:'#0F93FE', textAlign:'center', width:'100%',  fontSize:'3em', paddingLeft:'0'}}

           header='Benefit Corporation'
           href='/entityIndex'
            />
     </Grid.Column>
     <Grid.Column width={4} >
     </Grid.Column>
       </Grid.Row>
       <Grid.Row style={{paddingTop:'0'}}>
        <Grid.Column width={4} >
         </Grid.Column>
           <Grid.Column width={4} style={{ alignItems:'center',  paddingRight:'0'}} >
              <Card  style={{height:'200px', background:'gray', textAlign:'center', width:'100%', fontSize:'3em', color:'white', paddingRight:'0'}}
                     header= 'Smart pack'
                     href="/entities/new"
                       />
          </Grid.Column>

             <Grid.Column width={4} style={{paddingLeft:'0'}}>
              <Card style={{height:'200px', background:'rgba(50, 50, 50, 1)', textAlign:'center', width:'100%',  fontSize:'3em', paddingLeft:'0'}}

                header='Lets Chat'
                href='/entityIndex'
                 />
          </Grid.Column>
          <Grid.Column width={4} >
          </Grid.Column>
            </Grid.Row>
    <Grid.Row>
      <Grid.Column>
            <Carousel style={{background:'#0F93FE', height:'400px', position:'relative', textAlign:'center'}}>
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
          </Grid.Column>
</Grid.Row>
<Grid.Row>
  <Grid.Column widht={16} style={{height:'100px', textAlign:'center', width:'100%',  fontSize:'3em'}}>
  <h1 style={{color:'#0F93FE'}}>COLLABORATIVE BUSINESS</h1>
  </Grid.Column>
</Grid.Row>
<Grid.Row >

    <Grid.Column width={2}>
    </Grid.Column>
    <Grid.Column  width={6}style={{height:'200px', textAlign:'center',  fontSize:'3em'}} >
<h1 style={{color:'#0F93FE'}}>The best professionals are ready to help you create or transform an entity.</h1>
   </Grid.Column>


      <Grid.Column  width={6} style={{height:'200px', textAlign:'center',   fontSize:'3em'}}>
<h1  style={{color:'#0F93FE'}}>Collaborate Now</h1>
   </Grid.Column>



     <Grid.Column width={2}>
     </Grid.Column>

     </Grid.Row>
     <Footer/>
</Grid>



</Fragment>
)
}
}
 export default Index;
