const { Topics, Articles, Comments, Users  } = require('./models/models');

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
    const query = { belongs_to: req.params.article_id };
    Comments.find(query, function (err, comments) {
        if (err) return res.status(500).send('Error: something went wrong.');
        else {
            res.status(200).json(comments);
        }
    });
}



function postCommentToArticle(req, res) {
    const newComment = req.body.comment;
    const commentObj = { belongs_to: req.params.article_id, body: newComment };
    const freshComment = new Comments(commentObj);
    freshComment.save(function (err, comments) {
        if (err) return res.status(500).send('Error: something went wrong.');
        else {
            res.status(200).json(comments);
        }
    });
}

function voteArticle(req, res) {
    const query = req.query;
    let voteNum;
    if (query.vote === 'up') { voteNum = 1; } else if (query.vote === 'down') { voteNum = -1; }
    Articles.findByIdAndUpdate(req.params.article_id, { $inc: { votes: voteNum } }, function (err) {
        if (err) return res.status(500).send(err)
        else {
            res.status(200).send({ message: 'OK' });
        }
    });
}

function getArticlesById(req, res) {
    Articles.findById(req.params.article_id, function (err, article) {
        if (err) return res.status(500).send('Error: something went wrong.');
        else {
            res.status(200).json(article);
        }
    });
}



function voteComment(req, res) {
    const query = req.query;
    let voteNum;
    if (query.vote === 'up') { voteNum = 1; } else if (query.vote === 'down') { voteNum = -1; }
    Comments.findByIdAndUpdate(req.params.comment_id, { $inc: { votes: voteNum } }, function (err) {
        if (err) return res.status(500).send(err);
        else {
            res.status(200).send({ message: 'OK' });
        }
    });
}

function deleteComment(req, res) {
    Comments.findByIdAndRemove(req.params.comment_id, function (err) {
        if (err) return res.status(500).send(err);
        else {
            res.status(200).send({ message: 'comment deleted' });
        }
    });
}

function getUserProfile (req, res) {
    console.log(req.url);
    console.log(req.params);
   Users.findOne({username:req.params.username}, function (err, user) {
        if (err) return res.status(500).send('Error: something went wrong.');
        else {
            return res.status(200).json({user});
        }
    }); 
}



module.exports = {
    getTopics, getArticlesByTopic, getArticles, getCommentsByArticles,
    postCommentToArticle, voteArticle, getArticlesById, voteComment,
    deleteComment, getUserProfile
};