import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { bindActionCreators } from 'redux'
import ControlButtons from 'components/AudioPlayer/ControlButtons'
import PlayButton from 'components/AudioPlayer/Buttons/PlayButton'
import MuteButton from 'components/AudioPlayer/Buttons/MuteButton'
import LoopButton from 'components/AudioPlayer/Buttons/LoopButton'
import LoadingButton from 'components/AudioPlayer/Buttons/LoadingButton'
import $ from 'teaspoon'

function shallowRender (component) {
  const renderer = TestUtils.createRenderer()

  renderer.render(component)
  return renderer.getRenderOutput()
}

function renderWithProps (props = {}) {
  return $(<ControlButtons {...props} />).render()
}

function shallowRenderWithProps (props = {}) {
  return shallowRender(<ControlButtons {...props} />)
}

describe('(Component) AudioPlayer -> ControlButtons', function () {
  let _component, $root, _props, _spies

  beforeEach(function () {
    _spies = {}
    _props = {
      buttons: {
        'LoadingButton': true,
        'PlayButton': true,
        'MuteButton': true,
        'LoopButton': false
      },
      isLoading: true,
      isPlaying: true,
      mute: true,
      loop: true,
      canUserToggleAudio: true,
      ...bindActionCreators({
        playButtonAction: (_spies.playButtonAction = sinon.spy()),
        loopButtonAction: (_spies.loopButtonAction = sinon.spy()),
        muteButtonAction: (_spies.muteButtonAction = sinon.spy())
      }, _spies.dispatch = sinon.spy())
    }

    _component = shallowRenderWithProps(_props)
    $root = renderWithProps(_props)
  })

  it('Should render as a <div>.', function () {
    expect(_component.type).to.equal('div')
  })

  it('Should be rendered', function () {
    expect($root).to.be.ok
  })

  it('Should render as a <div> with class `player-control-wrapper`.', function () {
    const div = $root.find('div.player-control-wrapper').length
    expect(div).to.equal(1)
  })

  it('Should have a <div> with class `player-buttons`.', function () {
    const div = $root.find('div.player-buttons').length
    expect(div).to.equal(1)
  })

  it('Should render the given buttons when specify all buttons visibility', function () {
    $root = renderWithProps({
      ..._props,
      buttons: {
        'LoadingButton': true,
        'PlayButton': true,
        'MuteButton': true,
        'LoopButton': false
      }
    })

    const $loading = $root.find(LoadingButton).length
    expect($loading).to.equal(1)

    const $play = $root.find(PlayButton).length
    expect($play).to.equal(1)

    const $loop = $root.find(LoopButton).length
    expect($loop).to.equal(0)

    const $mute = $root.find(MuteButton).length
    expect($mute).to.equal(1)
  })

  it('Should render play buttons when non buttons given', function () {
    $root = renderWithProps({
      ..._props,
      buttons: undefined
    })

    const $play = $root.find(PlayButton).length
    expect($play).to.equal(1)
  })

  describe('Play button', () => {
    let $root
    beforeEach(() => {
      _props = {
        ..._props,
        buttons: {
          PlayButton: true
        }
      }

      $root = renderWithProps({
        ..._props
      })
    })

    it('Should have a title', () => {
      const $btn = $root.find(PlayButton).find('button[title="Play/Pause"]')
      expect($btn.length).to.equal(1)
    })

    it('Should be disabled when canUserToggleAudio=true',  () => {
      $root = renderWithProps({
        ..._props,
        canUserToggleAudio: false
      })
      const $play = $root.find(PlayButton)
      expect($play.length).to.equal(1)

      const $btn = $play.find('button[disabled]')
      expect($btn.length).to.equal(1)
    })

    it('Should show play icon when isPlaying=false', () => {
      $root = renderWithProps({
        ..._props,
        isPlaying: false
      })

      const $play = $root.find(PlayButton)
      expect($play.length).to.equal(1)

      const $btn = $play.find('button > i.fa-play')
      expect($btn.length).to.equal(1)
    })

    it('Should show pause icon when isPlaying=true', () => {
      $root = renderWithProps({
        ..._props,
        isPlaying: true
      })

      const $play = $root.find(PlayButton)
      expect($play.length).to.equal(1)

      const $btn = $play.find('button > i.fa-pause')
      expect($btn.length).to.equal(1)
    })

    it('Should dispatch an action when clicked', () => {
      const $btn = $root.find(PlayButton).find('button')
      expect($btn.length).to.equal(1)

      _spies.playButtonAction.should.have.not.been.called
      $btn.trigger('click')
      _spies.playButtonAction.should.have.been.called
    })
  })

  describe('Mute button', () => {
    let $root
    beforeEach(() => {
      _props = {
        ..._props,
        buttons: {
          MuteButton: true
        }
      }

      $root = renderWithProps({
        ..._props
      })
    })

    it('Should have a title', () => {
      const $btn = $root.find(MuteButton).find('button[title="Mute/Unmute"]')
      expect($btn.length).to.equal(1)
    })

    it('Should have volume up icon when mute=false', () => {
      $root = renderWithProps({
        ..._props,
        mute: false
      })

      const $btn = $root.find(MuteButton).find('button > i.fa-volume-up')
      expect($btn.length).to.equal(1)
    })

    it('Should have volume off icon when mute=true', () => {
      $root = renderWithProps({
        ..._props,
        mute: true
      })

      const $btn = $root.find(MuteButton).find('button > i.fa-volume-off')
      expect($btn.length).to.equal(1)
    })

    it('Should dispatch an action when clicked', () => {
      const $btn = $root.find(MuteButton).find('button')

      _spies.muteButtonAction.should.have.not.been.called
      $btn.trigger('click')
      _spies.muteButtonAction.should.have.been.called
    })
  })

  describe('Loop button', () => {
    let $root

    beforeEach(() => {
      _props = {
        ..._props,
        buttons: {
          LoopButton: true
        }
      }

      $root = renderWithProps({
        ..._props
      })
    })

    it('Should have a title', () => {
      const $btn = $root.find(LoopButton).find('button[title="Repeat"]')
      expect($btn.length).to.equal(1)
    })

    it('Should have repeat icon', () => {
      const $btn = $root.find(LoopButton).find('button > i.fa-repeat')
      expect($btn.length).to.equal(1)
    })

    it('Should have proper className', () => {
      const $btn = $root.find(LoopButton).find('button.player-btn')
      expect($btn.length).to.equal(1)

      const $btn2 = $root.find(LoopButton).find('button.loop')
      expect($btn.length).to.equal(1)
    })

    it('Should have have active class when loop=true', () => {
      $root = renderWithProps({
        ..._props,
        loop: true
      })

      const $btn = $root.find(LoopButton).find('button.active')
      expect($btn.length).to.equal(1)
    })

    it('Should not have have active class loop=false', () => {
      $root = renderWithProps({
        ..._props,
        loop: false
      })

      const $btn = $root.find(LoopButton).find('button.active')
      expect($btn.length).to.equal(0)
    })

    it('Should dispatch an action when clicked', () => {
      const $btn = $root.find(LoopButton).find('button')

      _spies.loopButtonAction.should.have.not.been.called
      $btn.trigger('click')
      _spies.loopButtonAction.should.have.been.called
    })
  })

  describe('Loading button', () => {
    let $root

    beforeEach(() => {
      _props = {
        ..._props,
        buttons: {
          LoadingButton: true
        }
      }

      $root = renderWithProps({
        ..._props
      })
    })

    it('Should exits', () => {
      const $btn = $root.find(LoadingButton)
      expect($btn.length).to.equal(1)
    })

    it('Should have a title', () => {
      const $btn = $root.find(LoadingButton).find('button[title="Loading"]')
      expect($btn.length).to.equal(1)
    })

    it('Should have proper className', () => {
      const $btn = $root.find(LoadingButton).find('button')
      expect($btn.length).to.equal(1)

      const $i = $btn.find('i[class="fa-circle-o-notch"][class="fa-spin"]')
      expect($btn.length).to.equal(1)
    })

    it('Should NOT dispatch an action when clicked', () => {
      const $btn = $root.find(LoadingButton).find('button')

      _spies.dispatch.should.have.not.been.called
      $btn.trigger('click')
      _spies.dispatch.should.have.not.been.called
    })
  })
})
