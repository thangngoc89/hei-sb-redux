import React from 'react'
import { Link } from 'react-router'
import CSSModules from 'react-css-modules'
import LoginForm from 'components/LoginForm'
import styles from './LoginView.scss'
import { Row, Grid } from 'react-bootstrap'
export class LoginView extends React.Component {
  render () {
    return (
      <Grid fluid>
        <Row>
          <div className='col-xs-10 col-md-5 center-block'>
            <div styleName='main-container'>
              <LoginForm />
            </div>
            <Link to='/'>&#8592; return home</Link>
          </div>
        </Row>
      </Grid>
    )
  }
}

export default CSSModules(LoginView, styles)
