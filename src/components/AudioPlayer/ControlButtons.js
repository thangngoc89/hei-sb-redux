import { PropTypes } from 'react'
import PlayButton from './Buttons/PlayButton'
import MuteButton from './Buttons/MuteButton'
import LoopButton from './Buttons/LoopButton'
import LoadingButton from './Buttons/LoadingButton'
import shouldPureComponentUpdate from 'react-pure-render/function'

class ControlButtons extends React.Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  render () {
    const props = this.props
    let show = props.buttons
    // Show PlayButton when none given
    if (show === undefined || show === null) {
      show = {
        PlayButton: true
      }
    }
    return (
      <div className='player-control-wrapper'>
        <div className='player-buttons'>
          {show.PlayButton &&
            <PlayButton
              isPlaying={props.isPlaying}
              onClick={props.playButtonAction}
              disabled={!props.canUserToggleAudio}
            />
          }
          {show.LoadingButton &&
            <LoadingButton isLoading={props.isLoading} />
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
}

ControlButtons.propTypes = {
  buttons: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  mute: PropTypes.bool.isRequired,
  loop: PropTypes.bool.isRequired,
  canUserToggleAudio: PropTypes.bool.isRequired,
  playButtonAction: PropTypes.func.isRequired,
  loopButtonAction: PropTypes.func.isRequired,
  muteButtonAction: PropTypes.func.isRequired
}

export default ControlButtons
