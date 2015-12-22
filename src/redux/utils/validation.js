import validator from 'validator'

const isEmpty = value => value === undefined || value === null || value === ''
/* eslint-disable */
const join = (rules) => (value, data) => rules.map(rule => rule(value, data)).filter(error => !!error)[0 /* first error */ ]
/* eslint-enable */

export const email = (value, formValues, message) => {
  if (!isEmpty(value) && !validator.isEmail(value)) {
    return (isEmpty(message)) ? 'Invalid email address' : message
  }
}

export const required = (value, formValues, message) => {
  if (isEmpty(value)) {
    return (isEmpty(message)) ? 'Required' : message
  }
}

export const fixedLength = (length, formValues, message) => {
  return value => {
    if (!isEmpty(value) && value.length !== length) {
      return (isEmpty(message)) ? `Must be ${length} characters` : message
    }
  }
}
export const minLength = (min, formValues, message) => {
  return value => {
    if (!isEmpty(value) && value.length < min) {
      return (isEmpty(message)) ? `Must be at least ${min} characters` : message
    }
  }
}

export const maxLength = (max, formValues, message) => {
  return value => {
    if (!isEmpty(value) && value.length > max) {
      return (isEmpty(message)) ? `Must be no more than ${max} characters` : message
    }
  }
}

export const integer = (value, formValues, message) => {
  if (!Number.isInteger(Number(value))) {
    return (isEmpty(message)) ? 'Must be an integer' : message
  }
}

export const oneOf = (enumeration, formValues, message) => {
  return value => {
    if (!~enumeration.indexOf(value)) {
      return (isEmpty(message)) ? `Must be one of: ${enumeration.join(', ')}` : message
    }
  }
}

export const match = (field, formValues, message) => {
  return (value, data) => {
    if (data) {
      if (value !== data[field]) {
        return (isEmpty(message)) ? 'Do not match' : message
      }
    }
  }
}

export const createValidator = (rules) => {
  return (data = {}) => {
    const errors = {}
    Object.keys(rules).forEach((key) => {
      const rule = join([].concat(rules[key])) // concat enables both functions and arrays of functions
      const error = rule(data[key], data)
      if (error) {
        errors[key] = error
      }
    })
    return errors
  }
}
