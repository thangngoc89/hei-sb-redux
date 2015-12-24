import { createValidator,
          isEmpty,
          required,
          email,
          minLength,
          fixedLength } from 'redux/utils/validation'
import moment from 'moment'

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
    if (age < 10) {
      return `Are you sure you are ${age} years old ?`
    }
  }
}

const LoginFormValidator = createValidator({
  fullName: [required, minLength(4)],
  dateOfBirth: [required, validDate], // TODO: Enforce date validation here
  university: [required, minLength(6)],
  email: [required, email],
  code: [required, fixedLength(10)]
})

export default LoginFormValidator
