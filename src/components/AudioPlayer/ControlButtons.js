import React, { PropTypes } from 'react'
import PlayButton from './Buttons/PlayButton'
import MuteButton from './Buttons/MuteButton'
import LoopButton from './Buttons/LoopButton'
import LoadingButton from './Buttons/LoadingButton'

const ControlButtons = (props) => {
  let show = props.buttons

  return (
    <div className='player-control-wrapper'>
      <div className='player-buttons'>
        <LoadingButton
          show={show.LoadingButton}
          isLoading={props.isLoading}
        />
        <PlayButton
          show={show.PlayButton}
          isPlaying={props.isPlaying}
          onClick={props.playButtonAction}
        />
        <MuteButton
          show={show.MuteButton}
          mute={props.mute}
          onClick={props.muteButtonAction}
        />
        <LoopButton
          show={show.LoopButton}
          loop={props.loop}
          onClick={props.loopButtonAction}
        />
      </div>
    </div>
  )
}

ControlButtons.propTypes = {
  buttons: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  mute: PropTypes.bool.isRequired,
  loop: PropTypes.bool.isRequired,
  playButtonAction: PropTypes.func.isRequired,
  loopButtonAction: PropTypes.func.isRequired,
  muteButtonAction: PropTypes.func.isRequired
}

export default ControlButtons
