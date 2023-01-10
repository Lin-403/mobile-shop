import React from 'react'
import {LinkContainer} from "react-router-bootstrap"
import {Container,Row,Col,Navbar,Nav} from "react-bootstrap";


function Header() {
  return (
    <div>
   <Navbar bg="primary" variant='dark' expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
           <Navbar.Brand>Awu Shopping</Navbar.Brand>

        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <LinkContainer to="/cart">
                <Nav.Link><i className='fas fa-shopping-cart'/> Cart</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
                <Nav.Link><i className='fas fa-user'/> Login</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </div>
  )
}

export default Header