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

describe('Agronomist', function() {
  it('should return a list on GET /api/agronomist', function(done) {
    chai.request(server)
      .get('/api/agronomist')
      .end(function(err, res) {
        res.should.be.json;
        res.body.should.be.a('array');
        done();
      });
  });
});