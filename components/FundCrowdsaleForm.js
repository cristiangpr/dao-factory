import React, { Component,  Fragment } from 'react';
import { Form, Input, Message, Button, } from 'semantic-ui-react';
import Entity from '../ethereum/entity';
import Token from '../ethereum/token';
import SimpleCrowdsale from '../ethereum/simpleCrowdsale';
import web3 from '../ethereum/web3';
import { Router } from '../routes';


class FundCrowdsaleForm extends Component {
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
    

    this.setState({ loading: true, errorMessage: '' });

    try {
        await token.methods.transfer(this.props.crowdsaleAddress, web3.utils.toWei(this.state.supply, 'ether'))
        .send({from: accounts[0]});

    
        Router.pushRoute(`/entities/${this.props.entityAddress}/show`);
      
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false, errorMessage: '' });
    
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

   

       </Fragment>
    );
  }
}

export default FundCrowdsaleForm;