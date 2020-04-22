import React, { Component, Fragment } from 'react';
import { Form, Button, Input, Message, Grid } from 'semantic-ui-react';
import Layout from '../../../../components/Layout';
import Footer from '../../../../components/Footer';
import Entity from '../../../../ethereum/entity';
import Token from '../../../../ethereum/token';
import web3 from '../../../../ethereum/web3';
import { Link, Router } from '../../../../routes.js'

class CrowdsaleNew extends Component {


  state = {
  
    errorMessage: '',
    loading: false,
    rate: '',
    supply: 0,
   
  };

  static async getInitialProps(props) {
    const entityAddress = props.query.entityAddress;
    const tokenAddress = props.query.tokenAddress;
   
  
    return { tokenAddress,  entityAddress };
  }
  
 
onSubmit = async event => {
  event.preventDefault();

  const entity = Entity(this.props.entityAddress);
  const token = Token(this.props.tokenAddress);
  console.log(this.props.entityAddress);

  this.setState({ loading: true, errorMessage: '' });

    try {
       const accounts = await web3.eth.getAccounts();
       await entity.methods
       .createCrowdsale(this.state.rate, this.props.entityAddress, this.props.tokenAddress)
       .send({
         from: accounts[0]
       });
       const crowdsales = await entity.methods.getDeployedCrowdsales().call();
    
       await token.methods.transfer(crowdsales[0], this.state.supply);

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
          <h1 style={{color:'black'}}>Create new Crowdsale </h1>
          <Form.Field>
           <label>Token Price in ETH</label>
           <Input
             value={this.state.rate}
             onChange={e => this.setState({rate: e.target.value}) }
             />
          </Form.Field>
          <Form.Field>
           <label>Token Available For Sale</label>
           <Input
             value={this.state.supply}
             onChange={e => this.setState({supply: e.target.value}) }
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
export default CrowdsaleNew
