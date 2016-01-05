import * as quiz from 'redux/modules/quiz'
import { initialState as userInitialState } from 'redux/modules/user'
import { actionPlayerReset } from 'redux/modules/player'
import { timerReset } from 'redux/modules/timer'
import data from 'redux/data/quiz'
import createAction from 'redux-actions'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const initialState = {
  user: userInitialState,
  quiz: quiz.InitialState
}

describe('(redux) quiz --> async actions', () => {
  // let server
  // beforeEach(() => {
  //   server = sinon.fakeServer.create()
  // })
  // afterEach(() => {
  //   server.restore()
  // })
  // it('creates QUIZ_FETCH_SUCCESS when fetching quiz has been done', (done) => {
  //
  //   server.respondWith('POST', 'https://api.parse.com/1/functions/wordList', (xhr) => {
  //     xhr.respond(200, { "Content-Type": "application/json" },'{}')
  //   })
  //
  //   const expectedActions = [
  //     quiz.fetchStart(),
  //     quiz.fetchSuccess(data)
  //   ]
  //
  //   const store = mockStore(initialState, expectedActions, done)
  //   store.dispatch(quiz.fetchQuizData())
  // })
  it('creates QUIZ_FETCH_SUCCESS when fetching quiz has been done')
  it('creates QUIZ_FETCH_FAILED when fetching quiz has been failed')

  it('should reset quiz, player, timer when dispatch hardReset', (done) => {
    const expectedActions = [
      quiz.actionQuizReset(),
      actionPlayerReset(),
      timerReset()
    ]
    const store = mockStore(initialState, expectedActions, done)
    store.dispatch(quiz.hardReset())
  })
})
