
import React, { Component, Fragment } from 'react';
import { Form, Button, Message, Input, Grid } from 'semantic-ui-react';
import Entity from '../../../ethereum/entity';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';
import Layout from '../../../components/Layout';
import Footer from '../../../components/Footer';
import { Container, Row, Col } from 'react-bootstrap';

class RequestNew extends Component {
state = {
  value: '',
  description: '',
  compFactor: '',
  loading: false,
  errorMessage: ''
};

static async getInitialProps(props) {
  const { entityAddress } = props.query;

  return { entityAddress };
}

onSubmit = async event => {
  event.preventDefault();

  const entity = Entity(this.props.entityAddress);
  const { description, value, compFactor } = this.state;

  this.setState({ loading: true, errorMessage: '' });

  try {
    const accounts = await web3.eth.getAccounts();
    await entity.methods
      .createRequest(description, web3.utils.toWei(value, 'ether'),compFactor, accounts[0])
      .send({ from: accounts[0] });

    Router.pushRoute(`/entities/${this.props.entityAddress}/requests`);
  } catch (err) {
    this.setState({ errorMessage: err.message });
  }

  this.setState({ loading: false });
};

render() {
  return (
    <Fragment>
    <Layout>
      <Container>
    
      <h3 style={{color:"white", paddingTop:"100px"}} >Create a Request</h3>
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} style={{width:'50%'}}>
        <Form.Field>
          <label style={{color:"white"}}>Description of Work</label>
          <Input
            value={this.state.description}
            onChange={event =>
              this.setState({ description: event.target.value })}
          />
        </Form.Field>

        <Form.Field>
          <label style={{color:"white"}}>Hours Worked</label>
          <Input
            value={this.state.value}
            onChange={event => this.setState({ value: event.target.value })}
          />
        </Form.Field>

        <Form.Field>
          <label style={{color:"white"}}>Compensation Level</label>
          <Input
            value={this.state.recipient}
            onChange={event =>
              this.setState({compFactor: event.target.value })}
          />
        </Form.Field>

        <Message error header="Oops!" content={this.state.errorMessage} />
        <Button primary loading={this.state.loading}>
          Create!
        </Button>
      </Form>
      </Container>
    </Layout>
    <Grid>
  
    </Grid>
    </Fragment>

  );
}
}

export default RequestNew;
