import { PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { actions as userActions } from 'redux/modules/user'
import { Button } from 'react-toolbox/lib/button'
import LoginFormInput from './LoginFormInput'
import validator from './LoginFormValidator'

const fields = ['fullName', 'dateOfBirth', 'university', 'email', 'code']

const mapStateToProps = (state) => ({
  isSaving: state.user.get('isSaving')
})

export class LoginForm extends React.Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
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
          <LoginFormInput displayName='Full name' icon='face' object={fullName} />
          <LoginFormInput displayName='Date of Birth' icon='cake' object={dateOfBirth} />
          <LoginFormInput displayName='University' icon='account_balance' object={university} />
          <LoginFormInput displayName='Email' icon='email' type='email' object={email} />
          <LoginFormInput displayName='Code' icon='code' object={code} />
          <Button
            raised
            primary
            disabled={invalid || isSaving}
            className='btn-block'
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
