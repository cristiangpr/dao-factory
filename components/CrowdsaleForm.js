import React, { Component,  Fragment } from 'react';
import { Form, Input, Message, Button, } from 'semantic-ui-react';
import Entity from '../ethereum/entity';
import Token from '../ethereum/token';
import Crowdsale from '../ethereum/crowdsale';
import web3 from '../ethereum/web3';
import { Router } from '../routes';
import CrowdsaleShow from '../pages/entities/token/crowdsale/show';

class CrowdsaleForm extends Component {
  state = {
   
    errorMessage: '',
    loading: false,
    purchase: '',
    supply: ''
  };


  onSubmitTransfer = async event => {
    event.preventDefault();
     console.log('yoyoy');
    const accounts = await web3.eth.getAccounts();
    const token = Token(this.props.tokenAddress);
    

  

    try {
        await token.methods.transfer(this.props.crowdsaleAddress, web3.utils.toWei(this.state.supply, 'ether'))
        .send({from: accounts[0]});

        Router.replaceRoute(`/entities/${entityAddress}/show`);
      
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    
  };

  onSubmitPurchase = async event => {
    event.preventDefault();
     console.log('yoyoy');
    const accounts = await web3.eth.getAccounts();
    const crowdsale = Crowdsale(this.props.crowdsaleAddress);
    

  

    try {
        await crowdsale.methods.buyTokens(accounts[0])
        .send({from: accounts[0], value: web3.utils.toWei(this.state.purchase, 'ether')});

        Router.replaceRoute(`/entities/${entityAddress}/show`);
      
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    
  };


  render() {
    return (
    <Fragment>
      <Form onSubmit={this.onSubmitTransfer} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Put Tokens up for Sale</label>
          <Input
            value={this.state.supply}
            onChange={event => this.setState({ supply: event.target.value })}
            label="ether"
            labelPosition="right"
          />
        </Form.Field>

        <Message error header="Oops!" content={this.state.errorMessage} />
        <Button primary loading={this.state.loading}>
          Transfer Tokens!
        </Button>
      </Form>

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

export default CrowdsaleForm;