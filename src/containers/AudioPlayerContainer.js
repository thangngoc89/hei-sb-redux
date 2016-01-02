import { connect } from 'react-redux'
import { actions as playerActions } from 'redux/modules/player'
import AudioPlayer from 'components/AudioPlayer'

const mapStateToProps = (state) => ({
  autoplay: state.player.get('autoplay'),
  mute: state.player.get('mute'),
  loop: state.player.get('loop'),
  seek: state.player.get('seek'),
  buttons: state.player.get('buttons').toJS(),
  // state
  isPlaying: state.player.get('isPlaying'),
  isLoading: state.player.get('isLoading'),
  canUserToggleAudio: state.player.get('canUserToggleAudio')
})

class WordAudioPlayerContainer extends React.Component {
  render () {
    return (
      <AudioPlayer
        {...this.props}
      />
    )
  }
}

export default connect(mapStateToProps, playerActions)(WordAudioPlayerContainer)
