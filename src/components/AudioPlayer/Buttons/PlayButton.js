import React, { PropTypes } from 'react'
import classnames from 'classnames'

const PlayButton = (props) => {
  let iconClass = classnames({
    'fa': true,
    'fa-play': !props.isPlaying,
    'fa-pause': props.isPlaying,
    'hide': !props.show
  })

  return (
    <button
      onClick={props.onClick}
      className='player-btn'
      title='Play/Pause'
    >
      <i className={iconClass}></i>
    </button>
  )
}

PlayButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  show: PropTypes.bool.isRequired
}

export default PlayButton
