var _ = require('underscore')

const VALIDATION_ERROR = 'VALIDATION_ERROR'
const NOT_ENOUGH_PARAMETERS = 'NOT_ENOUGH_PARAMETERS'
const PARAMETER_MUST_NOT_BE_NULL = 'PARAMETER_MUST_NOT_BE_NULL'
const INVALID_CODE = 'INVALID_CODE'
const USED_CODE = 'USED_CODE'
const CODE_SAVING_ERROR = 'CODE_SAVING_ERROR'
const CONTESTANT_SAVING_ERROR = 'CONTESTANT_SAVING_ERROR'

const fields = ['fullName', 'dob', 'university', 'email', 'code']

module.exports = function (req, res) {
  var body = JSON.parse(req.body)

  if (!body.data) {
    res.error({
      message: 'Not enough parameters',
      type: NOT_ENOUGH_PARAMETERS
    })
    return
  }
  for (var i = 0; i < fields.length; i++) {
    var field = fields[i]

    if (!_.has(body.data, field)) {
      res.error({
        message: 'Payload must have ' + field + ' field',
        type: NOT_ENOUGH_PARAMETERS
      })
      return
    }

    if (body.data[field] === null || body.data[field] === '') {
      res.error({
        message: field + ' field must not be null',
        type: PARAMETER_MUST_NOT_BE_NULL
      })
      return
    }
  }

  if (body.data.code.length !== 10) {
    res.error({
      message: 'Code must be 10 characters',
      type: VALIDATION_ERROR
    })
    return
  }
  // TODO: Do more validation for other fields here
  var codeObject = undefined
  var contestantObject = undefined

  var query = new Parse.Query('Code')
  query.get(body.data.code)
  // Process received Code object
  .then(function (code) {
    debug ('it get to code object branch')
    codeObject = code
    if (!code.get('isValid')) {
      return Parse.Promise.error(USED_CODE)
    }
  })
  // Save user input information
  .then(function () {
    debug ('it get to save contestant branch')
    var contestant = new Parse.Object('Contestant')
    contestant.set('name', body.data.fullName)
    contestant.set('dayOfBirth', body.data.dob)
    contestant.set('email', body.data.email)
    contestant.set('university', body.data.university)

    contestant.set('code', { __type: 'Pointer', className: 'Code', objectId: codeObject.id })
    return contestant.save()
  })
  .then(function (contestant) {
    contestantObject = contestant
    return
  })
  // Saving new state of code.isValid
  .then(function () {
    debug('it get to set idValid = false branch')
    codeObject.set('isValid', false)
    return codeObject.save()
  })
  // Return contestant information back with code
  .then(function () {
    debug('it get to res.success')
    res.success({
      code: codeObject.id,
      contestantId: contestantObject.id
    })
  })
  // Handle error here
  .then(null, function (error) {
    debug(error)
    var type = error
    if (typeof error === 'object') {
      switch (error.code) {
        case 101:
          type = INVALID_CODE
          break
        case 111:
          type = CONTESTANT_SAVING_ERROR
          break
        default:
          type = error.message
          break
      }

      return res.error({
        type: type,
        code: error.code,
        message: error.message
      })
    }

    res.error({
      type: error
    })
  })
}

var debug = function (data) {
  console.log('=============')
  console.log(data)
  console.log('=============')
}

// res.error({
//   message: 'Input code was used',
//   type: INVALID_CODE
// })

// res.error({
//   message: 'There is a problem while saving your information. Please try again. It is not your fault',
//   type: CONTESTANT_SAVING_ERROR,
//   error: error
// })
//

// res.error({
//   message: 'There is a problem while saving your code. Please try again. It is not your fault',
//   type: CODE_SAVING_ERROR,
//   error: error
// })
