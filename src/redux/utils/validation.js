import validator from 'validator'

export const isEmpty = value => value === undefined || value === null || value === ''
/* eslint-disable */
const join = (rules) => (value, data) => rules.map(rule => rule(value, data)).filter(error => !!error)[0 /* first error */ ]
/* eslint-enable */

export function email (value) {
  // Let's not start a debate on email regex. This is just for an example app!
  if (!isEmpty(value) && !validator.isEmail(value)) {
    return 'Invalid email address'
  }
}

export function required (value) {
  if (isEmpty(value)) {
    return 'Required'
  }
}

export function fixedLength (length) {
  return value => {
    if (!isEmpty(value) && value.length !== length) {
      return `Must be ${length} characters`
    }
  }
}
export function minLength (min) {
  return value => {
    if (!isEmpty(value) && value.length < min) {
      return `Must be at least ${min} characters`
    }
  }
}

export function maxLength (max) {
  return value => {
    if (!isEmpty(value) && value.length > max) {
      return `Must be no more than ${max} characters`
    }
  }
}

export function integer (value) {
  if (!Number.isInteger(Number(value))) {
    return 'Must be an integer'
  }
}

export function oneOf (enumeration) {
  return value => {
    if (!~enumeration.indexOf(value)) {
      return `Must be one of: ${enumeration.join(', ')}`
    }
  }
}

export function match (field) {
  return (value, data) => {
    if (data) {
      if (value !== data[field]) {
        return 'Do not match'
      }
    }
  }
}

export function createValidator (rules) {
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
