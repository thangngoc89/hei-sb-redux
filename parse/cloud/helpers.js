var _ = require('underscore')

var getRandomNumbers = function (total, start, end) {
  // Generate an array
  var a = []
  for (var i = start; i <= end; i++)
    a.push(i)

  a = _.shuffle(a)

  // Return only {total} element
  a = a.slice(0, total)

  return a
}

module.exports = {
  getRandomNumbers: getRandomNumbers
}
