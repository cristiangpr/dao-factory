
import React, { Component, Fragment } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Footer from '../../components/Footer';
import Entity from '../../ethereum/entity';
import ContributeForm from '../../components/ContributeForm'
import web3 from '../../ethereum/web3';

import { Link } from '../../routes';

class EntityShow extends Component {
   static async getInitialProps(props){
     const entity = Entity(props.query.address);
     const summary = await entity.methods.getSummary().call();
     console.log(summary);
     return {
       address: props.query.address,
       minimumContribution: summary[0],
       balance: summary[1],
       requestsCount: summary[2],
       approversCount: summary[3],
       manager: summary[4],
       name: summary[5],
       mission: summary[6]

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
       mission
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
           'The manager created this entity and can create requests to withdraw money',
         style: { overflowWrap: 'break-word',background:'rgba(247, 138, 42, 1)' }
       },
       {
           style:{background:'rgba(247, 138, 42, 1)'},
         header: minimumContribution,
         meta: 'Minimum Contribution (wei)',
         description:
           'You must contribute at least this much wei to become an member'
       },
       {
           style:{background:'rgba(247, 138, 42, 1)'},
         header: requestsCount,
         meta: 'Number of Requests',
         description:
           'A request tries to withdraw money from the contract. Requests must be approved by members'
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

  render() {
    return (
      <Fragment>
      <Layout>
        <h3>Entity Show</h3>
        <Grid>
    <Grid.Row>
      <Grid.Column width={10}>{this.renderCards()}</Grid.Column>

      <Grid.Column width={6}>
        <ContributeForm address={this.props.address} />
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
         <Grid.Column>
           <Link route={`/entities/${this.props.address}/requests`}>
             <a>
               <Button primary>View Requests</Button>
             </a>
           </Link>
           <Link route={`/entities/${this.props.address}/token/new`}>
             <a>
               <Button primary>Create Tokens</Button>
             </a>
           </Link>
           <Link route={`/entities/${this.props.address}/token`}>
             <a>
               <Button primary>View Tokens</Button>
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
