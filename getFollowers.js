var q = require('q');
var request = q.denodeify(require('request'));

var convert = function(repos) {
  return repos.map(function(repo) {
    return repo.login;
  });
};

module.exports = function(q) {
  return request('http://localhost:3000/followers.json')
    .then(function(response) {
      return response[1];
    })
    .then(JSON.parse)
    .then(convert);
};
