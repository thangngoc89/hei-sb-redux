import * as quiz from 'redux/modules/quiz'
import createAction from 'redux-actions'
import { fromJS, Map, List } from 'immutable'

const reducer = quiz.default
const initialState = fromJS({
  secondsPerWord: 15,
  wordList: [],
  userAnswers: {},
  currentAnswer: '',
  error: false,
  currentWord: 0,
  isLoading: true,
  isStarted: false,
  isComplete: false,
  timeOut: false,
  audioPlayedTimes: 0
})

describe('(redux) quiz --> reducer', () => {
  it('should handle initial state', () => {
    expect(reducer(undefined, {})).to.deep.equal(initialState)
  })

  it('should set isLoading state when fetch start', () => {
    const action = quiz.fetchStart
    const expectedState = initialState.set('isLoading', true)

    expect(reducer(initialState, action)).to.deep.equal(expectedState)
  })

  it('should stop isLoading, set wordList, start quiz when fetch success', () => {
    const data = ['word1', 'word2']
    const action = quiz.fetchSuccess(data)
    const expectedState = initialState.merge({
      isLoading: false,
      isStarted: true,
      wordList: fromJS(data)
    })
    expect(reducer(initialState, action)).to.deep.equal(expectedState)
  })

  it('should stop isLoading, set error message when fetch failed', () => {
    const data = 'unexpected error'
    const action = quiz.fetchFailed(data)
    const expectedState = initialState.merge({
      isLoading: false,
      error: data
    })
    expect(reducer(initialState, action)).to.deep.equal(expectedState)
  })

  describe('handle next word', () => {
    let currentAnswer, wordList, action
    beforeEach(() => {
      currentAnswer = 'some_answer'
      action = quiz.nextWord()
      wordList = [
        {
          'id': 'some_id',
          'soundFile': 'some_url'
        },
        {
          'id': 'some_id2',
          'soundFile': 'some_url2'
        },
        {
          'id': 'some_id3',
          'soundFile': 'some_url3'
        }
      ]
    })

    it('should move to word 2 when done with word 1', () => {
      const currentState = initialState.merge({
        isComplete: false,
        currentAnswer,
        wordList: fromJS(wordList),
        currentWord: 0
      })

      const expectedState = initialState.merge({
        isComplete: false,
        userAnswers: fromJS({
          'some_id': currentAnswer
        }),
        currentAnswer: '',
        wordList: fromJS(wordList),
        currentWord: 1,
        timeOut: false
      })
      expect(reducer(currentState, action)).to.deep.equal(expectedState)
    })

    it('should move to word 3 when done with word 2', () => {
      const currentState = initialState.merge({
        isComplete: false,
        currentAnswer,
        userAnswers: fromJS({
          'some_id': 'some answer for word 1'
        }),
        wordList: fromJS(wordList),
        currentWord: 1,
        timeOut: false
      })

      const expectedState = initialState.merge({
        isComplete: false,
        userAnswers: fromJS({
          'some_id': 'some answer for word 1',
          'some_id2': currentAnswer
        }),
        currentAnswer: '',
        wordList: fromJS(wordList),
        currentWord: 2,
        timeOut: false
      })
      expect(reducer(currentState, action)).to.deep.equal(expectedState)
    })

    it('should set isComplete to true, currentWord to 0 when done last word', () => {
      const currentState = initialState.merge({
        isComplete: false,
        currentAnswer,
        userAnswers: fromJS({
          'some_id': 'some answer for word 1',
          'some_id2': 'some answer for word 2'
        }),
        wordList: fromJS(wordList),
        currentWord: 2, // Last element in array
        timeOut: false
      })

      const expectedState = initialState.merge({
        isComplete: true,
        userAnswers: fromJS({
          'some_id': 'some answer for word 1',
          'some_id2': 'some answer for word 2',
          'some_id3': currentAnswer
        }),
        currentAnswer: '',
        wordList: fromJS(wordList),
        currentWord: 0,
        timeOut: false
      })
      expect(reducer(currentState, action)).to.deep.equal(expectedState)
    })

    it('should sanitize current answer', () => {
      currentAnswer = '   some Answer  '
      const currentState = initialState.merge({
        isComplete: false,
        currentAnswer,
        wordList: fromJS(wordList),
        currentWord: 0
      })

      const expectedState = initialState.merge({
        isComplete: false,
        userAnswers: fromJS({
          'some_id': 'some answer'
        }),
        currentAnswer: '',
        wordList: fromJS(wordList),
        currentWord: 1,
        timeOut: false
      })
      expect(reducer(currentState, action)).to.deep.equal(expectedState)
    })
  })

  it('should handle answer input on change event', () => {
    const data = 'new answer'
    const expectedState = initialState.set('currentAnswer', data)
    const action = quiz.answerOnChange(data)
    expect(reducer(initialState, action)).to.deep.equal(expectedState)
  })

  it('should handle timeout event', () => {
    const expectedState = initialState.set('timeOut', true)
    const action = quiz.handleTimeout()
    expect(reducer(initialState, action)).to.deep.equal(expectedState)
  })

  it('should handle reset audio played times', () => {
    const currentState = initialState.set('audioPlayedTimes', 10)
    const expectedState = initialState.set('audioPlayedTimes', 0)
    const action = quiz.resetAudioPlayedTimes()
    expect(reducer(currentState, action)).to.deep.equal(expectedState)
  })

  it('should increment audio played times', () => {
    const currentState = initialState.set('audioPlayedTimes', 1)
    const expectedState = initialState.set('audioPlayedTimes', 2)
    const action = quiz.incrementAudioPlayedTimes()
    expect(reducer(currentState, action)).to.deep.equal(expectedState)
  })

  it('should return initialState when dispatch quizReset', () => {
    const currentState = initialState.merge({
      wordList: ['foo', 'bar'],
      userAnswers: {
        'foo': 'bar',
        'fuz': 'booz'
      },
      isLoading: false,
      isComplete: true,
      timeOut: true
    })
    const action = quiz.actionQuizReset()
    expect(reducer(currentState, action)).to.deep.equal(initialState)
  })
})
