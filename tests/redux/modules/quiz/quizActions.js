import * as quiz from 'redux/modules/quiz'
import data from 'redux/data/quiz'
import createAction from 'redux-actions'

describe('(redux) quiz actions', () => {
  it('should create an action to request data', function () {
    expect(quiz.requestData()).to.deep.equal({
      type: quiz.QUIZ_REQUEST_DATA,
      payload: undefined
    })
  })

  it('should create an action to receive data', () => {
    const data = {foo: 'bar'}

    expect(quiz.receiveData(data)).to.deep.equal({
      type: quiz.QUIZ_RECEIVE_DATA,
      payload: data
    })
  })

  it('should create an action to handle request data error', () => {
    const data = {}

    expect(quiz.receiveDataError(data)).to.deep.equal({
      type: quiz.QUIZ_RECEIVE_DATA_ERROR,
      payload: data
    })
  })
})
