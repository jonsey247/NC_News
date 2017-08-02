const { Topics } = require('./models/models');
 // const { map } = require('bluebird');
 function getTopics (req, res) {
     Topics.find({}, function (err, topics) {
         if(err) return res.status(500).send('Error: something went wrong.');
         else {
             res.status(200).json(topics);
         }
     });
 }
 
 module.exports = {
     getTopics
 };