import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import CSSModules from 'react-css-modules'
import { Button } from 'react-bootstrap'
import styles from './style.scss'
import LoginFormInput from './LoginFormInput'

const fields = ['fullName', 'DOB', 'university', 'email', 'code']

export class LoginForm extends React.Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  }

  render () {
    const {
      fields: {fullName, DOB, university, email, code},
      handleSubmit,
      submitting
    } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <LoginFormInput displayName='Full name' icon='name' {...fullName} />
        <LoginFormInput displayName='Day of Birth' icon='dob' {...DOB} />
        <LoginFormInput displayName='University' icon='university' {...university} />
        <LoginFormInput displayName='Email' icon='email' type='email' {...email} />
        <LoginFormInput displayName='Code' icon='code' {...code} />
        <Button
          block
          disabled={submitting}
          onClick={handleSubmit}
          styleName='submit-button'
        >
          {submitting ? 'LOADING...' : 'SUBMIT'}
        </Button>
      </form>
    )
  }
}

LoginForm = CSSModules(LoginForm, styles)

LoginForm = reduxForm({
  form: 'login',
  fields
})(LoginForm)

export default LoginForm
