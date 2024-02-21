const app = require('express')()

app.get('/api', function (req, res) {
  return res.json({hello: 'dog'});
});

app.get('/api/marco', function (req, res) {
  return res.end("polo");
});

module.exports = app
