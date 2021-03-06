import { PropTypes } from 'react'
import classnames from 'classnames'

const PlayButton = (props) => {
  let iconClass = classnames({
    'fa': true,
    'fa-play': !props.isPlaying,
    'fa-pause': props.isPlaying
  })

  return (
    <button
      onClick={props.onClick}
      className='player-btn'
      title='Play/Pause'
      disabled={props.disabled}
    >
      <i className={iconClass}></i>
    </button>
  )
}

PlayButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired
}

export default PlayButton
