import React, { Component, PropTypes } from 'react'
import AudioPlayer from 'components/AudioPlayer'

class WordAudioPlayerContainer extends Component {
  static propTypes = {
    song: PropTypes.string.isRequired,
    autoplay: PropTypes.bool.isRequired,
    shouldComponentUpdate: PropTypes.bool.isRequired
  }

  shouldComponentUpdate (nextProps) {
    return nextProps.shouldComponentUpdate
  }

  render () {
    return (
      <AudioPlayer ref={(node) => this.audio = node} {...this.props} />
    )
  }
}

export default WordAudioPlayerContainer
