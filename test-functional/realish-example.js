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

describe('<Navigation>', function () {
  it('passes the smoke test', function () {
    (1 + 1).should.equal(2);
  });

  describe('renders', function () {
    it('should have text context', function (done) {
      (1 + 1).should.equal(2);
      (0, _addContext.addContext)(this, 'this is the test context');
      done();
    });
    it('should have url context, no protocol', function (done) {
      (1 + 1).should.equal(2);
      (0, _addContext.addContext)(this, 'www.apple.com');
      done();
    });
  });

  describe('when screen is mobile', function () {
    it('should have some properties', function () {
      (1 + 1).should.equal(2);
    });

    describe('and is also android', function () {
      it('should have some other properties', function () {
        (1 + 1).should.equal(2);
      });
    });
  });
});
