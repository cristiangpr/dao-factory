import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Container } from 'react-bootstrap';
import Head from 'next/head';

export default props => {
  return (
    <div className='app'>
    <Head>
    <link
 rel="stylesheet"
 href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
 integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
 crossorigin="anonymous"
/>
     <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />

     <link href="/static/styles.css" rel="stylesheet" />
   </Head>

      <Header/>
    <Container fluid style={{paddingTop: '50px', paddingBottom:"50px"}}>


      {props.children}


    </Container>
  <Footer/>

</div>
  );
};
