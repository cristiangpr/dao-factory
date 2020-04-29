import React, { Component, Fragment } from 'react';
import { Mwssage, Grid, Card } from 'semantic-ui-react';
import Layout from '../../../../components/Layout';
import Footer from '../../../../components/Footer';
import Entity from '../../../../ethereum/entity';
import Token from '../../../../ethereum/token';
import web3 from '../../../../ethereum/web3';
import { Link, Router } from '../../../../routes.js';
import CreateCrowdsaleForm from '../../../../components/CreateCrowdsaleForm';

class CrowdsaleNew extends Component {


  static async getInitialProps(props){
    const token = await Token(props.query.tokenAddress);
   
   

    const name = await token.methods.name().call();
    const symbol = await token.methods.symbol().call();
    const totalSupply = await token.methods.totalSupply().call();
    const convertedSupply = await web3.utils.fromWei(totalSupply, 'ether');
    
    
    
   

   
    return {
      tokenAddress: props.query.tokenAddress,
      name: name,
      symbol: symbol,
      entityAddress: props.query.entityAddress,
   
      convertedSupply : convertedSupply,
 
     
     
    

    };
};
    renderCards() {
    const {
      tokenAddress,
      name,
      symbol,
      convertedSupply,
      entityAddress,
    
  
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
export default CrowdsaleNew