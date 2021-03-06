
import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Entity from '../ethereum/entity';
import { Router } from '../routes';


class RequestRow extends Component {
   onApprove = async () => {
     try { const entity = Entity(this.props.entityAddress);

      const accounts = await web3.eth.getAccounts();
      await entity.methods.approveRequest(this.props.id).send({
       from: accounts[0]
  });
      Router. pushRoute(`/entities/${this.props.entityAddress}/show`);
     }catch (err) {
        this.setState({ errorMessage: err.message });
}
        Router.pushRoute(`/entities/${this.props.entityAddress}/show`);
};

onFinalize = async () => {
  try { const entity = Entity(this.props.entityAddress);

  const accounts = await web3.eth.getAccounts();
  await entity.methods.finalizeRequest(this.props.id).send({
    from: accounts[0]
  });
  Router.pushRoute(`/entities/${this.props.entityAddress}/show`);
} catch (err) {
  this.setState({ errorMessage: err.message });
}
 
};

render() {
  const { Row, Cell } = Table;
  const { id, request, approversCount } = this.props;
  const readyToFinalize = request.approvalCount > approversCount / 2;

  return (
    <Row
      disabled={request.complete}
      positive={readyToFinalize && !request.complete}
    >
      <Cell>{id}</Cell>
      <Cell>{request.description}</Cell>
      <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
      <Cell>{request.compFactor}</Cell>
      <Cell>{request.recipient}</Cell>
      <Cell>
        {request.approvalCount}/{approversCount}
      </Cell>
      <Cell>
        {request.complete ? null : (
          <Button color="green" basic onClick={this.onApprove}>
            Approve
          </Button>
        )}
      </Cell>
      <Cell>
        {request.complete ? null : (
          <Button color="teal" basic onClick={this.onFinalize}>
            Finalize
          </Button>
        )}
      </Cell>
    </Row>
  );
}
}

export default RequestRow;
