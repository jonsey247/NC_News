const { Topics } = require('./models/models');
const { Topics, Articles } = require('./models/models');
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
    console.log(id);
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
module.exports = {
    getTopics, getArticlesByTopic, getArticles
};
module.exports = {
    getTopics, getArticlesByTopic
}; 