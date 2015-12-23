import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { actions as userActions } from 'redux/modules/user'
import { Button } from 'react-bootstrap'
import Modal from 'components/Modal'
import LoginFormInput from './LoginFormInput'
import validator from './LoginFormValidator'
import styles from './style.scss'

const fields = ['fullName', 'dayOfBirth', 'university', 'email', 'code']

const mapStateToProps = (state) => ({
  ...state.user
})

export class LoginForm extends React.Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    submitting: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    modal: PropTypes.object,
    // Actions
    handleSubmit: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    closeReminderModal: PropTypes.func.isRequired
  }

  render () {
    const {
      fields: {fullName, dayOfBirth, university, email, code},
      handleSubmit,
      submitting,
      pristine,
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
          <LoginFormInput displayName='Day of Birth' icon='dayOfBirth' object={dayOfBirth} />
          <LoginFormInput displayName='University' icon='university' object={university} />
          <LoginFormInput displayName='Email' icon='email' type='email' object={email} />
          <LoginFormInput displayName='Code' icon='code' object={code} />
          <Button
            block
            onClick={handleSubmit(this.props.save)}
            className={styles['submit-button']}
            disabled={pristine || invalid || submitting}
          >
            {submitting ? 'Loading...' : 'Submit'}
          </Button>
        </form>
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
