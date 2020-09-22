import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from '../routes';

const Header = () => {
  return (

    <Navbar collapseOnSelect expand="lg"  style={{ background:'#0F93FE', height: '40px', zIndex:1020,position:'relative'}} >
    <Navbar.Brand href="/">DAO FACTORY</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto"  style={{ background:'#0F93FE', paddingLeft: "5%"}}>
        <Nav.Link href="/entities/new">Create DAO</Nav.Link>
        <Nav.Link href="/entityIndex">View DAOs</Nav.Link>
        <Nav.Link href="/about">About</Nav.Link>
      
  
  
  
      </Nav>
      <Nav  style={{ background:'#0F93FE', paddingLeft: "5%"}}>
        <Nav.Link href="#deets">My Account</Nav.Link>
      
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  )
}
export default Header;