import React, { Component, Fragment } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Footer from '../../components/Footer';
import Entity from '../../ethereum/entity';
import Token from '../../ethereum/token';

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
         meta: 'Entity Mission:',
         description:
          mission,
         style: { overflowWrap: 'break-word',background:'rgba(247, 138, 42, 1)' }
       },
       {

         header: manager,
         meta: 'Address of Manager',
         description:
           'The manager created this entity',
         style: { overflowWrap: 'break-word',background:'rgba(247, 138, 42, 1)' }
       },

       {
           style:{background:'rgba(247, 138, 42, 1)'},
         header: requestsCount,
         meta: 'Number of Payment Requests',
         description:
           'Requests for Payment of Work. Requests must be approved by members'
       },
       {
           style:{background:'rgba(247, 138, 42, 1)'},
         header: approversCount,
         meta: 'Number of Members',
         description:
           'Number of people who have joined this entity'
       },
       {
           style:{background:'rgba(247, 138, 42, 1)'},
         header: web3.utils.fromWei(balance, 'ether'),
         meta: 'Entity Balance (ether)',
         description:
           'The balance is how much money this entity has left to spend.'
       }
     ];

     return <Card.Group items={items} />;
   }

   renderToken() {
    const items = [
    {
        style:{background:'#9933ff'},
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
        <h3>Entity Show</h3>
        <Grid>
    <Grid.Row>
      <Grid.Column width={10}> <h3 style={{color: 'black'}}>Entity</h3>{this.renderCards()}</Grid.Column>

      <Grid.Column width={6}>
      <h3 style={{color: 'black'}} >Token</h3>
     {this.renderToken()}
     <h3 style={{color: 'black'}} >Add or Remove Members</h3>
     <MembershipForm entityAddress={this.props.entityAddress}/>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
         <Grid.Column>
           <Link route={`/entities/${this.props.entityAddress}/requests`}>
             <a>
               <Button primary>View Payment Requests</Button>
             </a>
           </Link>
    
           
           <Link route={`/entities/${this.props.entityAddress}/dashboard`}>
             <a>
               <Button primary>Manage Entity</Button>
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

export default EntityShow;
