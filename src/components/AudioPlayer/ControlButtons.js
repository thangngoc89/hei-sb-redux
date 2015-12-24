import React, { PropTypes } from 'react'
import classnames from 'classnames'
import PlayButton from './Buttons/PlayButton'
import MuteButton from './Buttons/MuteButton'
import LoopButton from './Buttons/LoopButton'
import LoadingButton from './Buttons/LoadingButton'

const ControlButtons = (props) => {
  return (
    <div className='player-control-wrapper'>
      <div className='player-buttons'>
        <LoadingButton
          show={props.isLoading}
          isLoading={props.isLoading}
        />
        <PlayButton
          show={!props.isLoading}
          isPlaying={props.isPlaying}
          onClick={props.playButtonAction}
        />
        <MuteButton
          show
          mute={props.mute}
          onClick={props.muteButtonAction}
        />
        <LoopButton
          show
          loop={props.loop}
          onClick={props.loopButtonAction}
        />
      </div>
    </div>
  )
}

export default ControlButtons
