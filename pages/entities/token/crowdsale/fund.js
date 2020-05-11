import React, { Component, Fragment } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../../../components/Layout';
import Footer from '../../../../components/Footer';
import Token from '../../../../ethereum/token';
import Entity from '../../../../ethereum/entity';

import web3 from '../../../../ethereum/web3';

import { Link } from '../../../../routes';

class CrowdsaleFund extends Component {
   static async getInitialProps(props){
    
     const crowdsale = await SimpleCrowdsale(props.query.crowdsaleAddress);
     const rate = await crowdsale.methods.rate().call();
     const tokenAddress = props.query.tokenAddress;
     const token = await Token(tokenAddress);
     const name = await token.methods.name().call();
     const symbol = await token.methods.symbol().call();
     const totalSupply = await token.methods.totalSupply().call();
     const convertedSupply = await web3.utils.fromWei(totalSupply, 'ether');
     const balance = await token.methods.balanceOf(props.query.crowdsaleAddress).call();
     const convertedBalance = await web3.utils.fromWei(balance, 'ether');
    
     
   
    
     return {
       tokenAddress: tokenAddress,
       crowdsaleAddress: props.query.crowdsaleAddress,
       name: name,
       symbol: symbol,
       entityAddress: props.query.entityAddress,
       balance: balance,
       convertedSupply : convertedSupply,
       convertedBalance : convertedBalance,
     
       crowdsale : crowdsale,
       rate : rate
     

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
       convertedBalance,
       convertedMyBalance,
       rate
     } = this.props;

     const items = [

      {

        header: "Entity Address",
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

    {
      header: "Token Price in ETH",
      meta: rate,
   
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
        <FundCrowdsaleForm entityAddress={this.props.entityAddress} tokenAddress={this.props.tokenAddress} crowdsaleAddress={this.props.crowdsaleAddress} />


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

export default CrowdsaleFund;