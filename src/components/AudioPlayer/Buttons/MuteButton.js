import { PropTypes } from 'react'
import classnames from 'classnames'

const MuteButton = (props) => {
  let iconClass = classnames({
    'fa': true,
    'fa-volume-up': !props.mute,
    'fa-volume-off': props.mute
  })

  return (
    <button
      className='player-btn'
      title='Mute/Unmute'
      onClick={props.onClick}
    >
      <i className={iconClass}></i>
    </button>
  )
}

MuteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  mute: PropTypes.bool.isRequired
}

export default MuteButton
