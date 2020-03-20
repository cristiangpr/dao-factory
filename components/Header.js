import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';

export default () => {
  return (

    <Menu className="ui top fixed responsive menu" style={{ background:'#0F93FE', height: '80px'}} >

      <Link route="/">
        <a className="item">COLLABORATIVECOMMONS.IO</a>
      </Link>
        <Menu.Menu position="right">
      <Link route="/entities/new">
        <a className="item">Create Entity</a>
      </Link>
      <Link route="/entityIndex">
        <a className="item">View Entities</a>
      </Link>
      <Link route="/entityIndex">
        <a className="item">Collaborate</a>
      </Link>
      <Link route="/">
        <a className="item">Download</a>
      </Link>
      <Link route="/">
        <a className="item">Services</a>
      </Link>
     </Menu.Menu>

      <Menu.Menu position="right">
        <Link route="/">
          <a className="item">MY CC</a>
        </Link>


      </Menu.Menu>
    </Menu>
  );
};
