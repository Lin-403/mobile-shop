import React from 'react'
import {Container,Row,Col} from "react-bootstrap";

function Footer() {
  return (
    <div>
        <Container>
           <Row>
             <Col className='text-center py-3'>CopyRight &copy; Awu Shopping</Col>
           </Row>
        </Container>
    </div>
  )
}

export default Footer