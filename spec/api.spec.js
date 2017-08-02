 process.env.NODE_ENV = 'test';
 const {expect} = require('chai');
 const request = require('supertest');
 const server = require('../server');
 const saveTestData = require('../seed/test.seed');
 const config = require('../config');
 const db = config.DB[process.env.NODE_ENV] || process.env.DB;
 const mongoose = require('mongoose');
 
 describe('API', function () {
   let usefulIds;
 before((done) => {
     mongoose.connection.dropDatabase()
       .then(() => saveTestData(db, function(err, id) {
         if (err) throw err;
         else {
           usefulIds = id;
         }
          done();
       }));
   });
   describe('GET /', function () {
     it('responds with status code 200', function (done) {
       request(server)
         .get('/')
         .end((err, res) => {
           if (err) done(err);
           else {
             expect(res.status).to.equal(200);
             done();
           }
         });
     });
   });
 
   describe('GET /api/topics', function () {
     it('responds with status code 200', function (done) {
       request(server)
         .get('/api/topics')
         .end((err, res) => {
           if (err) done(err);
           else {
             expect(res.status).to.equal(200);
             done();
           }
         });
     });
     it('It gets all topics', function (done) {
       request(server)
         .get('/api/topics')
         .end((err, res) => {
           if (err) done(err);
           else {
             expect(res.body.length).to.equal(3);
             done();
               }
         });
     });
   });
   
   describe('GET /api/topics/:topic_id/articles', function () {
     it('responds with status code 200', function (done) {
       request(server)
         .get('/api/topics')
         .end((err, res) => {
           if (err) done(err);
           else {
             expect(res.status).to.equal(200);
             done();
           }
         });
     });
     it('It gets all articles for a certain topic', function (done) {
       request(server)
         .get('/api/topics/football/articles')
         .end((err, res) => {
           if (err) done(err);
           else {
             expect(res.body.length).to.equal(1);
             done();
               }
         });
     });
   });
 
   describe('GET /api/articles', function () {
     it('responds with status code 200', function (done) {
       request(server)
         .get('/api/articles')
         .end((err, res) => {
           if (err) done(err);
           else {
             expect(res.status).to.equal(200);
             done();
           }
         });
     });
     it('It gets all articles', function (done) {
       request(server)
         .get('/api/articles')
         .end((err, res) => {
           if (err) done(err);
           else {
             expect(res.body.length).to.equal(2);
             done();
               }
         });
     });
   });
  
    describe('GET /api/articles/:article_id/comments', function () {
     it('responds with status code 200', function (done) {
       request(server)
         .get(`/api/articles/${usefulIds.article_id}/comments`)
         .end((err, res) => {
           if (err) done(err);
           else {
             expect(res.status).to.equal(200);
             done();
           }
         });
     });
     it('It gets all articles', function (done) {
       request(server)
         .get(`/api/articles/${usefulIds.article_id}/comments`)
         .end((err, res) => {
           if (err) done(err);
           else {
             expect(res.body.length).to.equal(2);
             done();
               }
         });
     });
   });
   describe('POST /api/articles/:article_id/comments', function () {
     it('It posts a new comment to an article', function (done) {
       request(server)
         .post(`/api/articles/${usefulIds.article_id}/comments`)
         .send({"comment": "This is my new comment"})
         .end((err, res) => {
           if (err) done(err);
           else {
             expect(res.status).to.equal(200);
             request(server)
             .get(`/api/articles/${usefulIds.article_id}/comments`)
             .end((err, res) => {
               expect(res.status).to.equal(200);
               expect(res.body.length).to.equal(3);
               done();
             });
           }
         });
     });
   });
   describe('PUT /api/articles/:article_id', function () {
      it('It increases the number of up votes', function (done) {
       request(server)
         .put(`/api/articles/${usefulIds.article_id}?vote=up`)
         .end((err, res) => {
           if (err) done(err);
            else {
              expect(res.status).to.equal(200);
              request(server)
             .get(`/api/articles/${usefulIds.article_id}`)
              .end((err, res) => {
                expect(res.status).to.equal(200);
               expect(res.body.votes).to.equal(1);
                done();
              });
            }
       });
     });
       it('It reduces the number of up votes', function (done) {
       request(server)
         .put(`/api/articles/${usefulIds.article_id}?vote=down`)
         .end((err, res) => {
           if (err) done(err);
           else {
             expect(res.status).to.equal(200);
             request(server)
             .get(`/api/articles/${usefulIds.article_id}`)
             .end((err, res) => {
               expect(res.status).to.equal(200);
               expect(res.body.votes).to.equal(0);
               done();
             });
           }
         });
     });
   });

   
   describe('PUT /api/comments/:comment_id', function () {
     it('It increases the number of up votes', function (done) {
       request(server)
         .put(`/api/comments/${usefulIds.comment_id}?vote=up`)
         .end((err, res) => {
           if (err) done(err);
           else {
             expect(res.status).to.equal(200);
             request(server)
             .get(`/api/articles/${usefulIds.article_id}/comments`)
             .end((err, res) => {
               expect(res.status).to.equal(200);
               expect(res.body[0].votes).to.equal(1);
               done();
             });
           }
         });
     });
     it('It reduces the number of up votes', function (done) {
       request(server)
         .put(`/api/comments/${usefulIds.comment_id}?vote=down`)
         .end((err, res) => {
           if (err) done(err);
           else {
             expect(res.status).to.equal(200);
             request(server)
             .get(`/api/articles/${usefulIds.article_id}/comments`)
             .end((err, res) => {
               expect(res.status).to.equal(200);
               expect(res.body[0].votes).to.equal(0);
               done();
             });
           }
         });
     });
   });
 });