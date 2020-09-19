import React, { Component, Fragment } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import { Container, Row, Col } from 'react-bootstrap';
import Entity from '../../ethereum/entity';
import Token from '../../ethereum/token';
import TokenBalanceForm from '../../components/TokenBalanceForm';
import MembershipForm from '../../components/MembershipForm';
import web3 from '../../ethereum/web3';

import { Link } from '../../routes';

class EntityShow extends Component {
   static async getInitialProps(props){
     const entity = await Entity(props.query.entityAddress);
     const summary = await entity.methods.getSummary().call();
     const tokenAddress = await entity.methods.token().call();
     const token = await Token(tokenAddress);
     const symbol = await token.methods.symbol().call();
     
     
     console.log(summary);
     return {
       entityAddress: props.query.entityAddress,
      tokenAddress: tokenAddress,
       token : token,
       symbol: symbol,
     
       balance: summary[0],
       requestsCount: summary[1],
       approversCount: summary[2],
       manager: summary[3],
       name: summary[4],
       mission: summary[5]

     };
};
     renderCards() {
     const {
       balance,
       manager,
       minimumContribution,
       requestsCount,
       approversCount,
       name,
       mission,
       entityAddress,
       tokens
     } = this.props;

     const items = [
       {

         header: name,
         meta: 'DAO Mission:',
         description:
          mission,
         style: { overflowWrap: 'break-word',background:'gray' }
       },
       {

        header:  'DAO address:',
        meta: entityAddress,
     
        
        style: { overflowWrap: 'break-word',background:'gray' }
      },
       {

         header: 'Address of Manager',
         meta: manager,
         description:
           'The manager created this entity',
         style: { overflowWrap: 'break-word',background:'gray' }
       },

       {
           style:{background:'gray'},
         header: 'Number of Payment Requests',
         meta: requestsCount,
         description:
           'Requests for payment of work. Requests must be created and approved by members'
       },
       {
           style:{background:'gray'},
         header: 'Number of Members',
         meta: approversCount,
         description:
           'Number of people who have joined this DAO'
       },
       {
           style:{background:'gray'},
         header: 'DAO Balance (ether)',
         meta: web3.utils.fromWei(balance, 'ether'),
         description:
           'Amount of ether in DAO account.'
       }
     ];

     return <Card.Group items={items} />;
   }

   renderToken() {
    const items = [
    {
        style:{background:'#0F93FE'},
        header: this.props.symbol,
        description: (
          <Link route={`/entities/${this.props.entityAddress}/token/${this.props.tokenAddress}/show`}>
          <a>View Token</a>
          </Link>
        ),
        fluid: true
      }
    ];
    return <Card.Group items={items}  />
  }




  render() {
    return (
      <Fragment>
      <Layout>
        <Container style={{paddingTop:"10vh"}}>
   
       
    <Row>
      <Col md={8}> <h3>DAO Dashboard</h3>{this.renderCards()}</Col>

      <Col md={4}>
      <h3>Token</h3>
     {this.renderToken()}
     <h3>Add or Remove Members</h3>
     <MembershipForm entityAddress={this.props.entityAddress}/>
    
      </Col>
    </Row>
    <Row>
         <Col width={8} style={{paddingTop:"1vh"}}>
           <Link route={`/entities/${this.props.entityAddress}/requests`}>
             <a>
               <Button primary>View Payment Requests</Button>
             </a>
           </Link>
    
      
           
         </Col>
         <Col md={4}  style={{paddingBottom:"1vh"}}>
         <h3 >Check Token Balance</h3>
     <TokenBalanceForm token={this.props.token}/>
    
      
           
         </Col>
       </Row>

       
       </Container>
      </Layout>
   
      </Fragment>
    );
  }
}

export default EntityShow;
