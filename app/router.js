var q = require('q');
var getRepos = require('./getRepos');
var getFollowers = require('./getFollowers');

module.exports = function(app) {
  app.get('/', function(req, res) {

    var repos = getRepos();
    var followers = getFollowers();

    q.all([repos, followers])
      .then(function(responses) {
        return {
          repos: responses[0],
          followers: responses[1]
        }
      }).done(function(response) {
        res.render('index', {
          greeting: 'Hello ' + (req.user ? req.user.username : 'anonymous'),
          repos: response.repos,
          followers: response.followers
        });
      });
  });
};
