import React, { Component, Fragment }from 'react';
import factory from '../ethereum/factory';
import { Card, Button } from 'semantic-ui-react';
import {  Col, Row, Container } from 'react-bootstrap';
import Layout from '../components/Layout';

import { Link } from '../routes.js'

class EntityIndex extends Component {
  static async getInitialProps(){
    const entities =  await factory.methods.getDeployedEntities().call();
    return { entities: entities};



  }
  renderEntities() {
    const items = this.props.entities.map(entityAddress => {
      return {
        style:{background:'gray'},
        header: "Address",
        meta: entityAddress,
        description: (
          <Link route={`/entities/${entityAddress}/show`}>
          <a>View DAO</a>
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
  <Container style={{paddingTop:"10vh"}}>
  <div>

  <h3>Open DAOs</h3>
<Link route='/entities/new'>
<a>
  <Button
  content="Create DAO"
  icon="add circle"
  primary
  floated="right"
  />
  </a>
</Link>
  {this.renderEntities()}
  </div>
  </Container>
</Layout>


</Fragment>
)
}
}
 export default EntityIndex;
