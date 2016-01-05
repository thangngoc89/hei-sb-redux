import * as quiz from 'redux/modules/quiz'
import { initialState as userInitialState } from 'redux/modules/user'
import * as player from 'redux/modules/player'
import * as timer from 'redux/modules/timer'
import data from 'redux/data/quiz'
import createAction from 'redux-actions'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const initialState = {
  user: userInitialState,
  quiz: quiz.InitialState
}

describe('(redux) quiz --> async actions', () => {
  it('creates QUIZ_FETCH_SUCCESS when fetching quiz has been done')
  it('creates QUIZ_FETCH_FAILED when fetching quiz has been failed')

  it('should reset quiz, player, timer when dispatch hardReset', (done) => {
    const expectedActions = [
      quiz.actionQuizReset(),
      player.actionPlayerReset(),
      timer.timerReset()
    ]
    const store = mockStore(initialState, expectedActions, done)
    store.dispatch(quiz.hardReset())
  })

  it('should reset audio played times, show loading indicator, re-enable playbutton and reser timer on next word action', (done) => {
    const initialState = {
      player: player.initialState,
      timer: timer.initialState,
      quiz: quiz.initialState
    }

    const expectedActions = [
      quiz.resetAudioPlayedTimes(),
      player.onLoad(),
      player.actionEnablePlayButton(),
      timer.timerReset(),
      quiz.nextWord()
    ]

    const store = mockStore(initialState, expectedActions, done)
    store.dispatch(quiz.actionNextWordWithTimer())
  })

  // mock history, redux-simple-router here
  it('should redirect to complete page on complete')
})
