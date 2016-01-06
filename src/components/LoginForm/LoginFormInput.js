import { PropTypes } from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function'
import Input from 'react-toolbox/lib/input'

class LoginFormInput extends React.Component {
  // componentWillReceiveProps (nextProps) {
  //   if (nextProps.focus) {
  //
  //   }
  // }
  shouldComponentUpdate = shouldPureComponentUpdate

  focus () {
    this.input.focus()
  }

  render () {
    const type = this.props.type || 'text'
    let object = this.props.object
    if (!object.touched) object.error = null

    return (
      <Input
        type={type}
        label={this.props.displayName}
        icon={this.props.icon}
        ref={(ref) => this.input = ref}
        {...object}
      />
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
