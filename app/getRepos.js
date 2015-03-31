var q = require('q');
var request = q.denodeify(require('request'));

var convert = function(repos) {
  return repos.map(function(repo) {
    return repo.name;
  });
};

module.exports = function(q) {
  return request('http://localhost:3000/repos.json')
    .then(function(response) {
      return response[1];
    })
    .then(JSON.parse)
    .then(convert);
};
