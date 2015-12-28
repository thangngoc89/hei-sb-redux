import shouldPureComponentUpdate from 'react-pure-render/function'

class WordNavigator extends React.Component {
  shouldComponentUpdate = shouldPureComponentUpdate

  render () {
    const { current, total } = this.props
    return (
      <strong>Question {current + 1} of {total}</strong>
    )
  }
}

WordNavigator.propTypes = {
  current: React.PropTypes.number.isRequired,
  total: React.PropTypes.number.isRequired
}

export default WordNavigator
