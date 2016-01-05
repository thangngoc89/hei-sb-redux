import * as player from 'redux/modules/player'
import * as timer from 'redux/modules/timer'
import * as quiz from 'redux/modules/quiz'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('(redux) player --> async actions', () => {
  it('should start timer when playback started', (done) => {
    const initialState = {
      player: player.initialState,
      timer: timer.initialState.set('ticking', false),
      quiz: quiz.initialState
    }

    const secondsPerWord = quiz.initialState.get('secondsPerWord')
    const expectedActions = [
      player.onPlay(),
      timer.timerStart(secondsPerWord)
    ]

    const store = mockStore(initialState, expectedActions, done)
    store.dispatch(player.onPlayWithTimer())

  })

  // Current mock store cannot catch if we dispatched an unexpected action
  it('should NOT start timer when playback started and timer is ticking')

  it('Should increment audio played times when playback ended', (done) => {
    const initialState = {
      player: player.initialState,
      quiz: quiz.initialState
    }

    const expectedActions = [
      player.onEnd(),
      quiz.incrementAudioPlayedTimes()
    ]

    const store = mockStore(initialState, expectedActions, done)
    store.dispatch(player.onEndWithQuiz())
  })

  it('Should disable audio play button when exceed maximum play times when playback ended', (done) => {
    const initialState = {
      player: player.initialState,
      quiz: quiz.initialState.set('audioPlayedTimes', 2)
    }

    const expectedActions = [
      player.onEnd(),
      quiz.incrementAudioPlayedTimes(),
      player.actionDisablePlayButton()
    ]

    const store = mockStore(initialState, expectedActions, done)
    store.dispatch(player.onEndWithQuiz())
  })
})
