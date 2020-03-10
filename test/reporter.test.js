"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _mocha = require("mocha");

var _mocha2 = _interopRequireDefault(_mocha);

var _statsCollector = require("mocha/lib/stats-collector");

var _statsCollector2 = _interopRequireDefault(_statsCollector);

var _sinon = require("sinon");

var _sinon2 = _interopRequireDefault(_sinon);

var _proxyquire = require("proxyquire");

var _proxyquire2 = _interopRequireDefault(_proxyquire);

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _utils = require("../src/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Assert = _assert2.default.AssertionError;

var Runner = _mocha2.default.Runner,
    Suite = _mocha2.default.Suite,
    Test = _mocha2.default.Test;

var makeTest = function makeTest(title, doneFn) {
  return new Test(title, doneFn);
};

var reportStub = _sinon2.default.stub();
var logStub = _sinon2.default.stub();
var specStub = _sinon2.default.stub();
var nyanStub = _sinon2.default.stub();
var statsCollectorStub = _sinon2.default.stub();

_utils.utilsjs.log = logStub;

var baseConfig = {
  quiet: false,
  reportFilename: 'mochawesome',
  saveHtml: true,
  saveJson: true,
  useInlineDiffs: false,
  consoleReporter: 'spec',
  code: true
};

var mochawesome = (0, _proxyquire2.default)('../src/mochawesome', {
  'mochawesome-report-generator': {
    create: reportStub
  },
  'mocha/lib/reporters/spec': specStub,
  'mocha/lib/reporters/nyan': nyanStub,
  'mocha/lib/stats-collector': statsCollectorStub,
  './utils': _utils.utilsjs
});

describe('Mochawesome Reporter', function () {
  var mocha = void 0;
  var suite = void 0;
  var subSuite = void 0;
  var runner = void 0;
  var mochaReporter = void 0;

  beforeEach(function () {
    mocha = new _mocha2.default({ reporter: mochawesome.Mochawesome });
    suite = new Suite('', 'root');
    subSuite = new Suite('Mochawesome Suite', 'root');
    suite.addSuite(subSuite);
    runner = new Runner(suite);
    (0, _statsCollector2.default)(runner);
    mochaReporter = new mocha._reporter(runner, {
      reporterOptions: {
        quiet: true
      }
    });
  });

  describe('Stats Collector', function () {
    beforeEach(function () {
      delete runner.stats;
      mochaReporter = new mocha._reporter(runner, {
        reporterOptions: {
          quiet: true
        }
      });
    });

    it('should initialize stats collector', function () {
      statsCollectorStub.called.should.equal(true);
    });
  });

  describe('Test Handling', function () {
    it('should have 1 test passing', function (done) {
      var test = makeTest('passing test', function () {});
      subSuite.addTest(test);

      runner.run(function (failureCount) {
        failureCount.should.equal(0);
        mochaReporter.stats.passPercent.should.equal(100);
        done();
      });
    });

    it('should have 1 test failure', function (done) {
      var error = { expected: { a: 1 }, actual: { a: 2 } };
      var test = makeTest('failing test', function (tDone) {
        return tDone(new Assert(error));
      });
      subSuite.addTest(test);

      runner.run(function (failureCount) {
        failureCount.should.equal(1);
        mochaReporter.stats.passPercent.should.equal(0);
        done();
      });
    });

    it('should have 1 test pending', function (done) {
      var test = makeTest('pending test');
      subSuite.addTest(test);

      runner.run(function (failureCount) {
        failureCount.should.equal(0);
        mochaReporter.stats.pending.should.equal(1);
        mochaReporter.stats.pendingPercent.should.equal(100);
        done();
      });
    });

    it('should have a mix of tests', function (done) {
      var error = { expected: 'foo', actual: 'bar' };
      var passTest1 = makeTest('pass1', function () {});
      var passTest2 = makeTest('pass2', function () {});
      var passTest3 = makeTest('pass3', function () {});
      var failTest = makeTest('failing test', function (tDone) {
        return tDone(new Assert(error));
      });
      [passTest1, passTest2, passTest3, failTest].forEach(function (test) {
        return subSuite.addTest(test);
      });

      runner.run(function (failureCount) {
        mochaReporter.stats.passes.should.equal(3);
        mochaReporter.stats.failures.should.equal(1);
        mochaReporter.stats.passPercent.should.equal(75);
        done();
      });
    });

    it('should handle empty suite', function (done) {
      runner.run(function (failureCount) {
        failureCount.should.equal(0);
        done();
      });
    });

    it('should handle suite with file', function (done) {
      var test = makeTest('test', function () {});
      subSuite.addTest(test);
      subSuite.file = 'testfile.js';
      runner.run(function (failureCount) {
        mochaReporter.output.results[0].suites[0].fullFile.should.equal('testfile.js');
        done();
      });
    });
  });

  describe('Hook Handling', function () {
    function passingHookTest(hookType, isBefore) {
      it(hookType + " passing hook", function (done) {
        var test = makeTest('passing test', function () {});
        subSuite[hookType](hookType + " passing hook", function () {});
        subSuite.addTest(test);
        runner.run(function (failureCount) {
          var testSuite = mochaReporter.output.results[0].suites[0];
          var beforeHooks = testSuite.beforeHooks,
              afterHooks = testSuite.afterHooks;

          afterHooks.length.should.equal(isBefore ? 0 : 1);
          beforeHooks.length.should.equal(isBefore ? 1 : 0);
          done();
        });
      });
    }

    function failingHookTest(hookType, isBefore) {
      it(hookType + " failing hook", function (done) {
        var test = makeTest('passing test', function () {});
        subSuite[hookType](hookType + " failing hook", function () {
          throw new Error('Dummy hook error');
        });
        subSuite.addTest(test);
        runner.run(function (failureCount) {
          var testSuite = mochaReporter.output.results[0].suites[0];
          var beforeHooks = testSuite.beforeHooks,
              afterHooks = testSuite.afterHooks;

          afterHooks.length.should.equal(isBefore ? 0 : 1);
          beforeHooks.length.should.equal(isBefore ? 1 : 0);
          done();
        });
      });
    }

    ['beforeAll', 'beforeEach'].forEach(function (type) {
      passingHookTest(type, true);
      failingHookTest(type, true);
    });

    ['afterAll', 'afterEach'].forEach(function (type) {
      passingHookTest(type, false);
      failingHookTest(type, false);
    });
  });

  describe('Options Handling', function () {
    var makeReporter = function makeReporter(opts) {
      return new mocha._reporter(runner, opts);
    };
    var expected = function expected(opts) {
      return _extends({}, baseConfig, opts);
    };

    beforeEach(function () {
      subSuite.addTest(makeTest('test', function () {}));
    });

    describe('environment variables', function () {
      beforeEach(function () {
        process.env.MOCHAWESOME_REPORTFILENAME = 'test';
        mochaReporter = makeReporter({});
      });

      afterEach(function () {
        delete process.env.MOCHAWESOME_REPORTFILENAME;
      });

      it('should apply reporter options via environment variables', function (done) {
        runner.run(function (failureCount) {
          mochaReporter.config.should.deepEqual(expected({
            reportFilename: 'test'
          }));
          done();
        });
      });
    });

    describe('options object', function () {
      beforeEach(function () {
        process.env.MOCHAWESOME_QUIET = 'false';
        mochaReporter = makeReporter({
          reporterOptions: {
            reportFilename: 'testReportFilename',
            json: 'false',
            margeSpecificOption: 'something'
          }
        });
      });

      it('should apply reporter options via passed in object', function (done) {
        runner.run(function (failureCount) {
          mochaReporter.config.should.deepEqual(expected({
            reportFilename: 'testReportFilename',
            saveJson: false
          }));
          done();
        });
      });
    });

    describe('mocha options', function () {
      beforeEach(function () {
        mochaReporter = makeReporter({ useInlineDiffs: true });
      });

      it('should transfer mocha options', function (done) {
        runner.run(function (failureCount) {
          mochaReporter.config.should.deepEqual(expected({
            useInlineDiffs: true
          }));
          done();
        });
      });
    });

    describe('console reporter', function () {
      it('should default to spec console reporter', function (done) {
        specStub.reset();
        mochaReporter = makeReporter({
          reporterOptions: {
            consoleReporter: 'unknown'
          }
        });
        runner.run(function (failureCount) {
          specStub.called.should.equal(true);
          mochaReporter.config.should.deepEqual(expected({
            consoleReporter: 'unknown'
          }));
          done();
        });
      });

      it('should allow overriding the console reporter', function (done) {
        nyanStub.reset();
        mochaReporter = makeReporter({
          reporterOptions: {
            consoleReporter: 'nyan'
          }
        });
        runner.run(function (failureCount) {
          nyanStub.called.should.equal(true);
          mochaReporter.config.should.deepEqual(expected({
            consoleReporter: 'nyan'
          }));
          done();
        });
      });

      it('should disable the console reporter with the none reporter', function (done) {
        specStub.reset();
        mochaReporter = makeReporter({
          reporterOptions: {
            consoleReporter: 'none'
          }
        });
        runner.run(function (failureCount) {
          specStub.called.should.equal(false);
          mochaReporter.config.should.deepEqual(expected({
            consoleReporter: 'none'
          }));
          done();
        });
      });
    });
  });

  describe('Reporter Done Function', function () {
    var mochaExitFn = void 0;

    beforeEach(function () {
      subSuite.addTest(makeTest('test', function () {}));
      mochaExitFn = _sinon2.default.spy();
      logStub.reset();
      reportStub.reset();
      mochaReporter = new mocha._reporter(runner, {
        reporterOptions: {
          reportDir: 'testDir',
          inlineAssets: true,
          quiet: true
        }
      });
    });

    it('should not have an unhandled error', function () {
      reportStub.returns(Promise.resolve({}));

      return mochaReporter.done(0).then(function () {
        mochaExitFn.called.should.equal(false);
        logStub.neverCalledWith('error').should.equal(true);
      });
    });

    it('should log message when no files generated', function () {
      reportStub.resolves([]);

      return mochaReporter.done(0, mochaExitFn).then(function () {
        mochaExitFn.args[0][0].should.equal(0);
        logStub.args[0][0].should.equal('No files were generated');
      });
    });

    it('should log message when only html file generated', function () {
      reportStub.resolves(['html', null]);

      return mochaReporter.done(0, mochaExitFn).then(function () {
        mochaExitFn.args[0][0].should.equal(0);
        logStub.callCount.should.equal(1);
        logStub.args[0][0].should.equal('Report HTML saved to html');
      });
    });

    it('should log message when only json file generated', function () {
      reportStub.resolves([null, 'json']);

      return mochaReporter.done(0, mochaExitFn).then(function () {
        mochaExitFn.args[0][0].should.equal(0);
        logStub.callCount.should.equal(1);
        logStub.args[0][0].should.equal('Report JSON saved to json');
      });
    });

    it('should log message when html and json files generated', function () {
      reportStub.resolves(['html', 'json']);

      return mochaReporter.done(0, mochaExitFn).then(function () {
        mochaExitFn.args[0][0].should.equal(0);
        logStub.callCount.should.equal(2);
      });
    });

    it('should pass reporterOptions to the report generator', function () {
      reportStub.resolves([]);

      return mochaReporter.done(0, mochaExitFn).then(function () {
        reportStub.args[0][1].should.deepEqual({
          reportDir: 'testDir',
          inlineAssets: true,
          quiet: true,
          reportFilename: 'mochawesome',
          saveHtml: true,
          saveJson: true
        });
      });
    });

    it('should log an error when report creation fails', function () {
      reportStub.rejects({ message: 'report creation failed' });

      return mochaReporter.done(0, mochaExitFn).then(function () {
        mochaExitFn.called.should.equal(true);
        mochaExitFn.args[0][0].should.equal(0);
        logStub.called.should.equal(true);
        logStub.args[0][1].should.equal('error');
      });
    });

    it('should not log when quiet option is true', function () {
      reportStub.resolves([]);

      return mochaReporter.done(0, mochaExitFn).then(function () {
        mochaExitFn.args[0][0].should.equal(0);
        logStub.args[0][2].should.have.property('quiet', true);
      });
    });
  });
});
