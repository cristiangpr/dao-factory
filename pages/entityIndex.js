import React, { Component, Fragment }from 'react';
import factory from '../ethereum/factory';
import { Card, Button, Grid } from 'semantic-ui-react';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import { Link } from '../routes.js'

class EntityIndex extends Component {
  static async getInitialProps(){
    const entities =  await factory.methods.getDeployedEntities().call();
    return { entities: entities};



  }
  renderEntities() {
    const items = this.props.entities.map(address => {
      return {
        style:{background:'rgba(247, 138, 42, 1)'},
        header: address,
        description: (
          <Link route={`/entities/${address}`}>
          <a>View Entity</a>
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

  <h3>Open Entities</h3>
<Link route='/entities/new'>
<a>
  <Button
  content="Create Entity"
  icon="add circle"
  primary
  floated="right"
  />
  </a>
</Link>
  {this.renderEntities()}
  </div>
</Layout>
<Grid>
<Footer/>
</Grid>
</Fragment>
)
}
}
 export default EntityIndex;
