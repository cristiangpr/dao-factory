import React, { Component, Fragment } from 'react';
import { Card, Button, Input, Message, Grid } from 'semantic-ui-react';
import Layout from '../../../components/Layout';
import Footer from '../../../components/Footer';
import Entity from '../../../ethereum/entity';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes.js'

class TokenIndex extends Component {
    static async getInitialProps(props) {
        const { entityAddress } = props.query;
        const entity = Entity(entityAddress);
        const tokens = await entity.methods.getDeployedTokens().call();
     
    
     
        return { entityAddress, tokens : tokens };
      }



  
  renderTokens() {
    const items = this.props.tokens.map(token => {
      return {
        style:{background:'rgba(247, 138, 42, 1)'},
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

render(){
  return (
    <Fragment>
  <Layout>
  <div>

  <h3>Open Tokens</h3>
<Link route={`/entities/${this.props.entityAddress}/token/new`}>
<a>
  <Button
  content="Create Token"
  icon="add circle"
  primary
  floated="right"
  />
  </a>
</Link>
  {this.renderTokens()}
  </div>
</Layout>
<Grid>
<Footer/>
</Grid>
</Fragment>
)
}
}
 export default TokenIndex;