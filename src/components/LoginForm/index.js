import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { Button } from 'react-bootstrap'
import LoginFormInput from './LoginFormInput'
import validator from './LoginFormValidator'
import styles from './style.scss'

const fields = ['fullName', 'DOB', 'university', 'email', 'code']

export class LoginForm extends React.Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired
  }

  render () {
    const {
      fields: {fullName, DOB, university, email, code},
      handleSubmit,
      submitting,
      pristine,
      invalid
    } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <LoginFormInput displayName='Full name' icon='name' object={fullName} />
        <LoginFormInput displayName='Day of Birth' icon='dob' object={DOB} />
        <LoginFormInput displayName='University' icon='university' object={university} />
        <LoginFormInput displayName='Email' icon='email' type='email' object={email} />
        <LoginFormInput displayName='Code' icon='code' object={code} />
        <Button
          block
          onClick={handleSubmit}
          className={styles['submit-button']}
          disabled={pristine || invalid || submitting}
        >
          {submitting ? 'Loading...' : 'Submit'}
        </Button>
      </form>
    )
  }
}

LoginForm = reduxForm({
  form: 'login',
  fields,
  validate: validator
})(LoginForm)

export default LoginForm
