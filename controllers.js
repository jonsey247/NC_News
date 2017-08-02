const { Topics, Articles, Comments } = require('./models/models');
// const ObjectId = require('mongoose').Types.ObjectId; 

// const { map } = require('bluebird');
function getTopics(req, res) {
    Topics.find({}, function (err, topics) {
        if (err) return res.status(500).send('Error: something went wrong.');
        else {
            res.status(200).json(topics);
        }
    });
}

function getArticlesByTopic(req, res) {
    const id = req.params.topic_id;
    Articles.find({ belongs_to: id }, function (err, topics) {
        if (err) return res.status(500).send('Error: something went wrong.');
        else {
            res.status(200).json(topics);
        }
    });
}

function getArticles(req, res) {
    Articles.find({}, function (err, articles) {
        if (err) return res.status(500).send('Error: something went wrong.');
        else {
            res.status(200).json(articles);
        }
    });
}

function getCommentsByArticles(req, res) {
    // const id_obj = new ObjectId(req.params.article_id);
    const query = {belongs_to: req.params.article_id}; 
    Comments.find(query, function (err, comments) {
            if (err) return res.status(500).send('Error: something went wrong.');
            else {
                res.status(200).json(comments);
            }
        });
    }
    module.exports = {
        getTopics, getArticlesByTopic, getArticles, getCommentsByArticles
    };