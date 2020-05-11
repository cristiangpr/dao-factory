import React, { Component,  Fragment } from 'react';
import { Form, Input, Message, Button, } from 'semantic-ui-react';
import Entity from '../ethereum/entity';
import Token from '../ethereum/token';

import web3 from '../ethereum/web3';
import { Router } from '../routes';


class SellTokensForm extends Component {
  state = {
   
    errorMessage: '',
    loading: false,
    amount: '',
    approved: false

   
  };


  onSubmit = async event => {
    event.preventDefault();
    
    const accounts = await web3.eth.getAccounts();
 
    const entity = Entity(this.props.entityAddress);
    
    this.setState({ loading: true, errorMessage: '' });
  

    try {
      
        await entity.methods.sellTokens(accounts[0], web3.utils.toWei(this.state.amount, 'ether'))
        .send({from: accounts[0]});

        
      
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false, errorMessage: '' });
    Router.pushRoute(`/entities/${this.props.entityAddress}/show`);
  };
  
  
  onSubmitApproval = async event => {
    event.preventDefault();
  
    const accounts = await web3.eth.getAccounts();
 
    const token = Token(this.props.tokenAddress);
    
    this.setState({ loading: true, errorMessage: '' });
  

    try {
        
        await token.methods.approve(this.props.entityAddress, web3.utils.toWei(this.state.amount, 'ether'))
        .send({from: accounts[0]});

        
      
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false, errorMessage: '', approved: true});

  };


  render() {
    return (
    <Fragment>
    

      <Form  error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Exchange Tokens for Ether</label>
          <Input
            value={this.state.amount}
            onChange={event => this.setState({ amount: event.target.value })}
            label='Tokens'
            labelPosition="right"
          />
        </Form.Field>

        <Message error header="Oops!" content={this.state.errorMessage} />
        <Button onClick={this.onSubmitApproval} primary loading={this.state.loading} disabled={this.state.approved} >
          Approve Transaction!
        </Button>
        <Button onClick={this.onSubmit} primary loading={this.state.loading} disabled={!this.state.approved}>
          Sell Tokens!
        </Button>
      </Form>

       </Fragment>
    );
  }
}

export default  SellTokensForm;