var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);

describe('Root', function() {
  it('should return page on / GET', function(done) {
    chai.request(server)
      .get('/')
      .end(function(err, res) {
        res.should.have.status(200);
        done();
      });
  });
});

var joel = {};

describe('User', function() {
  it('should return a list on GET /api/users', function(done) {
    chai.request(server)
      .get('/api/users')
      .end(function(err, res) {
        res.should.be.json;
        res.body.should.be.a('array');
        done();
      });
  });

  it('should create a user on POST /api/users', function(done) {
    chai.request(server)
      .post('/api/users')
      .send({
        'name': 'Joel Barish',
        'email': 'jbarish@gmail.com',
        'password': 'foobar'
      })
      .end(function(err, res) {
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('user');
        res.body.user.should.have.property('_id');
        joel.id = res.body.user._id;
        done();
      });
  });

  it('should get user by id on GET /api/users/:id', function(done) {
    chai.request(server)
      .get('/api/users/' + joel.id)
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.property('_id');
        done();
      });
  })

  it ('should delete a user on DELETE /api/users/:id', function(done) {
    chai.request(server)
      .delete('/api/users/' + joel.id)
      .end(function(err, res) {
        res.should.have.status(200);
        done();
      });
  });
});