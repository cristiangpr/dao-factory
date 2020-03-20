import React, { Component, Fragment } from 'react';
import { Button, Table, Grid } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/Layout';
import Footer from '../../../components/Footer';
import Entity from '../../../ethereum/entity';
import RequestRow from '../../../components/RequestRow';


class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    const entity = Entity(address);
    const requestCount = await entity.methods.getRequestsCount().call();
    const collaboratorsCount = await entity.methods.collaboratorsCount().call();

    const requests = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((element, index) => {
          return entity.methods.requests(index).call();
        })
    );

    return { address, requests, requestCount, collaboratorsCount };
  }

  renderRows() {
      return this.props.requests.map((request, index) => {
        return (
          <RequestRow
            key={index}
            id={index}
            request={request}
            address={this.props.address}
            approversCount={this.props.collaboratorsCount}
          />
        );
      });
    }
  render() {
    const { Header, Row, HeaderCell, Body } = Table;

    return (
      <Fragment>
      <Layout>
        <h3>Requests</h3>
        <Link route={`/entities/${this.props.address}/requests/new`}>
          <a>
            <Button primary floated="right" style={{ marginBottom: 10 }}>
              Add Request
            </Button>
          </a>
        </Link>
        <Table style={{paddingBottom:'300px'}}>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRows()}</Body>
        </Table>
        <div>Found {this.props.requestCount} requests.</div>
      </Layout>
      <Grid>
      <Footer/>
      </Grid>
      </Fragment>
    );
  }
}

export default RequestIndex;
