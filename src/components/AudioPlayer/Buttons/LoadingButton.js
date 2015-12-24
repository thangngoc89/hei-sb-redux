import React, { PropTypes } from 'react'
import classnames from 'classnames'

const LoadingButton = (props) => {
  let iconClass = classnames({
    'fa fa-circle-o-notch fa-spin': props.isLoading,
    'hide': !props.show
  })

  return (
    <button
      className='player-btn'
      title='Loading'
    >
      <i className={iconClass}></i>
    </button>
  )
}

LoadingButton.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  show: PropTypes.bool.isRequired
}

export default LoadingButton
