module.exports = function (req, res) {
  var query = new Parse.Query('Leaderboard')
  query.descending('createdAt')
  query.limit(10)
  query.include('contestant')
  query.find()
  .then(function (result) {
    if (result.length === 0) {
      return Parse.Promise.error('NO_RESULT')
    }

    var rows = []
    for (var i = 0; i < result.length; i++) {
      var obj = result[i]
      var row = {
        rank: obj.get('rank'),
        score: obj.get('score'),
        time: obj.get('time'),
        fullName: obj.get('contestant').get('name'),
        university: obj.get('contestant').get('university')
      }
      rows.push(row)
    }

    var leaderboard = {
      lastUpdate: result[0].createdAt,
      data: rows
    }

    return leaderboard
  })
  .then(function (leaderboard) {
    res.success(leaderboard)
  })
  .then(null, function (err) {
    console.error('Error while getting leadrboard information')
    console.error(err)
    res.error(err)
  })
}
