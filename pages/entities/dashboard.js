import React, { Component, Fragment } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Footer from '../../components/Footer';
import Entity from '../../ethereum/entity';
import SimpleCrowdsale from '../../ethereum/simpleCrowdsale';
import MebershipForm from '../../components/MembershipForm'
import web3 from '../../ethereum/web3';

import { Link } from '../../routes';
import MembershipForm from '../../components/MembershipForm';

class Dashboard extends Component {
   static async getInitialProps(props){
     const entity = Entity(props.query.entityAddress);
     const summary = await entity.methods.getSummary().call();
     const tokens = await entity.methods.getDeployedTokens().call();
     const crowdsales = await entity.methods.getDeployedCrowdsales().call();
     const requestCount = await entity.methods.getRequestsCount().call();
     const membersCount = await entity.methods.membersCount().call();
 
     const requests = await Promise.all(
       Array(parseInt(requestCount))
         .fill()
         .map((element, index) => {
           return entity.methods.requests(index).call();
         })
     );
     
     console.log(summary);
     return {
       entityAddress: props.query.entityAddress,
       requestCount :  requestCount,
       membersCount : membersCount,
       requests : requests,
       tokens : tokens,
       crowdsales : crowdsales,
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
       membersCount,
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
         header: membersCount,
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

   renderRequests() {
    const items = this.props.requests.map(request => {
      return {
        style:{background:'#00cc00'},
        header: request.description,
        description: (
          <Link route={`/entities/${this.props.entityAddress}/requests`}>
          <a>View Request</a>
          </Link>
        ),
        fluid: true
      }
    });
    return <Card.Group items={items} style={{paddingBottom:'250px'}} />
  }

   renderTokens() {
    const items = this.props.tokens.map(token => {
      return {
        style:{background:'#9933ff'},
        header: token,
        description: (
          <Link route={`/entities/${this.props.entityAddress}/token/${token}/show`}>
          <a>View Token</a>
          </Link>
        ),
        fluid: true
      }
    });
    return <Card.Group items={items} style={{paddingBottom:'250px'}} />
  }
  renderCrowdsales() {
    const items = this.props.crowdsales.map(crowdsale => {
      return {
        style:{background:'#0F93FE'},
        header: crowdsale,
        description: (
          <Link route={`/entities/${this.props.entityAddress}/crowdsale/${crowdsale}/show`}>
          <a>View Crowdsale</a>
          </Link>
        ),
        fluid: true
      }
    });
    return <Card.Group items={items} style={{paddingBottom:'250px'}} />
  }



  render() {
    return (
      <Fragment>
      <Layout>
        <h3>Entity Show</h3>
        <Grid>
    <Grid.Row>
      <Grid.Column width={4}> <h3 style={{color: 'black'}}>Open requests</h3>{this.renderRequests()}</Grid.Column>

    

     
      <Grid.Column width={4}>
      <h3 style={{color: 'black'}} >Tokens</h3>
      {this.renderTokens()}
      </Grid.Column>
      <Grid.Column width={4}>
      <h3 style={{color: 'black'}} >Open Token Crowdsales</h3>
      {this.renderCrowdsales()}
      </Grid.Column>

      <Grid.Column width={4}>
      <h3 style={{color: 'black'}} >Add or Remove Members</h3>
    <MembershipForm entityAddress={this.props.entityAddress}/>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
         <Grid.Column>
           <Link route={`/entities/${this.props.entityAddress}/requests`}>
             <a>
               <Button primary>View Requests</Button>
             </a>
           </Link>
           <Link route={`/entities/${this.props.entityAddress}/token/new`}>
             <a>
               <Button primary>Create Tokens</Button>
             </a>
           </Link>
           <Link route={`/entities/${this.props.entityAddress}/token`}>
             <a>
               <Button primary>View Tokens</Button>
             </a>
           </Link>
           
           <Link route={`/entities/${this.props.entityAddress}/token/crowdsale`}>
             <a>
               <Button primary>View Crowdsale</Button>
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

export default Dashboard;