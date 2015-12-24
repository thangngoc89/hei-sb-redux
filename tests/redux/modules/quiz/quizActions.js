import * as quiz from 'redux/modules/quiz'
import data from 'redux/data/quiz'
import createAction from 'redux-actions'

describe('(redux) quiz actions', () => {
  it('should create an action to request data', function () {
    expect(quiz.fetchStart()).to.deep.equal({
      type: quiz.QUIZ_FETCH_START,
      payload: undefined
    })
  })

  it('should create an action to receive data', () => {
    const data = {foo: 'bar'}

    expect(quiz.fetchSuccess(data)).to.deep.equal({
      type: quiz.QUIZ_FETCH_SUCCESS,
      payload: data
    })
  })

  it('should create an action to handle request data error', () => {
    const data = {}

    expect(quiz.fetchError(data)).to.deep.equal({
      type: quiz.QUIZ_FETCH_ERROR,
      payload: data
    })
  })
})
