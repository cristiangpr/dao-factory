
import React, { Component, Fragment } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../../components/Layout';
import Footer from '../../../components/Footer';
import Token from '../../../ethereum/token';
import Entity from '../../../ethereum/entity';
import CreateCrowdsaleForm from '../../../components/CreateCrowdsaleForm'
import web3 from '../../../ethereum/web3';

import { Link } from '../../../routes';

class TokenShow extends Component {
   static async getInitialProps(props){
     const token = await Token(props.query.tokenAddress);
     const name = await token.methods.name().call();
     const symbol = await token.methods.symbol().call();
     const totalSupply = await token.methods.totalSupply().call();
     const convertedSupply = await web3.utils.fromWei(totalSupply, 'ether');
     const balance = await token.methods.balanceOf(props.query.entityAddress).call();
     const convertedBalance = await web3.utils.fromWei(balance, 'ether');
     const accounts = await web3.eth.getAccounts();
     const myBalance = await token.methods.balanceOf(accounts[0]).call();
     const convertedMyBalance = await web3.utils.fromWei(myBalance, 'ether');

    
     return {
       tokenAddress: props.query.tokenAddress,
       name: name,
       symbol: symbol,
       entityAddress: props.query.entityAddress,
       convertedBalance: convertedBalance,
       convertedSupply : convertedSupply,
       convertedMyBalance : convertedMyBalance,
      
     

     };
};
     renderCards() {
     const {
       tokenAddress,
       name,
       symbol,
       convertedSupply,
       entityAddress,
       convertedBalance,
       convertedMyBalance
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
      {
        header: "My Balance",
        meta: convertedMyBalance,
     
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
        <CreateCrowdsaleForm entityAddress={this.props.entityAddress} tokenAddress={this.props.tokenAddress}/>

      

      

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
