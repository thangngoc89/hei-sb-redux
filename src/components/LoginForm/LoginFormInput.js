import React, { PropTypes } from 'react'
import classnames from 'classnames'
import { Input } from 'react-bootstrap'
import styles from './style.scss'
import shouldPureComponentUpdate from 'react-pure-render/function'

class LoginFormInput extends React.Component {
  shouldComponentUpdate = shouldPureComponentUpdate

  render () {
    let type = this.props.type || 'text'
    let object = this.props.object

    let inputClass = classnames({
      [styles.input]: true,
      [styles.icon]: true,
      [styles['icon-' + this.props.icon]]: true
    })
    let groupClassName = classnames({
      [styles.group]: true,
      'has-danger': object.touched && object.error,
      'has-success': object.touched && !object.error
    })
    let helpBlockClass = classnames({
      'text-danger': object.touched && object.error
    })

    let help = (object.touched && object.error && typeof object.error === 'string') ? object.error : ''

    return (
      <div className={styles.inputDiv}>
        <Input
          type={type}
          placeholder={this.props.displayName}
          className={inputClass}
          groupClassName={groupClassName}
          hasFeedback
          {...this.props.object}
        />
        <span className={helpBlockClass}>{help}</span>
      </div>
    )
  }
}

LoginFormInput.propTypes = {
  type: PropTypes.string,
  displayName: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  object: PropTypes.object
}

export default LoginFormInput
