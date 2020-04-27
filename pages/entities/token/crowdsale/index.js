import React, { Component, Fragment } from 'react';
import { Card, Button, Input, Message, Grid } from 'semantic-ui-react';
import Layout from '../../../../components/Layout';
import Footer from '../../../../components/Footer';
import Entity from '../../../../ethereum/entity';
import Token from '../../../../ethereum/token';
import web3 from '../../../../ethereum/web3';
import { Link, Router } from '../../../../routes.js'

class CrowdsaleIndex extends Component {
    static async getInitialProps(props) {
        const  entityAddress = props.query.entityAddress;
        const tokenAddress = props.query.tokenAddress;
        const entity = Entity(entityAddress);
        const crowdsales = await entity.methods.getDeployedCrowdsales().call();
     
    
     
        return { entityAddress, crowdsales : crowdsales, tokenAddress };
      }



  
  renderCrowdsales() {
    const items = this.props.crowdsales.map(crowdsale => {
      return {
        style:{background:'rgba(247, 138, 42, 1)'},
        header: crowdsale,
        description: (
          <Link route={`/entities/${this.props.entityAddress}/token/crowdsale/${crowdsale}/show`}>
          <a>View Crowdsale</a>
          </Link>
        ),
        fluid: true
      }
    });
    return <Card.Group items={items} style={{paddingBottom:'250px'}} />
  }

render(){
  return (
    <Fragment>
  <Layout>
  <div>

  <h3>Open Crowdsales</h3>
 <Link route={`/entities/${this.props.entityAddress}/token/${this.props.tokenAddress}/crowdsale/new`}>

<a>
  <Button
  content="Create Crowdsale"
  icon="add circle"
  primary
  floated="right"
  />
  </a>
</Link>
  {this.renderCrowdsales()}
  </div>
</Layout>
<Grid>
<Footer/>
</Grid>
</Fragment>
)
}
}
 export default CrowdsaleIndex;