import { PropTypes } from 'react'

const ErrorScreen = ({ message, title }) => {
  return (
    <div>
      <h1>Error: {title}</h1>
      {message}
    </div>
  )
}

ErrorScreen.propTypes = {
  message: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired
}

export default ErrorScreen
