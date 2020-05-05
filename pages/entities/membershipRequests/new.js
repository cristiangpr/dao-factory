import React, { Component, Fragment } from 'react';
import { Form, Button, Message, Input, Grid } from 'semantic-ui-react';
import Entity from '../../../ethereum/entity';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';
import Layout from '../../../components/Layout';
import Footer from '../../../components/Footer';

class MembershipRequestNew extends Component {
state = {
 
  description: '',
  member: '',
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
  const { description, member } = this.state;

  this.setState({ loading: true, errorMessage: '' });

  try {
    const accounts = await web3.eth.getAccounts();
    await entity.methods
      .createRequest(description, member)
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
      <Link route={`/entities/${this.props.entityAddress}/requests`}>
        <a>Back</a>
      </Link>
      <h3>Create a Request</h3>
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} style={{width:'50%', paddingBottom:'100px'}}>
        <Form.Field>
          <label>Description</label>
          <Input
            value={this.state.description}
            onChange={event =>
              this.setState({ description: event.target.value })}
          />
        </Form.Field>

        <Form.Field>
          <label>Value in Ether</label>
          <Input
            value={this.state.value}
            onChange={event => this.setState({ value: event.target.value })}
          />
        </Form.Field>

        <Form.Field>
          <label>Recipient</label>
          <Input
            value={this.state.recipient}
            onChange={event =>
              this.setState({ recipient: event.target.value })}
          />
        </Form.Field>

        <Message error header="Oops!" content={this.state.errorMessage} />
        <Button primary loading={this.state.loading}>
          Create!
        </Button>
      </Form>
    </Layout>
    <Grid>
    <Footer/>
    </Grid>
    </Fragment>

  );
}
}

export default MembershipRequestNew;