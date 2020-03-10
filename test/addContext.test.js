'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _addContext = require('../src/addContext');

describe('addContext', function () {
  var testObj = void 0;
  var activeTest = void 0;
  var test = void 0;
  var origConsoleError = void 0;

  var makeHook = function makeHook(type) {
    return {
      title: '"' + type + '" hook',
      body: 'function () {\n    addContext(this, "i\'m in a before hook");\n  }',
      async: 0,
      sync: true,
      timedOut: false,
      pending: false,
      type: 'hook',
      parent: '#<Suite>',
      ctx: '#<Context>',
      file: '/test.js',
      uuid: '9f4e292c-8668-4008-9dc4-589909f94054'
    };
  };

  beforeEach(function () {
    origConsoleError = console.error;
    console.error = function () {};

    activeTest = {
      title: 'sample test',
      body: 'function () {\n    addContext(this, "i\'m in a test");\n    assert(true);\n  }',
      async: 0,
      sync: true,
      timedOut: false,
      pending: false,
      type: 'test',
      file: '/test.js',
      parent: '#<Suite>',
      ctx: '#<Context>'
    };
  });

  afterEach(function () {
    console.error = origConsoleError;
  });

  function contextTests() {
    it('as a string', function () {
      (0, _addContext.addContext)(testObj, 'test context');
      test.should.eql(_extends({}, test, {
        context: 'test context'
      }));
    });

    it('as an object', function () {
      (0, _addContext.addContext)(testObj, {
        title: 'context title',
        value: true
      });
      test.should.eql(_extends({}, test, {
        context: {
          title: 'context title',
          value: true
        }
      }));
    });

    it('as an object with undefined value', function () {
      (0, _addContext.addContext)(testObj, {
        title: 'context title',
        value: undefined
      });
      test.should.eql(_extends({}, test, {
        context: {
          title: 'context title',
          value: 'undefined'
        }
      }));
    });

    it('as multiple items', function () {
      (0, _addContext.addContext)(testObj, 'test context 1');
      (0, _addContext.addContext)(testObj, 'test context 2');
      (0, _addContext.addContext)(testObj, { title: 'test context 3', value: true });
      test.should.eql(_extends({}, test, {
        context: ['test context 1', 'test context 2', { title: 'test context 3', value: true }]
      }));
    });
  }

  describe('when run inside a test', function () {
    beforeEach(function () {
      testObj = {
        currentTest: undefined,
        test: activeTest
      };
      test = testObj.test;
    });
    contextTests();
  });

  describe('when run inside a before', function () {
    beforeEach(function () {
      testObj = {
        currentTest: activeTest,
        test: makeHook('before all')
      };
      test = testObj.test;
    });
    contextTests();
  });

  describe('when run inside a beforeEach', function () {
    beforeEach(function () {
      testObj = {
        currentTest: activeTest,
        test: makeHook('before each')
      };
      test = testObj.currentTest;
    });
    contextTests();
  });

  describe('when run inside an after', function () {
    beforeEach(function () {
      testObj = {
        currentTest: activeTest,
        test: makeHook('after all')
      };
      test = testObj.test;
    });
    contextTests();
  });

  describe('when run inside an afterEach', function () {
    beforeEach(function () {
      testObj = {
        currentTest: activeTest,
        test: makeHook('after each')
      };
      test = testObj.currentTest;
    });
    contextTests();
  });

  describe('No context is added when', function () {
    beforeEach(function () {
      testObj = {
        test: {
          title: 'sample test'
        }
      };
      test = testObj.test;
    });

    it('wrong number of args', function () {
      (0, _addContext.addContext)('');
      test.should.not.have.property('context');
    });

    it('wrong test object', function () {
      (0, _addContext.addContext)({}, 'test context');
      test.should.not.have.property('context');
    });

    it('wrong context, empty string', function () {
      (0, _addContext.addContext)(testObj, '');
      test.should.not.have.property('context');
    });

    it('wrong context object, empty', function () {
      (0, _addContext.addContext)(testObj, {});
      test.should.not.have.property('context');
    });

    it('wrong context object, no title', function () {
      (0, _addContext.addContext)(testObj, { value: 'test' });
      test.should.not.have.property('context');
    });

    it('wrong context object, empty title', function () {
      (0, _addContext.addContext)(testObj, { title: '', value: undefined });
      test.should.not.have.property('context');
    });

    it('wrong context object, no value', function () {
      (0, _addContext.addContext)(testObj, { title: 'context title' });
      test.should.not.have.property('context');
    });
  });
});
