import React, { Component, Fragment } from 'react';
import { Form, Button, Input, Message, Grid } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Footer from '../../components/Footer';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Link, Router } from '../../routes.js'


class EntityNew extends Component {
  state = {
   
    errorMessage: '',
    loading: false,
    entityName: '',
    missionDescription: '',
    tokenName: '',
    tokenSymbol: '',
    rate: ''
  };
  onSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: '' });

    try {
      var ethJsUtil = require('ethereumjs-util');
       const accounts = await web3.eth.getAccounts();
       const contractFactoryAddress = '0xa264304D3AAe61e1715dc0cc7AAC8ade3FA9d95C';
       const futureAddress = ethJsUtil.bufferToHex(ethJsUtil.generateAddress(
        contractFactoryAddress,
        await web3.eth.getTransactionCount(contractFactoryAddress)));
        console.log(futureAddress);
        console.log(contractFactoryAddress);
      
       await factory.methods
         .createEntity(this.state.entityName, this.state.missionDescription, this.state.tokenName, this.state.tokenSymbol, this.state.rate)
         .send({
           from: accounts[0]
         });
      
     Router.pushRoute(`/entities/${futureAddress}/show`);
    
     } catch (err) {
       this.setState({ errorMessage: err.message });
     }

     this.setState({ loading: false });
   };
   render() {
     return (
       <Fragment>
      <Layout>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} style={{width:'50%', paddingBottom:'160px', paddingTop:'100px'}}>
          <h1 style={{color:'black'}}>Create new entity</h1>
      
          <Form.Field>
           <label>Entity Name</label>
           <Input
             value={this.state.entityName}
             onChange={e => this.setState({entityName: e.target.value}) }
            />
          </Form.Field>
          <Form.Field>
           <label>Entity Mission</label>
           <Input
             value={this.state.missionDescription}
             onChange={e => this.setState({missionDescription: e.target.value}) }
             />
          </Form.Field>
    
       
          <Form.Field>
           <label>Token Name</label>
           <Input
             value={this.state.tokenName}
             onChange={e => this.setState({tokenName: e.target.value}) }
           />
          </Form.Field>
          <Form.Field>
           <label>Token Symbol</label>
           <Input
             value={this.state.tokenSymbol}
             onChange={e => this.setState({tokenSymbol: e.target.value}) }
           />
          </Form.Field>
          <Form.Field>
           <label>Token Rate. Enter amount of tokens equal to 1 ETH</label>
           <Input
             value={this.state.rate}
             onChange={e => this.setState({rate: e.target.value}) }
             label="Tokens per ETH"
             labelPosition="right"/>
          </Form.Field>
          
            <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>Create!</Button>
        </Form>
      </Layout>
      <Grid>
      <Footer/>
      </Grid>
      </Fragment>
   )
}
}
export default EntityNew
