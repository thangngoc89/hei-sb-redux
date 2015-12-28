import { createValidator,
          isEmpty,
          required,
          email,
          minLength } from 'redux/utils/validation'
import moment from 'moment'
import memoize from 'lru-memoize'

const validDate = value => {
  if (!isEmpty(value)) {
    let date = moment(value, 'DD/MM/YYYY', true)
    if (!date.isValid()) {
      return 'Invalid date format, please use DD/MM/YYYY format'
    }

    let age = moment().diff(date, 'year')
    if (age <= 1) {
      return `Are you sure you are 1 year old ?`
    }
    if (age < 10 || age > 100) {
      return `Are you sure you are ${age} years old ?`
    }
  }
}

const validCode = (length) => {
  return value => {
    if (!isEmpty(value)) {
      value = value.trim()
      if (value.length !== length) {
        return `Must be ${length} characters`
      }
    }
  }
}

const LoginFormValidator = createValidator({
  fullName: [required, minLength(4)],
  dateOfBirth: [required, validDate],
  university: [required, minLength(6)],
  email: [required, email],
  code: [required, validCode(10)]
})

export default memoize(10)(LoginFormValidator)
