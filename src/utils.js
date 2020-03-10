"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.utilsjs = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _lodash = require("lodash.isstring");

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require("lodash.isfunction");

var _lodash4 = _interopRequireDefault(_lodash3);

var _lodash5 = require("lodash.isempty");

var _lodash6 = _interopRequireDefault(_lodash5);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _uuid = require("uuid");

var _uuid2 = _interopRequireDefault(_uuid);

var _utils = require("mocha/lib/utils");

var _utils2 = _interopRequireDefault(_utils);

var _jsonStringifySafe = require("json-stringify-safe");

var _jsonStringifySafe2 = _interopRequireDefault(_jsonStringifySafe);

var _diff = require("diff");

var _diff2 = _interopRequireDefault(_diff);

var _stripAnsi = require("strip-ansi");

var _stripAnsi2 = _interopRequireDefault(_stripAnsi);

var _stripFnStart = require("./stripFnStart");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Return a classname based on percentage
 *
 * @param {String} msg - message to log
 * @param {String} level - log level [log, info, warn, error]
 * @param {Object} config - configuration object
 */
function log(msg, level, config) {
  // Don't log messages in quiet mode
  if (config && config.quiet) return;
  var logMethod = console[level] || console.log;
  var out = msg;
  if ((typeof msg === "undefined" ? "undefined" : _typeof(msg)) === 'object') {
    out = (0, _jsonStringifySafe2.default)(msg, null, 2);
  }
  logMethod("[" + _chalk2.default.gray('mochawesome') + "] " + out + "\n");
}

/**
 * Strip the function definition from `str`,
 * and re-indent for pre whitespace.
 *
 * @param {String} str - code in
 *
 * @return {String} cleaned code string
 */
function cleanCode(str) {
  str = str.replace(/\r\n|[\r\n\u2028\u2029]/g, '\n') // unify linebreaks
  .replace(/^\uFEFF/, ''); // replace zero-width no-break space

  str = (0, _stripFnStart.stripFunctionStart)(str) // replace function declaration
  .replace(/\)\s*\)\s*$/, ')') // replace closing paren
  .replace(/\s*};?\s*$/, ''); // replace closing bracket

  // Preserve indentation by finding leading tabs/spaces
  // and removing that amount of space from each line
  var spaces = str.match(/^\n?( *)/)[1].length;
  var tabs = str.match(/^\n?(\t*)/)[1].length;
  /* istanbul ignore next */
  var indentRegex = new RegExp("^\n?" + (tabs ? '\t' : ' ') + "{" + (tabs || spaces) + "}", 'gm');

  str = str.replace(indentRegex, '').trim();
  return str;
}

/**
 * Create a unified diff between two strings
 *
 * @param {Error}  err          Error object
 * @param {string} err.actual   Actual result returned
 * @param {string} err.expected Result expected
 *
 * @return {string} diff
 */
function createUnifiedDiff(_ref) {
  var actual = _ref.actual,
      expected = _ref.expected;

  return _diff2.default.createPatch('string', actual, expected).split('\n').splice(4).map(function (line) {
    if (line.match(/@@/)) {
      return null;
    }
    if (line.match(/\\ No newline/)) {
      return null;
    }
    return line.replace(/^(-|\+)/, '$1 ');
  }).filter(function (line) {
    return typeof line !== 'undefined' && line !== null;
  }).join('\n');
}

/**
 * Create an inline diff between two strings
 *
 * @param {Error}  err          Error object
 * @param {string} err.actual   Actual result returned
 * @param {string} err.expected Result expected
 *
 * @return {array} diff string objects
 */
function createInlineDiff(_ref2) {
  var actual = _ref2.actual,
      expected = _ref2.expected;

  return _diff2.default.diffWordsWithSpace(actual, expected);
}

/**
 * Return a normalized error object
 *
 * @param {Error} err Error object
 *
 * @return {Object} normalized error
 */
function normalizeErr(err, config) {
  var name = err.name,
      message = err.message,
      actual = err.actual,
      expected = err.expected,
      stack = err.stack,
      showDiff = err.showDiff;

  var errMessage = void 0;
  var errDiff = void 0;

  /**
   * Check that a / b have the same type.
   */
  function sameType(a, b) {
    var objToString = Object.prototype.toString;
    return objToString.call(a) === objToString.call(b);
  }

  // Format actual/expected for creating diff
  if (showDiff !== false && sameType(actual, expected) && expected !== undefined) {
    /* istanbul ignore if */
    if (!((0, _lodash2.default)(actual) && (0, _lodash2.default)(expected))) {
      err.actual = _utils2.default.stringify(actual);
      err.expected = _utils2.default.stringify(expected);
    }
    errDiff = config.useInlineDiffs ? createInlineDiff(err) : createUnifiedDiff(err);
  }

  // Assertion libraries do not output consitent error objects so in order to
  // get a consistent message object we need to create it ourselves
  if (name && message) {
    errMessage = name + ": " + (0, _stripAnsi2.default)(message);
  } else if (stack) {
    errMessage = stack.replace(/\n.*/g, '');
  }

  return {
    message: errMessage,
    estack: stack && (0, _stripAnsi2.default)(stack),
    diff: errDiff
  };
}

