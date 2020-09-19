import React, { Component, Fragment } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';

import web3 from '../ethereum/web3';
import { Router } from '../routes';

class TokenBalanceForm extends Component {
  state = {
    balance: '',
    address: '',
    errorMessage: '',
  
 
  };

  onSubmit = async event => {
    event.preventDefault();

 

    try {
      
    const value = await this.props.token.methods.balanceOf(this.state.address).call();
   

    this.setState({ balance: web3.utils.fromWei(value, 'ether' )});
  
  }  catch (err) {
    this.setState({ errorMessage: err.message });
  }
};



  render() {
    return (
  <Fragment>
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} success={!!this.state.balance}>
        <Form.Field>
          <label style={{color:"white"}}>Check Token Balance</label>
          <Input
            value={this.state.address}
            onChange={event => this.setState({ address: event.target.value })}
            label="address"
            labelPosition="right"
          />
        </Form.Field>
        <Message success  content={`Balance: ${this.state.balance}`}/>
        <Message error header="Oops!" content={this.state.errorMessage} />
        <Button primary>
         Check Balance
        </Button>
      </Form>


</Fragment>
    );
  }
}

export default TokenBalanceForm;