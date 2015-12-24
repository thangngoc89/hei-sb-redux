import React from 'react'
import Container from 'layouts/TransparentContainerLayout'
import { Link } from 'react-router'

const outsideContainer = <Link to='/'>&#8592; return home</Link>

const NotFound = () => {
  return (
    <Container sm={5} outside={outsideContainer}>
      <div>
        <h1>Doh! 404!</h1>
        <p>These are <em>not</em> the droids you are looking for!</p>
      </div>
    </Container>
  )
}

export default NotFound
