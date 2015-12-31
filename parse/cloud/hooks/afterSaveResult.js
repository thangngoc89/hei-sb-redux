module.exports = function(req) {
  if (req.object.time !== undefined) {
    return
  }

  var finalTime = req.object.createdAt
  // Get contestantId via Pointer in Result object
  var contestantId = req.object.get('contestant').id

  // Get full Contestant Object
  var query = new Parse.Query('Contestant')
  query.get(contestantId)
  .then(function (result) {
    return result.createdAt
  })
  // Subtract time and save it
  .then(function (startTime) {
    var time = finalTime - startTime
    req.object.set('time', time)
    return req.object.save()
  })
  .then(null, function(err) {
    console.log('===============')
    console.log('There was a error while calculating result time')
    console.log(err)
  })
}
