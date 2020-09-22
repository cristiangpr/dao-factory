
import React, { Component, Fragment } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../../components/Layout';
import { Container, Row, Col } from 'react-bootstrap';
import Token from '../../../ethereum/token';
import Entity from '../../../ethereum/entity';
import ContributeForm from '../../../components/ContributeForm';
import SellTokensForm from '../../../components/SellTokensForm'
import web3 from '../../../ethereum/web3';

import { Link } from '../../../routes';

class TokenShow extends Component {
   static async getInitialProps(props){
     const token = await Token(props.query.tokenAddress);
     const entity = await Entity(props.query.entityAddress);
     const tokenRate = await entity.methods.tokenRate().call();
     const rate = await web3.utils.fromWei(tokenRate, 'ether');
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
       tokenRate: tokenRate,
       name: name,
       symbol: symbol,
       entityAddress: props.query.entityAddress,
       convertedBalance: convertedBalance,
       convertedSupply : convertedSupply,
       convertedMyBalance : convertedMyBalance,
       accounts : accounts,
       rate : rate,
       myBalance: myBalance
      
     

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
       convertedMyBalance,
       tokenRate,
       rate,
       myBalance
     } = this.props;

     const items = [

      {

        header: "Entity",
        meta: entityAddress,
        
        style: { overflowWrap: 'break-word',background:'gray' }
      },
       {

         header: "Token Name",
         meta: name,
         
         style: { overflowWrap: 'break-word',background:'gray' }
       },
       {

        header: "Token Address",
        meta: tokenAddress,
        
        style: { overflowWrap: 'break-word',background:'gray' }
      },
       {

         header: "Token Symbol",
         meta: symbol,
      
         style: { overflowWrap: 'break-word',background:'gray' }
       },
       {

        header: "Total Supply",
        meta: convertedSupply,
     
        style: { overflowWrap: 'break-word',background:'gray' }
      },
      {

        header: "Token Rate to ETH",
        meta: tokenRate,
     
        style: { overflowWrap: 'break-word',background:'gray' }
      },
      {
      header: "Token Value in ETH",
      meta:1/ tokenRate,
   
      style: { overflowWrap: 'break-word',background:'gray' }
    },
      {
        header: "My Balance",
        meta: convertedMyBalance,
     
        style: { overflowWrap: 'break-word',background:'gray' }
      },
 
     ];

     return<Col> <Card.Group items={items} /> </Col>;
   }

  render() {
    return (
      <Fragment>
      <Layout>
        <Container style={{paddingTop:"5vh", paddingBottom:"5vh"}}>
        <h3>Token Info</h3>
    
    <Row>
      {this.renderCards()}

      <Col md={4}>
        <ContributeForm tokenAddress={this.props.tokenAddress} entityAddress={this.props.entityAddress}/>
        <SellTokensForm  tokenAddress={this.props.tokenAddress} entityAddress={this.props.entityAddress}/>

      

      

      </Col>
      
    </Row>


       
       </Container>
      </Layout>
      <Grid>

      </Grid>
      </Fragment>
    );
  }
}

export default TokenShow;
