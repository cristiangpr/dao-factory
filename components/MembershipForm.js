import React, { Component, Fragment } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Entity from '../ethereum/entity';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class MembershipForm extends Component {
  state = {
    memberAdd: '',
    memberRemove: '',
    errorMessage: '',
    errorMessage2: '',
    loading: false,
    loading2: false
  };

      onSubmitAdd = async event => {
        event.preventDefault();
        const entity = Entity(this.props.entityAddress);
         this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      await entity.methods.verify(this.state.memberAdd).send({
        from: accounts[0]
     
      });

      Router.pushRoute(`/entities/${this.props.entityAddress}/show`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

      this.setState({ loading: false, value: '' });
     Router.pushRoute(`/entities/${this.props.entityAddress}/show`);
  };

  onSubmitRemove = async event => {
    event.preventDefault();

    const entity = Entity(this.props.entityAddress);

    this.setState({ loading2: true, errorMessage2: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      await entity.methods.unverify(this.state.memberRemove).send({
        from: accounts[0]
     
      });

      Router.pushRoute(`/entities/${this.props.entityAddress}/show`);
    } catch (err) {
      this.setState({ errorMessage2: err.message });
    }

      this.setState({ loading2: false, value: '' });
      Router.pushRoute(`/entities/${this.props.entityAddress}/show`);
  };


  render() {
    return (
  <Fragment>
      <Form onSubmit={this.onSubmitAdd} error={!!this.state.errorMessage}>
        <Form.Field>
          <label style={{color:"white"}}>Address to add</label>
          <Input
            value={this.state.memberAdd}
            onChange={event => this.setState({ memberAdd: event.target.value })}
            label="address"
            labelPosition="right"
          />
        </Form.Field>

        <Message error header="Oops!" content={this.state.errorMessage} />
        <Button primary loading={this.state.loading}>
          Add Member!
        </Button>
      </Form>

    <Form onSubmit={this.onSubmitRemove} error={!!this.state.errorMessage2}>
      <Form.Field>
       <label style={{color:"white"}}>Address to remove</label>
        <Input
           value={this.state.memberRemove}
           onChange={event => this.setState({ memberRemove: event.target.value })}
           label="address"
           labelPosition="right"
          />
      </Form.Field>

       <Message error header="Oops!" content={this.state.errorMessage2} />
       <Button primary loading={this.state.loading2}>
         Remove Member!
       </Button>
     </Form>
   </Fragment>
    );
  }
}

export default MembershipForm;