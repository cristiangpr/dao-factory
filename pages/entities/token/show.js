
import React, { Component, Fragment } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../../components/Layout';
import Footer from '../../../components/Footer';
import Token from '../../../ethereum/token';
import ContributeForm from '../../../components/ContributeForm'
import web3 from '../../../ethereum/web3';

import { Link } from '../../../routes';

class TokenShow extends Component {
   static async getInitialProps(props){
     const token = Token(props.query.address);
     const name = await token.methods.name().call();
     const symbol = await token.methods.symbol().call();
     const totalSupply = await token.methods.totalSupply().call();

    
     return {
       address: props.query.address,
       name: name,
       symbol: symbol,
       totalSupply : totalSupply
     

     };
};
     renderCards() {
     const {
     
       name,
       symbol,
       totalSupply
     } = this.props;

     const items = [
       {

         header: "Token Name",
         meta: name,
         
         style: { overflowWrap: 'break-word',background:'rgba(247, 138, 42, 1)' }
       },
       {

         header: "Token Symbol",
         meta: symbol,
      
         style: { overflowWrap: 'break-word',background:'rgba(247, 138, 42, 1)' }
       },
       {

        header: "Total Supply",
        meta: totalSupply,
     
        style: { overflowWrap: 'break-word',background:'rgba(247, 138, 42, 1)' }
      },
 
     ];

     return <Card.Group items={items} />;
   }

  render() {
    return (
      <Fragment>
      <Layout>
        <h3>Token Show</h3>
        <Grid style={{marginTop:'100px'}}>
    <Grid.Row>
      <Grid.Column width={6}>{this.renderCards()}</Grid.Column>

      <Grid.Column width={10}>
        <ContributeForm address={this.props.address} />
      </Grid.Column>
    </Grid.Row>


       </Grid>

      </Layout>
      <Grid>
   <Footer/>
      </Grid>
      </Fragment>
    );
  }
}

export default TokenShow;
