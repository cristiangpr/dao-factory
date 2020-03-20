import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Link } from '../routes';

export default () => {
  return (
    <Grid.Row className='footer' style={{ marginTop: '10px', background:'#0F93FE', height: '300px', textAlign:'left'}} >
       <Grid.Column width={2}>
       </Grid.Column>
      <Grid.Column width={6}>
        <h1 className="item" id='footer'>OUR ORG </h1>
        <h3>Open Space Network Foundation <br/>503c</h3>



      </Grid.Column>

      <Grid.Column width={3}>
        <h1 className="item" id='footer'>Head Office </h1>
         <h3>San Francisco, CA 94158</h3>
        </Grid.Column>
      <Grid.Column width={3}>
        <h1 className="item" id='footer'>Case Studies </h1>
        <h3>Learn with case studies</h3>
      </Grid.Column>

      <Grid.Column width={2}>
      </Grid.Column>


    </Grid.Row>
  );
};
