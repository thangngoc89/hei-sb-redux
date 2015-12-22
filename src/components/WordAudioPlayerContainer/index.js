import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions as playerActions } from 'redux/modules/player'
import AudioPlayer from 'components/AudioPlayer'

const mapStateToProps = (state) => ({
  ...state.player
})

class WordAudioPlayerContainer extends Component {
  static propTypes = {
    onPlayWithTimer: PropTypes.func.isRequired
  }

  render () {
    let props = {
      ...this.props,
      onPlay: this.props.onPlayWithTimer // TODO: Fix me, silly name
    }

    return (
      <AudioPlayer
        {...props}
      />
    )
  }
}

export default connect(mapStateToProps, playerActions)(WordAudioPlayerContainer)
