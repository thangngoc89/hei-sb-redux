import React from 'react'
import { Link } from 'react-router'
import LoginForm from 'components/LoginForm'
import { Col, Row, Grid } from 'react-bootstrap'

export class LoginView extends React.Component {
  render () {
    return (
      <Grid fluid>
        <Row>
          <Col xs={12} sm={8} md={4} className='center-block'>
            <div className='container-transparent'>
              <LoginForm />
            </div>
            <Link to='/'>&#8592; return home</Link>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default LoginView
