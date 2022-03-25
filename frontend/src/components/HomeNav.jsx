import React from 'react'
import {Nav} from 'react-bootstrap'

export default function HomeNav() {
  return (
    <div>
        <Nav variant="pills" defaultActiveKey="/home">
  <Nav.Item>
  <Nav.Link href='/'>Home</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link href="/category">Add Category</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link href="/showcategory">
      Categories
    </Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link href="/product">
      Product
    </Nav.Link>
  </Nav.Item>
</Nav>
    </div>
  )
}
