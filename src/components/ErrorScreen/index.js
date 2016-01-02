import { PropTypes } from 'react'
import Button from 'react-toolbox/lib/button'

const ErrorScreen = ({ message, title, action }) => {
  return (
    <div>
      <h3>Error: {title}</h3>
      <hr />
      <strong>{message}</strong>
      {action &&
        <div className='row'>
          <div className='col-xs-12 pull-xs-right'>
            <div className='pull-xs-right'>
              <Button
                primary
                accent
                label='Retry'
                onClick={action}
              />
            </div>
          </div>
        </div>
      }
    </div>
  )
}

ErrorScreen.propTypes = {
  message: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
  action: PropTypes.func
}

export default ErrorScreen
