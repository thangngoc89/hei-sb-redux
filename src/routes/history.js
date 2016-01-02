import createBrowserHistory from 'history/lib/createBrowserHistory'
import useBeforeUnload from 'history/lib/useBeforeUnload'
import store from '../redux/store'

const confirm = () => {
  const {
    router: { path }
  } = store.getState()

  const isComplete = store.getState().quiz.get('isComplete')
  const isStarted = store.getState().quiz.get('isStarted')
  const isSuccess = store.getState().complete.get('isSuccess')
  const retry = store.getState().complete.get('retry')

  if (path === '/quiz' && !isComplete && isStarted) {
    return 'You are doing the exam. You CAN NOT do it again once you leave.'
  }

  if (path === '/complete' && !isSuccess && retry > 0) {
    return `Your answers haven't been sent to us yet. If you leave, ALL OF YOUR ANSWERS will be lost`
  }
}

let history = useBeforeUnload(createBrowserHistory)()
// TODO: Prevent listenBefore to be called twice
history.listenBefore(confirm)
history.listenBeforeUnload(confirm)

export default history
