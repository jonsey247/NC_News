if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';

const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bodyParser = require('body-parser');
const app = express();
const config = require('./config');
const db = config.DB[process.env.NODE_ENV] || process.env.DB;
const PORT = config.PORT[process.env.NODE_ENV] || process.env.PORT;
const controllers = require('./controllers');

mongoose.connect(db, function (err) {
  if (!err) {
    console.log(`connected to the Database: ${db}`);
  } else {
    console.log(`error connecting to the Database ${err}`);
  }
});

app.use(bodyParser.json());
app.get('/', function (req, res) {
  res.status(200).send('All good!');
});
app.get('/api/topics', controllers.getTopics);
app.get('/api/topics/:topic_id/articles', controllers.getArticlesByTopic);
app.get('/api/articles', controllers.getArticles);
app.get('/api/articles/:article_id/comments', controllers.getCommentsByArticles);
app.post('/api/articles/:article_id/comments', controllers.postCommentToArticle);
app.use('/api', function () { });

app.listen(PORT, function () {
  console.log(`listening on port ${PORT}`);
});

module.exports = app; 