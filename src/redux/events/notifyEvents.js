import * as complete from 'redux/modules/complete'
import * as user from 'redux/modules/user'
import * as quiz from 'redux/modules/quiz'

const notifyEvents = [
  {
    catch: [complete.SEND_FAILED],
    dispatch: complete.showRetryModal
  },
  { catch: [complete.SEND_SUCCESS],
    dispatch: complete.showScoreModal
  },
  {
    catch: [user.USER_SAVE_FAILED],
    dispatch: user.showSaveFailedAlert
  },
  {
    catch: [user.USER_SAVE_SUCCESS],
    dispatch: user.showReminderModal
  },
  {
    catch: [quiz.QUIZ_TIMEOUT],
    dispatch: quiz.showTimeoutModal
  }
]

export default notifyEvents
