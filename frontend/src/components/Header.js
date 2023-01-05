import React from 'react'
import {Container,Row,Col,Navbar,Nav} from "react-bootstrap";


function Header() {
  return (
    <div>
   <Navbar bg="primary" variant='dark' expand="lg" collapseOnSelect>
      <Container>
        <Navbar.Brand href="/">Awu Shopping</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Link href="/cart"><i className='fas fa-shopping-cart'/> Cart</Nav.Link>
            <Nav.Link href="/login"><i className='fas fa-user'/> Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </div>
  )
}

export default Header