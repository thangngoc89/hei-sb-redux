import { createValidator,
          isEmpty,
          required,
          email,
          minLength,
          fixedLength } from 'redux/utils/validation'
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

const vnPhoneNumber = value => {
  if (!isEmpty(value)) {
    const onlyNums = value.replace(/\s/g, '')
    const re = /^0(\d{9,10})/
    if (!re.test(onlyNums)) {
      return 'Invalid phone number. Ex: 0912 345 678'
    }
  }
}

const LoginFormValidator = createValidator({
  fullName: [required, minLength(4)],
  dateOfBirth: [required, validDate],
  university: [required, minLength(6)],
  email: [required, email],
  code: [required, fixedLength(10)],
  phone: [required, vnPhoneNumber]
})

export default memoize(10)(LoginFormValidator)
