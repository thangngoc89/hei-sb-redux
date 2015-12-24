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
        {show.LoadingButton &&
          <LoadingButton isLoading={props.isLoading} />
        }
        {show.PlayButton &&
          <PlayButton
            isPlaying={props.isPlaying}
            onClick={props.playButtonAction}
          />
        }
        {show.MuteButton &&
          <MuteButton
            mute={props.mute}
            onClick={props.muteButtonAction}
          />
        }
        {show.LoopButton &&
          <LoopButton
            loop={props.loop}
            onClick={props.loopButtonAction}
          />
        }
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
