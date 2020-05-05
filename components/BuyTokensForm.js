import React, { Component,  Fragment } from 'react';
import { Form, Input, Message, Button, } from 'semantic-ui-react';
import Entity from '../ethereum/entity';
import Token from '../ethereum/token';
import SimpleCrowdsale from '../ethereum/simpleCrowdsale';
import web3 from '../ethereum/web3';
import { Router } from '../routes';


class BuyTokensForm extends Component {
  state = {
   
    errorMessage: '',
    loading: false,
    purchase: ''
   
  };


  onSubmitPurchase = async event => {
    event.preventDefault();
     console.log('yoyoy');
    const accounts = await web3.eth.getAccounts();
    const crowdsale = SimpleCrowdsale(this.props.crowdsaleAddress);
    const entity = this.props.entityAddress;
    
    this.setState({ loading: true, errorMessage: '' });
  

    try {
        await crowdsale.methods.buyTokens(accounts[0])
        .send({from: accounts[0], value: web3.utils.toWei(this.state.purchase, 'ether')});

        
      
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false, errorMessage: '' });
    Router.pushRoute(`/entities/${this.props.entityAddress}/show`);
  };


  render() {
    return (
    <Fragment>
    

      <Form onSubmit={this.onSubmitPurchase} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Purchase Tokens</label>
          <Input
            value={this.state.purchase}
            onChange={event => this.setState({ purchase: event.target.value })}
            label="ether"
            labelPosition="right"
          />
        </Form.Field>

        <Message error header="Oops!" content={this.state.errorMessage} />
        <Button primary loading={this.state.loading}>
          Buy Tokens!
        </Button>
      </Form>

       </Fragment>
    );
  }
}

export default  BuyTokensForm;