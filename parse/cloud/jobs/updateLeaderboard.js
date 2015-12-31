module.exports = function(request, status) {
  var boardObject = Parse.Object.extend('Leaderboard')

  // Query and destroy all object in Leaderboard
  var query = new Parse.Query('Leaderboard')
  query.limit(100)
  query.find()
  .then(function (results) {
    return Parse.Object.destroyAll(results)
  })
  // Query new leaderboard info
  .then(function () {
    var query = new Parse.Query('Result')
    query.descending('score')
    query.addAscending('time')
    query.limit(10)
    return query.find()
  })
  // Generate a new boards array
  // for new Leaderboard info
  .then(function (results) {
    var boards = []
    for (var i = 0; i < results.length; i++) {
      var result = results[i]
      var board = new boardObject()
      board.set('rank', i + 1)
      board.set('score', result.get('score'))
      board.set('time', result.get('time'))
      board.set('contestant', result.get('contestant'))
      board.set('result', result)
      boards.push(board)
    }

    return Parse.Object.saveAll(boards)
  })
  .then(function (objs) {
    status.success('Update leaderboard succeed')
  })
  .then(null, function (error) {
    console.log(error)
    status.error('Update leaderboard failed')
  })
}
