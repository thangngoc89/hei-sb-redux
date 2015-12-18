import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import { Input } from 'react-bootstrap'
import styles from './style.scss'

class LoginFormInput extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    displayName: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
  }

  render () {
    let type = this.props.type || 'text'
    let classNames = [
      styles.input,
      styles['icon'],
      styles['icon-' + this.props.icon]
    ].join(' ')

    return (
      <Input
        type={type}
        placeholder={this.props.displayName}
        className={classNames}
        group-class='error'
        {...this.props}
      />
    )
  }
}

LoginFormInput = CSSModules(LoginFormInput, styles)

export default LoginFormInput
