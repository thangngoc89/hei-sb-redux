// import React from 'react'
// import TestUtils from 'react-addons-test-utils'
// import { bindActionCreators } from 'redux'
// import AudioPlayer from 'components/AudioPlayer'
// import $ from 'teaspoon'
//
// function renderWithProps (props = {}) {
//   return $(<AudioPlayer {...props} />).render()
// }
//
// describe('(Component) AudioPlayer', function () {
//   let $root, _props, _spies, $btn
//
//   beforeEach(() => {
//     _spies = {}
//     _props = {
//       song: '/sounds/accuse.mp3',
//       autoplay: true,
//       mute: true, // I have that sound
//       loop: false,
//       seek: 0,
//       buttons: {
//         'LoadingButton': true,
//         'PlayButton': true,
//         'MuteButton': true,
//         'LoopButton': true
//       },
//       isPlaying: false,
//       isLoading: true,
//       canUserToggleAudio: true,
//       ...bindActionCreators({
//         actionToggle: (_spies.actionToggle = sinon.spy()),
//         actionToggleMute: (_spies.actionToggleMute = sinon.spy()),
//         actionToggleLoop: (_spies.actionToggleLoop = sinon.spy()),
//         actionUpdateSeek: (_spies.actionUpdateSeek = sinon.spy()),
//         onPlay: (_spies.onPlay = sinon.spy()),
//         onEnd: (_spies.onEnd = sinon.spy()),
//         onLoad: (_spies.onLoad = sinon.spy()),
//         onLoadError: (_spies.onLoadError = sinon.spy())
//       }, _spies.dispatch = sinon.spy())
//     }
//     $root = renderWithProps(_props)
//   })
//
//   afterEach(() => {
//     $root.unmount()
//   })
//
//   it('Should be rendered', function () {
//     expect($root).to.be.ok
//   })
//
//   it('Should render as an div', function () {
//     $(<AudioPlayer {..._props} />).shallowRender().is('div')
//   })
//
//   it('Should trigger action when click on Play/Pause button',  () => {
//     $btn = $root.find('button.player-btn[title="Play/Pause"]')
//     expect($btn.length).to.equal(1)
//
//     _spies.actionToggle.should.have.not.been.called
//     $btn.trigger('click')
//     _spies.actionToggle.should.have.been.called
//   })
//
//   it('Should trigger action when click on Mute/Unmute button', () => {
//     $btn = $root.find('button.player-btn[title="Mute/Unmute"]')
//     expect($btn.length).to.equal(1)
//
//     _spies.actionToggleMute.should.have.not.been.called
//     $btn.trigger('click')
//     _spies.actionToggleMute.should.have.been.called
//   })
//
//   it('Should trigger action when click on Loop button', () => {
//     $btn = $root.find('button.player-btn[title="Repeat"]')
//     expect($btn.length).to.equal(1)
//
//     _spies.actionToggleLoop.should.have.not.been.called
//     $btn.trigger('click')
//     _spies.actionToggleLoop.should.have.been.called
//   })
//
//   it('Should update seek bar after called play', () => {
//     $root = renderWithProps({
//       ..._props,
//       autoplay: false
//     })
//     _spies.actionUpdateSeek.should.have.not.been.called
//     $btn = $root.find('button.player-btn[title="Play/Pause"]')
//     $btn.trigger('click')
//     _spies.actionUpdateSeek.should.have.not.been.called
//   })
//   //
//   // it('Should autoplay')
//   // it('Should call onLoadError when provide a broken file')
//   // it('Should call onPlay')
//   // it('Should call onEnd')
// })
