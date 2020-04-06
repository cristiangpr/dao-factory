import React, { Component, Fragment } from 'react';
import { Form, Button, Input, Message, Grid } from 'semantic-ui-react';
import Layout from '../../../components/Layout';
import Footer from '../../../components/Footer';
import Entity from '../../../ethereum/entity';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes.js'

class TokenNew extends Component {


  state = {
  
    errorMessage: '',
    loading: false,
    tokenName: '',
    tokenSymbol: '',
    initialsupply: ''
  };

  static async getInitialProps(props) {
    const { address } = props.query;
   
  
    return { address };
  }
  
 
onSubmit = async event => {
  event.preventDefault();

   const entity = Entity(this.props.address);
  

  this.setState({ loading: true, errorMessage: '' });

    try {
       const accounts = await web3.eth.getAccounts();
       await entity.methods
       .createToken(this.state.initialsupply, this.state.tokenName, this.state.tokenSymbol)
       .send({
         from: accounts[0]
       });

     Router.pushRoute('/');
     } catch (err) {
       this.setState({ errorMessage: err.message });
     }

     this.setState({ loading: false });
   };
   render() {
     return (
       <Fragment>
      <Layout>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} style={{width:'50%', paddingBottom:'160px;', paddingTop:'100px'}}>
          <h1 style={{color:'black'}}>Create new token</h1>
          <Form.Field>
           <label>Initial Supply</label>
           <Input
             value={this.state.minimumContribution}
             onChange={e => this.setState({initialsupply: e.target.value}) }
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
           <label>Token Mission</label>
           <Input
             value={this.state.tokenSymbol}
             onChange={e => this.setState({tokenSymbol: e.target.value}) }
             />
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
export default TokenNew
