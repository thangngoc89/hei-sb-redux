import { PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { actions as userActions } from 'redux/modules/user'
import { Button } from 'react-toolbox/lib/button'
import Input from './Input'
import validator from './LoginFormValidator'
import styles from './shake.scss'
import classnames from 'classnames'

const fields = ['fullName', 'dateOfBirth', 'university', 'email', 'code', 'phone']

const mapStateToProps = (state) => ({
  isSaving: state.user.get('isSaving')
})

export class LoginForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      shaking: false
    }
  };

  onButtonClick = () => {
    if (this.props.invalid) {
      this.setState({
        shaking: true
      })
      const errorField = Object.keys(this.props.errors)[0]

      setTimeout(() => {
        this.setState({
          shaking: false
        })
        this.refs[errorField].focus()
        ReactDOM.findDOMNode(this.refs[errorField]).scrollIntoView()
      }, 500)
    }
  };

  render () {
    const {
      fields: {fullName, dateOfBirth, university, email, code, phone},
      handleSubmit,
      isSaving
    } = this.props

    const divClass = classnames({
      [styles.shake]: this.state.shaking,
      [styles['shake-constant']]: this.state.shaking
    })

    return (
      <div className={divClass} style={{width: '100%'}}>
        <form onSubmit={handleSubmit(this.props.save)}>
          <Input label='Full name' icon='face' ref='fullName' {...fullName} />
          <Input label='Date of Birth' icon='cake' ref='dateOfBirth' {...dateOfBirth} />
          <Input label='University' icon='account_balance' ref='university' {...university} />
          <Input label='Email' icon='email' type='email' ref='email' {...email} />
          <Input label='Phone number' type='tel' icon='phone' ref='phone' {...phone} />
          <Input label='Code' icon='code' ref='code' {...code} />
          <Button
            raised
            primary
            disabled={isSaving}
            className='btn-block'
            onClick={this.onButtonClick}
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

LoginForm.propTypes = {
  fields: PropTypes.object.isRequired,
  invalid: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool.isRequired,
  // Actions
  handleSubmit: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  closeReminderModal: PropTypes.func.isRequired,
  errors: PropTypes.any
}

LoginForm = reduxForm({
  form: 'login',
  fields,
  validate: validator,
  touchOnChange: true
})(LoginForm)

export default connect(mapStateToProps, userActions)(LoginForm)
