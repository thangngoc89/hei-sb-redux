import React from 'react'
import { Link } from 'react-router'
import CSSModules from 'react-css-modules'
import LoginForm from 'components/LoginForm'
import styles from './LoginView.scss'
import { Col, Row, Grid } from 'react-bootstrap'

export class LoginView extends React.Component {
  render () {
    return (
      <Grid fluid>
        <Row>
          <Col xs={12} md={5} className='center-block'>
            <div styleName='main-container'>
              <LoginForm />
            </div>
            <Link to='/'>&#8592; return home</Link>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default CSSModules(LoginView, styles)
