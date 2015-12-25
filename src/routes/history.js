import { createHashHistory, useBeforeUnload } from 'history'
import store from '../redux/store'

const confirm = () => {
  // Have to use store.getState() here
  // cannot assign it for any var
  if (!store.getState().quiz.isComplete &&
      store.getState().quiz.isStarted
    ) {
    return 'You are doing the exam. You CAN NOT do it again once you leave.'
  }
}

let history = useBeforeUnload(createHashHistory)()
// TODO: Prevent listenBefore to be called twice
history.listenBefore(confirm)
history.listenBeforeUnload(confirm)

export default history
