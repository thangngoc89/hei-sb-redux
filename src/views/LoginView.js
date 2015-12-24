import React from 'react'
import { Link } from 'react-router'
import LoginForm from 'components/LoginForm'
import Container from 'layouts/TransparentContainerLayout'

const outsideContainer = (<Link to='/'>&#8592; return home</Link>)

const LoginView = () => {
  return (
    <Container xs={12} sm={10} md={8} lg={6} outside={outsideContainer}>
      <LoginForm />
    </Container>
  )
}

export default LoginView
