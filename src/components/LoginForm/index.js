import { PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { actions as userActions } from 'redux/modules/user'
import { Button } from 'react-bootstrap'
import Modal from 'components/Modal'
import LoginFormInput from './LoginFormInput'
import validator from './LoginFormValidator'
import styles from './style.scss'
const fields = ['fullName', 'dateOfBirth', 'university', 'email', 'code']

const mapStateToProps = (state) => ({
  ...state.user,
  currentState: state
})

export class LoginForm extends React.Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    submitting: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    modal: PropTypes.object,
    isSaving: PropTypes.bool.isRequired,
    currentState: PropTypes.object.isRequired,
    // Actions
    handleSubmit: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    closeReminderModal: PropTypes.func.isRequired
  }

  render () {
    const {
      fields: {fullName, dateOfBirth, university, email, code},
      handleSubmit,
      submitting,
      pristine,
      isSaving,
      invalid,
      modal
    } = this.props

    let component

    // Format modal
    if (modal) {
      let closeFunction
      if (modal.type === 'error') closeFunction = this.props.closeModal
      else if (modal.type === 'reminder') closeFunction = this.props.closeReminderModal

      if (closeFunction) {
        component = (
          <Modal
            show
            close={closeFunction}
            {...modal}
          />
        )
      }
    }

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
            {(submitting || isSaving)
              ? <span><i className='fa fa-circle-o-notch fa-spin'></i> Submiting...</span>
              : 'Submit'
            }
          </Button>
        </form>
        <p>Pristine: {pristine ? 'true' : 'false'}</p>
        <p>Invalid: {invalid ? 'true' : 'false'}</p>
        <p>Submit: {submitting ? 'true' : 'false'}</p>
        <p>isSaving: {isSaving ? 'true' : 'false'}</p>
        <textarea className={styles.textarea} readOnly value={JSON.stringify(this.props.currentState)}></textarea>
      {component}
      </div>
    )
  }
}

LoginForm = reduxForm({
  form: 'login',
  fields,
  validate: validator
})(LoginForm)

export default connect(mapStateToProps, userActions)(LoginForm)
