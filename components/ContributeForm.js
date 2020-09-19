import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Entity from '../ethereum/entity';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class ContributeForm extends Component {
  state = {
    value: '',
    errorMessage: '',
    loading: false,
  };

  onSubmit = async event => {
    event.preventDefault();

    const entity = Entity(this.props.entityAddress);

    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      await entity.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, 'ether')
      });

      Router.replaceRoute(`/entities/${this.props.entityAddress}/show`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false, value: '' });
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label style={{color:"white"}}>Amount to Contribute</label>
        
          <Input
            value={this.state.value}
            onChange={event => this.setState({ value: event.target.value })}
            label="ETH"
            labelPosition="right"
          />
        </Form.Field>

        <Message error header="Oops!" content={this.state.errorMessage} />
        <Button primary loading={this.state.loading}>
          Buy Tokens!
        </Button>
      </Form>
    );
  }
}

export default ContributeForm;
