"use strict";

var _sinon = require("sinon");

var _sinon2 = _interopRequireDefault(_sinon);

var _proxyquire = require("proxyquire");

var _proxyquire2 = _interopRequireDefault(_proxyquire);

var _sampleTests = require("./sample-tests");

var _sampleSuite = require("./sample-suite");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var utils = (0, _proxyquire2.default)('../src/utils', {
  uuid: { v4: function v4() {
      return 'fc3f8bee-4feb-4f28-8e27-a680704c9176';
    } }
});

var log = utils.log,
    cleanCode = utils.cleanCode,
    cleanTest = utils.cleanTest,
    cleanSuite = utils.cleanSuite;


describe('Mochawesome Utils', function () {
  describe('log', function () {
    var msg = 'Dry land is not a myth!';

    beforeEach(function () {
      _sinon2.default.spy(console, 'log');
      _sinon2.default.spy(console, 'error');
    });

    afterEach(function () {
      console.log.restore();
      console.error.restore();
    });

    it('does not log when quiet option is true', function () {
      log(msg, null, { quiet: true });
      console.log.called.should.be.false();
    });

    it('logs a message, default level: log', function () {
      log(msg);
      console.log.called.should.be.true();
      console.log.args[0][0].includes(msg).should.equal(true);
    });

    it('logs a message, specified level: error', function () {
      log(msg, 'error');
      console.error.called.should.be.true();
      console.error.args[0][0].includes(msg).should.equal(true);
    });

    it('logs a stringified object, default level: log', function () {
      log({ msg: msg });
      console.log.called.should.be.true();
      console.log.args[0][0].includes("{\n  \"msg\": \"" + msg + "\"\n}").should.equal(true);
    });
  });

  describe('cleanCode', function () {
    var expected = 'return true;';
    var fnStr = void 0;

    it('should clean standard function syntax, single line', function () {
      fnStr = 'function () { return true; }';
      cleanCode(fnStr).should.equal(expected);
    });

    it('should clean standard named function syntax, single line', function () {
      fnStr = 'function myTest() { return true; }';
      cleanCode(fnStr).should.equal(expected);
    });

    it('should clean standard function syntax, multi line', function () {
      fnStr = "function () {\n        return true;\n      }";
      cleanCode(fnStr).should.equal(expected);
    });

    it('should clean non-standard function syntax', function () {
      fnStr = "function ()\n      {\n        return true;\n      }";
      cleanCode(fnStr).should.equal(expected);
    });

    it('should clean standard function syntax with param', function () {
      fnStr = 'function (done) { return true; }';
      cleanCode(fnStr).should.equal(expected);
    });

    it('should clean arrow function syntax, single line', function () {
      fnStr = '() => { return true; } ';
      cleanCode(fnStr).should.equal(expected);
    });

    it('should clean arrow function syntax, single line no braces', function () {
      fnStr = '() => someFunction(arg)';
      cleanCode(fnStr).should.equal('someFunction(arg)');
    });

    it('should clean arrow function syntax, multi line', function () {
      fnStr = "()=> {\n        return true;\n      }";
      cleanCode(fnStr).should.equal(expected);
    });

    it('should clean generator function syntax', function () {
      fnStr = "function* () {\n        return true;\n      }";
      cleanCode(fnStr).should.equal(expected);
    });

    it('should clean arrow function syntax with param', function () {
      fnStr = '(done) => { return true; }';
      cleanCode(fnStr).should.equal(expected);
    });

    it('should clean arrow function syntax with parens', function () {
      fnStr = '(done) => ( someFunc() )';
      cleanCode(fnStr).should.equal('someFunc()');
    });

    it('should clean async standard function syntax', function () {
      fnStr = 'async function () {return true; } ';
      cleanCode(fnStr).should.equal(expected);
    });

    it('should clean async arrow function syntax', function () {
      fnStr = 'async () => { return true; }';
      cleanCode(fnStr).should.equal(expected);
    });

    it('should clean multi-line code', function () {
      fnStr = 'function () { var a = 1; return function add(b) { return a + b; }; };';
      cleanCode(fnStr).should.equal('var a = 1; return function add(b) { return a + b; };');
    });

    it('should clean code with comments', function () {
      fnStr = ['function () {', '  var b = 2; // set var', '  const f = () => ({ a: 1 })', '  function adamf() {', '    return b > 3; // make func', '  }', '  console.log(\'test\'); // log the test', '  var a = b;', '  /* return the thing */', '  return true;', '};'].join('\n');
      var exp = ['var b = 2; // set var', 'const f = () => ({ a: 1 })', 'function adamf() {', '  return b > 3; // make func', '}', 'console.log(\'test\'); // log the test', 'var a = b;', '/* return the thing */', 'return true;'].join('\n');
      cleanCode(fnStr).should.equal(exp);
    });

    it('should not modify non-function strings', function () {
      fnStr = "Lorem Ipsum is simply dummy text of the printing and typesetting\n      industry. Lorem Ipsum has been the industry's standard dummy text ever\n      since the 1500s, when an unknown printer took a galley of type and\n      scrambled it to make a type specimen book. It has survived not only five\n      centuries, but also the leap into electronic typesetting, remaining\n      essentially unchanged. It was popularised in the 1960s with the release\n      of Letraset sheets containing Lorem Ipsum passages, and more recently\n      with desktop publishing software like Aldus PageMaker including versions\n      of Lorem Ipsum.";
      cleanCode(fnStr).should.equal(fnStr);
    });
  });

  describe('cleanTest', function () {
    var config = { code: true };
    var expectedProps = ['title', 'fullTitle', 'timedOut', 'duration', 'state', 'speed', 'pass', 'fail', 'pending', 'context', 'code', 'err', 'uuid', 'parentUUID', 'skipped', 'isHook'];

    it('returns cleaned passing test', function () {
      var cleaned = cleanTest(_sampleTests.passing.raw, config);
      cleaned.should.have.properties(expectedProps);
      cleaned.should.deepEqual(_sampleTests.passing.cleaned);
    });

    it('returns cleaned failing test', function () {
      var cleaned = cleanTest(_sampleTests.failing.raw, config);
      cleaned.should.have.properties(expectedProps);
      cleaned.should.deepEqual(_sampleTests.failing.cleaned);
    });

    it('returns cleaned failing test with inline diff', function () {
      var cleaned = cleanTest(_sampleTests.failing.raw, { code: true, useInlineDiffs: true });
      cleaned.should.have.properties(expectedProps);
      cleaned.should.deepEqual(_sampleTests.failing.cleanedWithInlineDiff);
    });

    it('returns cleaned pending test', function () {
      var cleaned = cleanTest(_sampleTests.pending.raw, config);
      cleaned.should.have.properties(expectedProps);
      cleaned.should.deepEqual(_sampleTests.pending.cleaned);
    });

    it('returns cleaned hook', function () {
      var cleaned = cleanTest(_sampleTests.hook.raw, config);
      cleaned.should.have.properties(expectedProps);
      cleaned.should.deepEqual(_sampleTests.hook.cleaned);
    });

    it('returns cleaned test when `code` is `false`', function () {
      var cleaned = cleanTest(_sampleTests.hook.raw, { code: false });
      cleaned.should.have.properties(expectedProps);
      cleaned.code.should.equal('');
    });
  });

  describe('cleanSuite', function () {
    var config = { code: true };
    var totalTestsRegistered = { total: 0 };
    var expectedProps = ['title', 'fullFile', 'file', 'beforeHooks', 'afterHooks', 'tests', 'suites', 'passes', 'failures', 'pending', 'skipped', 'root', 'uuid', 'duration', 'rootEmpty', '_timeout'];

    it('cleans a root suite', function () {
      var cleaned = cleanSuite(_sampleSuite.one.raw, totalTestsRegistered, config);
      cleaned.should.have.properties(expectedProps);
      cleaned.should.deepEqual(_sampleSuite.one.cleaned);
    });

    it('cleans a non-root suite', function () {
      var cleaned = cleanSuite(_sampleSuite.two.raw, totalTestsRegistered, config);
      cleaned.should.have.properties(expectedProps);
      cleaned.should.deepEqual(_sampleSuite.two.cleaned);
    });

    it('cleans an empty suite', function () {
      var cleaned = cleanSuite(_sampleSuite.three.raw, totalTestsRegistered, config);
      cleaned.should.equal(_sampleSuite.three.cleaned);
    });
  });
});
