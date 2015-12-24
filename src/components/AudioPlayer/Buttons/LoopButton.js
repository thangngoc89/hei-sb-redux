import React, { PropTypes } from 'react'
import classnames from 'classnames'

const LoopButton = (props) => {
  let iconClass = classnames({
    'player-btn loop': true,
    'active': props.loop
  })

  return (
    <button
      className={iconClass}
      title='Repeat'
      onClick={props.onClick}
    >
      <i className='fa fa-repeat'></i>
    </button>
  )
}

LoopButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  loop: PropTypes.bool.isRequired,
  show: PropTypes.bool.isRequired
}

export default LoopButton
