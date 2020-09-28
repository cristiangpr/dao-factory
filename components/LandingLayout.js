import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Container, Jumbotron, Button } from 'react-bootstrap';
import Head from 'next/head';
import { Link } from '../routes';

const Layout = props => {
  return (
 <div className='app' style={{backgroundColor:'#20232a'}}>
    <Head>
      <link
       rel="stylesheet"
       href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
       integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
       crossOrigin="anonymous"
/>
       <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />

       <link href="/static/styles.css" rel="stylesheet" />
   </Head>

      <Header/>
      <Jumbotron fluid style={{backgroundImage:"url(../static/blockchain.jpg)"}}>
         <Container>
             <h1>Welcome to</h1>
             <h1>The DAO Factory</h1>
             <p>
              Create a payment request and fulfillment DAO
            </p>
            <p>
              Please make sure your wallet is connected to Rinkeby testnet
            </p>
             <p>
              <Link to="/entities/new">
                <Button variant="primary">Create DAO</Button>
             </Link>
            </p>
         </Container>
       </Jumbotron>
          <Container fluid style={{ minHeight: "calc(100vh - 425px)" , backgroundColor:'#20232a'}}>
            {props.children}
          </Container>
 
        <Footer/>
   </div>

 
  );
};
export default Layout