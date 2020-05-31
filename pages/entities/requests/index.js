import React, { Component, Fragment } from 'react';
import { Button, Table, Grid } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/Layout';
import Footer from '../../../components/Footer';
import Entity from '../../../ethereum/entity';
import RequestRow from '../../../components/RequestRow';
import { Container, Row, Col } from 'react-bootstrap';


class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { entityAddress } = props.query;
    const entity = Entity(entityAddress);
    const requestCount = await entity.methods.getRequestsCount().call();
    const membersCount = await entity.methods.membersCount().call();

    const requests = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((element, index) => {
          return entity.methods.requests(index).call();
        })
    );

    return { entityAddress, requests, requestCount, membersCount };
  }

  renderRows() {
      return this.props.requests.map((request, index) => {
        return (
          <RequestRow
            key={index}
            id={index}
            request={request}
            entityAddress={this.props.entityAddress}
            approversCount={this.props.membersCount}
          />
        );
      });
    }
  render() {
    const { Header, Row, HeaderCell, Body } = Table;

    return (
      <Fragment>
      <Layout>
        <Container>
        <h3>Requests</h3>
        <Link route={`/entities/${this.props.entityAddress}/requests/new`}>
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
              <HeaderCell>Hours</HeaderCell>
              <HeaderCell>Compensation Level</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRows()}</Body>
        </Table>
        <div>Found {this.props.requestCount} requests.</div>
        </Container>
      </Layout>
      <Grid>
    
      </Grid>
      </Fragment>
    );
  }
}

export default RequestIndex;
