import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from '../routes';

export default () => {
  return (

    <Navbar collapseOnSelect expand="lg"  style={{ background:'#0F93FE', height: '80px'}} >
    <Navbar.Brand href="/">COLLABORATIVECOMMONS.IO</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto"  style={{ background:'#0F93FE'}}>
        <Nav.Link href="/entities/new">Create Entity</Nav.Link>
        <Nav.Link href="/entityIndex">View Entities</Nav.Link>
        <Nav.Link href="#pricing">Collaborate</Nav.Link>
        <Nav.Link href="#pricing">Download</Nav.Link>
        
        <Nav.Link href="#pricing">Services</Nav.Link>
  
  
  
      </Nav>
      <Nav>
        <Nav.Link href="#deets">My CC.IO</Nav.Link>
      
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  )
}