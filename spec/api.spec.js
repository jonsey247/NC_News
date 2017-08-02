process.env.NODE_ENV = 'test';
 const {expect} = require('chai');
 const request = require('supertest');
 const server = require('../server');
 const saveTestData = require('../seed/test.seed');
 const config = require('../config');
  const db = config.DB[process.env.NODE_ENV] || process.env.DB;
  
  describe('API', function () {
   // let usefulIds;
   before(done => {
      saveTestData(db, (err, savedData) => {
        if (err) {
          console.log(err);
          done(err);
        } else {
          usefulIds = savedData;
          done();
        }
      });
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
             console.log(res.body);
             expect(res.body.length).to.equal(3);
             done();
               }
         });
     });
   });
  });