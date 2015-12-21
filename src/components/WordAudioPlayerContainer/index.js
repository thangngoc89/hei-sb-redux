import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions as playerActions } from 'redux/modules/player'
import AudioPlayer from 'components/AudioPlayer'

const mapStateToProps = (state) => ({
  ...state.player
})

class WordAudioPlayerContainer extends Component {

  // shouldComponentUpdate (nextProps) {
  //   return nextProps.shouldComponentUpdate
  // }

  render () {
    return (
      <AudioPlayer
        {...this.props}
      />
    )
  }
}

export default connect(mapStateToProps, playerActions)(WordAudioPlayerContainer)
