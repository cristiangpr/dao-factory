
import React, { Component, Fragment } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../../../components/Layout';
import Footer from '../../../../components/Footer';
import Token from '../../../../ethereum/token';
import Entity from '../../../../ethereum/entity';
import Crowdsale from '../../../../ethereum/crowdsale';
import ContributeForm from '../../../../components/ContributeForm'
import web3 from '../../../../ethereum/web3';

import { Link } from '../../../../routes';

class CrowdsaleShow extends Component {
   static async getInitialProps(props){
     const token = await Token(props.query.tokenAddress);
     const crowdsale = await Crowdsale(props.query.crowdsaleAddress);
     const name = await token.methods.name().call();
     const symbol = await token.methods.symbol().call();
     const totalSupply = await token.methods.totalSupply().call();
     const convertedSupply = await web3.utils.fromWei(totalSupply, 'ether');
     const balance = await token.methods.balanceOf(props.query.crowdsaleAddress).call();
     const convertedBalance = await web3.utils.fromWei(balance, 'ether');

    
     return {
       tokenAddress: props.query.tokenAddress,
       crowdsaleAddress: props.query.crowdsaleAddress,
       name: name,
       symbol: symbol,
       entityAddress: props.query.entityAddress,
       balance: balance,
       convertedSupply : convertedSupply,
       convertedBalance : convertedBalance
     

     };
};
     renderCards() {
     const {
       tokenAddress,
       name,
       symbol,
       convertedSupply,
       entityAddress,
       balance,
       convertedBalance
     } = this.props;

     const items = [

      {

        header: "Entity",
        meta: entityAddress,
        
        style: { overflowWrap: 'break-word',background:'rgba(247, 138, 42, 1)' }
      },
       {

         header: "Token Name",
         meta: name,
         
         style: { overflowWrap: 'break-word',background:'rgba(247, 138, 42, 1)' }
       },
       {

        header: "Token Address",
        meta: tokenAddress,
        
        style: { overflowWrap: 'break-word',background:'rgba(247, 138, 42, 1)' }
      },
       {

         header: "Token Symbol",
         meta: symbol,
      
         style: { overflowWrap: 'break-word',background:'rgba(247, 138, 42, 1)' }
       },
       {

        header: "Total Supply",
        meta: convertedSupply,
     
        style: { overflowWrap: 'break-word',background:'rgba(247, 138, 42, 1)' }
      },
      {

        header: "Available for Sale",
        meta: convertedBalance,
     
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

        <Link route={`/entities/${this.props.entityAddress}/token/${this.props.tokenAddress}/crowdsale/new`}>
<a>
  <Button
  content="Create Crowdsale"
  icon="add circle"
  primary
  
  />
  </a>
</Link>
<Link route={`/entities/${this.props.entityAddress}/token/${this.props.tokenAddress}/crowdsale`}>
<a>
  <Button
  content="View Crowdsale"
  
  primary
  
  />
  </a>
</Link>
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

export default CrowdsaleShow;
