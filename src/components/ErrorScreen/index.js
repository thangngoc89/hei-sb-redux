import React, { PropTypes } from 'react'

const ErrorScreen = ({ message }) => {
  return (
    <em>{message}</em>
  )
}

ErrorScreen.propTypes = {
  message: PropTypes.string.isRequired
}

export default ErrorScreen
