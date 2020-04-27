import React, { Component,  Fragment } from 'react';
import { Form, Input, Message, Button, } from 'semantic-ui-react';
import Entity from '../ethereum/entity';
import Token from '../ethereum/token';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class CreateCrowdsaleForm extends Component {
  state = {
    rate: 0,
    errorMessage: '',
    loading: false,
    crowdsaleAddress: '',
    supply: 0
  };

  onSubmitRate = async event => {
    event.preventDefault();

    const entity = Entity(this.props.entityAddress);
    
    

    this.setState({ loading: true, errorMessage: '' });

    try {
        const accounts = await web3.eth.getAccounts();
        var ethJsUtil = require('ethereumjs-util');
        const entityAddress = this.props.entityAddress;
        const tokenAddress = this.props.tokenAddress;
        const crowdsaleAddress = ethJsUtil.bufferToHex(ethJsUtil.generateAddress(
         entityAddress,
         await web3.eth.getTransactionCount(entityAddress)));
      
         await entity.methods
         .createCrowdsale(this.state.rate, this.props.entityAddress, this.props.tokenAddress)
         .send({
           from: accounts[0]
         });
         this.setState({crowdsaleAddress: crowdsaleAddress });
         Router.replaceRoute(`/entities/${entityAddress}/show`);
    
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false, value: ''});

  };

  onSubmitTransfer = async event => {
    event.preventDefault();

    
    const token = Token(this.props.tokenAddress);
    

  

    try {
        await token.methods.transfer(crowdsaleAddress, web3.utils.toWei(this.state.supply, 'ether'));
      
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    
  };


  render() {
    return (
    <Fragment>
      <Form onSubmit={this.onSubmitRate} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Set Token Rate in Ether</label>
          <Input
            value={this.state.rate}
            onChange={event => this.setState({ rate: event.target.value })}
            label="ether"
            labelPosition="right"
          />
        </Form.Field>

        <Message error header="Oops!" content={this.state.errorMessage} />
        <Button primary loading={this.state.loading}>
          Set Rate!
        </Button>

     
      </Form>

  

       </Fragment>
    );
  }
}

export default CreateCrowdsaleForm;