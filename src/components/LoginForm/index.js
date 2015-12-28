import { PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { actions as userActions } from 'redux/modules/user'
import { Button } from 'react-bootstrap'
import LoginFormInput from './LoginFormInput'
import validator from './LoginFormValidator'
import styles from './style.scss'

const fields = ['fullName', 'dateOfBirth', 'university', 'email', 'code']

const mapStateToProps = (state) => ({
  ...state.user
})

export class LoginForm extends React.Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    submitting: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    isSaving: PropTypes.bool.isRequired,
    // Actions
    handleSubmit: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
    closeReminderModal: PropTypes.func.isRequired
  }

  render () {
    const {
      fields: {fullName, dateOfBirth, university, email, code},
      handleSubmit,
      isSaving,
      invalid
    } = this.props

    return (
      <div>
        <form onSubmit={handleSubmit(this.props.save)}>
          <LoginFormInput displayName='Full name' icon='name' object={fullName} />
          <LoginFormInput displayName='Date of Birth (DD/MM/YYYY)' icon='dateOfBirth' object={dateOfBirth} />
          <LoginFormInput displayName='University' icon='university' object={university} />
          <LoginFormInput displayName='Email' icon='email' type='email' object={email} />
          <LoginFormInput displayName='Code' icon='code' object={code} />
          <Button
            block
            type='submit'
            className={styles['submit-button']}
            disabled={invalid || isSaving}
          >
            {isSaving
              ? <span><i className='fa fa-circle-o-notch fa-spin'></i> Submiting...</span>
              : 'Submit'
            }
          </Button>
        </form>
      </div>
    )
  }
}

LoginForm = reduxForm({
  form: 'login',
  fields,
  validate: validator,
  touchOnChange: true
})(LoginForm)

export default connect(mapStateToProps, userActions)(LoginForm)
