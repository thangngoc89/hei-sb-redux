import React from 'react'

const WordNavigator = ({ current, total }) => {
  return (
    <strong>Question {current+1} of {total}</strong>
  )
}

WordNavigator.propTypes = {
  current: React.PropTypes.number.isRequired,
  total: React.PropTypes.number.isRequired,
}

export default WordNavigator