/**
 * Return a plain-object representation of `test`
 * free of cyclic properties etc.
 *
 * @param {Object} test
 *
 * @return {Object} cleaned test
 */
function cleanTest(test, config) {
  var code = config.code ? test.body || '' : '';

  var fullTitle = (0, _lodash4.default)(test.fullTitle) ? (0, _stripAnsi2.default)(test.fullTitle()) : (0, _stripAnsi2.default)(test.title);

  var cleaned = {
    title: (0, _stripAnsi2.default)(test.title),
    fullTitle: fullTitle,
    timedOut: test.timedOut,
    duration: test.duration || 0,
    state: test.state,
    speed: test.speed,
    pass: test.state === 'passed',
    fail: test.state === 'failed',
    pending: test.pending,
    context: (0, _jsonStringifySafe2.default)(test.context, null, 2),
    code: code && cleanCode(code),
    err: test.err && normalizeErr(test.err, config) || {},
    uuid: test.uuid || /* istanbul ignore next: default */_uuid2.default.v4(),
    parentUUID: test.parent && test.parent.uuid,
    isHook: test.type === 'hook'
  };

  cleaned.skipped = !cleaned.pass && !cleaned.fail && !cleaned.pending && !cleaned.isHook;

  return cleaned;
}

/**
 * Return a plain-object representation of `suite` with additional properties for rendering.
 *
 * @param {Object} suite
 * @param {Object} totalTestsRegistered
 * @param {Integer} totalTestsRegistered.total
 *
 * @return {Object|boolean} cleaned suite or false if suite is empty
 */
function cleanSuite(suite, totalTestsRegistered, config) {
  var duration = 0;
  var passingTests = [];
  var failingTests = [];
  var pendingTests = [];
  var skippedTests = [];

  var beforeHooks = [].concat(suite._beforeAll, suite._beforeEach).map(function (test) {
    return cleanTest(test, config);
  });

  var afterHooks = [].concat(suite._afterAll, suite._afterEach).map(function (test) {
    return cleanTest(test, config);
  });

  var tests = suite.tests.map(function (test) {
    var cleanedTest = cleanTest(test, config);
    duration += test.duration || 0;
    if (cleanedTest.state === 'passed') passingTests.push(cleanedTest.uuid);
    if (cleanedTest.state === 'failed') failingTests.push(cleanedTest.uuid);
    if (cleanedTest.pending) pendingTests.push(cleanedTest.uuid);
    if (cleanedTest.skipped) skippedTests.push(cleanedTest.uuid);
    return cleanedTest;
  });

  totalTestsRegistered.total += tests.length;

  var cleaned = {
    uuid: suite.uuid || /* istanbul ignore next: default */_uuid2.default.v4(),
    title: (0, _stripAnsi2.default)(suite.title),
    fullFile: suite.file || '',
    file: suite.file ? suite.file.replace(process.cwd(), '') : '',
    beforeHooks: beforeHooks,
    afterHooks: afterHooks,
    tests: tests,
    suites: suite.suites,
    passes: passingTests,
    failures: failingTests,
    pending: pendingTests,
    skipped: skippedTests,
    duration: duration,
    root: suite.root,
    rootEmpty: suite.root && tests.length === 0,
    _timeout: suite._timeout
  };

  var isEmptySuite = (0, _lodash6.default)(cleaned.suites) && (0, _lodash6.default)(cleaned.tests) && (0, _lodash6.default)(cleaned.beforeHooks) && (0, _lodash6.default)(cleaned.afterHooks);

  return !isEmptySuite && cleaned;
}

/**
 * Map over a suite, returning a cleaned suite object
 * and recursively cleaning any nested suites.
 *
 * @param {Object} suite          Suite to map over
 * @param {Object} totalTestsReg  Cumulative count of total tests registered
 * @param {Integer} totalTestsReg.total
 * @param {Object} config         Reporter configuration
 */
function mapSuites(suite, totalTestsReg, config) {
  var suites = suite.suites.reduce(function (acc, subSuite) {
    var mappedSuites = mapSuites(subSuite, totalTestsReg, config);
    if (mappedSuites) {
      acc.push(mappedSuites);
    }
    return acc;
  }, []);
  var toBeCleaned = _extends({}, suite, { suites: suites });
  return cleanSuite(toBeCleaned, totalTestsReg, config);
}

var utilsjs = {
  log: log,
  cleanCode: cleanCode,
  cleanTest: cleanTest,
  cleanSuite: cleanSuite,
  mapSuites: mapSuites
};

exports.utilsjs = utilsjs;
