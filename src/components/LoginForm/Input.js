import { PropTypes } from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function'
import Input from 'react-toolbox/lib/input'

class InputWrapper extends React.Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  focus () {
    this.input.focus()
  }

  render () {
    let { touched, error, ...others } = this.props
    if (!touched) error = null

    return (
      <Input
        ref={(ref) => this.input = ref}
        error={error}
        {...others}
      />
    )
  }
}

InputWrapper.defaultProps = {
  type: 'text'
}

InputWrapper.propTypes = {
  touched: PropTypes.bool,
  error: PropTypes.string
}

export default InputWrapper
