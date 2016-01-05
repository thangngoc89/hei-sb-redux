import * as player from 'redux/modules/player'

describe('(redux) player --> actions', () => {
  it('should create an action to dispatch play action', () => {
    expect(player.actionPlay()).to.deep.equal({
      type: player.PLAYER_ACTION_PLAY,
      payload: undefined
    })
  })

  it('should create an action to dispatch toggle action', () => {
    expect(player.actionToggle()).to.deep.equal({
      type: player.PLAYER_ACTION_TOGGLE,
      payload: undefined
    })
  })

  it('should create an action to dispatch volume change action', () => {
    const vol = 0.5
    expect(player.actionVolume(vol)).to.deep.equal({
      type: player.PLAYER_ACTION_VOLUME,
      payload: vol
    })
  })

  it('should create an action to dispatch toggle mute action', () => {
    expect(player.actionToggleMute()).to.deep.equal({
      type: player.PLAYER_ACTION_TOGGLE_MUTE,
      payload: undefined
    })
  })

  it('should create an action to dispatch toggle loop action', () => {
    expect(player.actionToggleLoop()).to.deep.equal({
      type: player.PLAYER_ACTION_TOGGLE_LOOP,
      payload: undefined
    })
  })

  it('should create an action to enable play button', () => {
    expect(player.actionEnablePlayButton()).to.deep.equal({
      type: player.PLAYER_ACTION_ENABLE_PLAY_BUTTON,
      payload: undefined
    })
  })

  it('should create an action to disable play button', () => {
    expect(player.actionDisablePlayButton()).to.deep.equal({
      type: player.PLAYER_ACTION_DISABLE_PLAY_BUTTON,
      payload: undefined
    })
  })

  it('should create an action to reset player store', () => {
    expect(player.actionPlayerReset()).to.deep.equal({
      type: player.PLAYER_RESET,
      payload: undefined
    })
  })

  it('should create an action to handle on play event from howler', () => {
    expect(player.onPlay()).to.deep.equal({
      type: player.PLAYER_ON_PLAY,
      payload: undefined
    })
  })

  it('should create an action to handle on end event from howler', () => {
    expect(player.onEnd()).to.deep.equal({
      type: player.PLAYER_ON_END,
      payload: undefined
    })
  })

  it('should create an action to handle on load event from howler', () => {
    expect(player.onLoad()).to.deep.equal({
      type: player.PLAYER_ON_LOAD,
      payload: undefined
    })
  })

  it('should create an action to handle on load error event from howler', () => {
    expect(player.onLoadError()).to.deep.equal({
      type: player.PLAYER_ON_LOAD_ERROR,
      payload: undefined
    })
  })
})
