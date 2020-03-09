"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addContext = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _lodash = require("lodash.isobject");

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require("lodash.isempty");

var _lodash4 = _interopRequireDefault(_lodash3);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _jsonStringifySafe = require("json-stringify-safe");

var _jsonStringifySafe2 = _interopRequireDefault(_jsonStringifySafe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var errorPrefix = 'Error adding context:';
var ERRORS = {
  INVALID_ARGS: errorPrefix + " Invalid arguments.",
  INVALID_TEST: errorPrefix + " Invalid test object.",
  INVALID_CONTEXT: function INVALID_CONTEXT(ctx) {
    var expected = 'Expected a string or an object of shape { title: string, value: any } but saw:';
    return errorPrefix + " " + expected + "\n" + (0, _jsonStringifySafe2.default)(ctx, function (key, val) {
      return val === undefined ? 'undefined' : val;
    }, 2);
  }
};

/**
 * HELPER FUNCTIONS
 */

/* istanbul ignore next */
function log(msg, level) {
  var logMethod = console[level] || console.log;
  var out = msg;
  if ((typeof msg === "undefined" ? "undefined" : _typeof(msg)) === 'object') {
    out = (0, _jsonStringifySafe2.default)(msg, null, 2);
  }
  logMethod("[" + _chalk2.default.gray('mochawesome') + "] " + out + "\n");
}

function _isValidContext(ctx) {
  /*
   * Context is valid if any of the following are true:
   * 1. Type is string and it is not empty
   * 2. Type is object and it has properties `title` and `value` and `title` is not empty
   */
  if (!ctx) return false;
  return typeof ctx === 'string' && !(0, _lodash4.default)(ctx) || Object.hasOwnProperty.call(ctx, 'title') && !(0, _lodash4.default)(ctx.title) && Object.hasOwnProperty.call(ctx, 'value');
}

var addContext = function addContext() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  // Check args to see if we should bother continuing
  if (args.length !== 2 || !(0, _lodash2.default)(args[0])) {
    log(ERRORS.INVALID_ARGS, 'error');
    return;
  }

  var ctx = args[1];

  // Ensure that context meets the requirements
  if (!_isValidContext(ctx)) {
    log(ERRORS.INVALID_CONTEXT(ctx), 'error');
    return;
  }

  /* Context is valid, now get the test object
   * If `addContext` is called from inside a hook the test object
   * will be `.currentTest`, and the hook will be `.test`.
   * Otherwise the test is just `.test` and `.currentTest` is undefined.
   */
  var currentTest = args[0].currentTest;
  var activeTest = args[0].test;

  /* For `before` and `after`, add the context to the hook,
   * otherwise add it to the actual test.
   */
  var isEachHook = currentTest && /^"(?:before|after)\seach"/.test(activeTest.title);
  var test = isEachHook ? currentTest : activeTest;

  if (!test) {
    log(ERRORS.INVALID_TEST, 'error');
    return;
  }

  /* If context is an object, and value is `undefined`
   * change it to 'undefined' so it can be displayed
   * correctly in the report
   */
  if (ctx.title && ctx.value === undefined) {
    ctx.value = 'undefined';
  }

  // Test doesn't already have context -> set it
  if (!test.context) {
    test.context = ctx;
  } else if (Array.isArray(test.context)) {
    // Test has context and context is an array -> push new context
    test.context.push(ctx);
  } else {
    // Test has context and it is not an array -> make it an array, then push new context
    test.context = [test.context];
    test.context.push(ctx);
  }
};

var exported_addContext = addContext;
exports.addContext = exported_addContext;
