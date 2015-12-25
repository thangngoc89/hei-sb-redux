import { createHashHistory, useBeforeUnload } from 'history'
import store from '../redux/store'

const confirm = () => {
  const {
    quiz: { isComplete, isStarted },
    complete: { isSuccess, retry },
    router: { path }
  } = store.getState()

  if (path === '/quiz' && !isComplete && isStarted) {
    return 'You are doing the exam. You CAN NOT do it again once you leave.'
  }

  if (path === '/complete' && !isSuccess && retry > 0) {
    return `Your answers haven't been sent to us yet. If you leave, ALL OF YOUR ANSWERS will be lost`
  }
}

let history = useBeforeUnload(createHashHistory)()
// TODO: Prevent listenBefore to be called twice
history.listenBefore(confirm)
history.listenBeforeUnload(confirm)

export default history
