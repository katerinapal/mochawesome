'use strict';

var _addContext = require('../src/addContext');

function retObj() {
  return {
    employees: {
      employee: [{
        id: '1',
        firstName: 'Tom',
        lastName: 'Cruise'
      }, {
        id: '2',
        firstName: 'Maria',
        lastName: 'Sharapova'
      }, {
        id: '3',
        firstName: 'James',
        lastName: 'Bond'
      }]
    }
  };
}

describe('Master Test Suite', function () {
  // it('passing test', done => {
  //   (1+1).should.equal(2);
  //   done();
  // });

  describe('Test Suite - Basic', function () {
    it('should be passing test if true is not false', function (done) {
      (1 + 1).should.equal(2);
      done();
    });
    it('should fail when returned object does not match expected object', function (done) {
      var o = retObj();
      o.should.eql({});
      done();
    });
  });

  describe('Test Suite - Nested Suites', function () {
    describe('Nested Test Suite', function () {
      it('should be a passing test', function (done) {
        (1 + 1).should.equal(2);
        done();
      });
    });
    it('passing test', function (done) {
      (1 + 1).should.equal(2);
      (0, _addContext.addContext)(this, 'https://github.com/adamgruber');
      done();
    });
    describe('Nested Test Suite', function () {
      it('passing test', function (done) {
        (1 + 1).should.equal(2);
        done();
      });
    });
    it('should be a failing test', function (done) {
      (0, _addContext.addContext)(this, {
        title: 'How I Feel When Tests Fail',
        value: 'http://i.imgur.com/c4jt321.png'
      });
      false.should.equal(true);
      done();
    });
  });

  describe('Test Suite - Nested Suites Failing Before', function () {
    before('nested failing before', function () {
      console.log(a); // eslint-disable-line
    });
    describe('Nested Test Suite', function () {
      it('passing test', function (done) {
        (1 + 1).should.equal(2);
        done();
      });
    });
    it('passing test', function (done) {
      (1 + 1).should.equal(2);
      done();
    });
  });

  describe('Test Suite - Failed After', function () {
    it('passing test', function (done) {
      (1 + 1).should.equal(2);
      done();
    });
    xit('pending test', function (done) {
      done();
    });
    it('failing test', function (done) {
      false.should.equal(true);
      done();
    });
    it('passing test', function (done) {
      (1 + 1).should.equal(2);
      done();
    });
    xit('pending test', function (done) {
      done();
    });
    after('failing after hook', function () {
      console.log('a');
    });
  });

  describe('Test Suite - Pass', function () {
    it('passing test', function (done) {
      (1 + 1).should.equal(2);
      done();
    });
  });

  describe('Test Suite - Fail', function () {
    it('failing test', function (done) {
      false.should.equal(true);
      done();
    });
  });

  describe('Test Suite - Pend', function () {
    xit('pending test', function (done) {
      (1 + 1).should.equal(2);
      done();
    });
  });

  describe('Test Suite - Failed Before', function () {
    before('failing before hook', function () {
      console.log(a); // eslint-disable-line
    });
    it('passing test', function (done) {
      (1 + 1).should.equal(2);
      done();
    });

    it('failing test', function (done) {
      false.should.equal(true);
      done();
    });
  });

  describe('Test Suite - Failed Before and After', function () {
    before('failing before hook', function () {
      console.log(a); // eslint-disable-line
    });
    it('passing test', function (done) {
      (1 + 1).should.equal(2);
      done();
    });

    it('failing test', function (done) {
      false.should.equal(true);
      done();
    });
    after('failing after hook', function () {
      console.log(a); // eslint-disable-line
    });
  });

  describe('Test Suite - Failed Before Each', function () {
    beforeEach('failing beforeEach hook', function () {
      console.log(a); // eslint-disable-line
    });
    it('passing test', function (done) {
      (1 + 1).should.equal(2);
      done();
    });

    it('failing test', function (done) {
      false.should.equal(true);
      done();
    });
  });

  describe('Test Suite - Failed After Each', function () {
    it('passing test', function (done) {
      (1 + 1).should.equal(2);
      done();
    });
    xit('pending test', function (done) {
      done();
    });
    it('failing test', function (done) {
      false.should.equal(true);
      done();
    });
    it('passing test', function (done) {
      (1 + 1).should.equal(2);
      done();
    });
    xit('pending test', function (done) {
      done();
    });
    afterEach('failing afterEach hook', function () {
      console.log('a');
    });
  });
});
