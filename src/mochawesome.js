"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mochawesome = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _base = require("mocha/lib/reporters/base");

var _base2 = _interopRequireDefault(_base);

var _package = require("mocha/package.json");

var _package2 = _interopRequireDefault(_package);

var _uuid = require("uuid");

var _uuid2 = _interopRequireDefault(_uuid);

var _mochawesomeReportGenerator = require("mochawesome-report-generator");

var _mochawesomeReportGenerator2 = _interopRequireDefault(_mochawesomeReportGenerator);

var _package3 = require("mochawesome-report-generator/package.json");

var _package4 = _interopRequireDefault(_package3);

var _config = require("./config");

var _utils = require("./utils");

var _spec = require("mocha/lib/reporters/spec");

var _spec2 = _interopRequireDefault(_spec);

var _statsCollector = require("mocha/lib/stats-collector");

var _statsCollector2 = _interopRequireDefault(_statsCollector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pkg = require('../package.json');

// Import the utility functions
var log = _utils.utilsjs.log,
    mapSuites = _utils.utilsjs.mapSuites;

// Track the total number of tests registered

var totalTestsRegistered = { total: 0 };

/**
 * Done function gets called before mocha exits
 *
 * Creates and saves the report HTML and JSON files
 *
 * @param {Object} output    Final report object
 * @param {Object} options   Options to pass to report generator
 * @param {Object} config    Reporter config object
 * @param {Number} failures  Number of reported failures
 * @param {Function} exit
 *
 * @return {Promise} Resolves with successful report creation
 */
function done(output, options, config, failures, exit) {
  return _mochawesomeReportGenerator2.default.create(output, options).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        htmlFile = _ref2[0],
        jsonFile = _ref2[1];

    if (!htmlFile && !jsonFile) {
      log('No files were generated', 'warn', config);
    } else {
      jsonFile && log("Report JSON saved to " + jsonFile, null, config);
      htmlFile && log("Report HTML saved to " + htmlFile, null, config);
    }
  }).catch(function (err) {
    log(err, 'error', config);
  }).then(function () {
    exit && exit(failures > 0 ? 1 : 0);
  });
}

/**
 * Get the class of the configured console reporter. This reporter outputs
 * test results to the console while mocha is running, and before
 * mochawesome generates its own report.
 *
 * Defaults to 'spec'.
 *
 * @param {String} reporter   Name of reporter to use for console output
 *
 * @return {Object} Reporter class object
 */
function consoleReporter(reporter) {
  if (reporter) {
    try {
      // eslint-disable-next-line import/no-dynamic-require
      return require("mocha/lib/reporters/" + reporter);
    } catch (e) {
      log("Unknown console reporter '" + reporter + "', defaulting to spec");
    }
  }

  return {};
}

function Mochawesome(runner, options) {
  var _this = this;

  // Set the config options
  this.config = (0, _config.configjs)(options);

  // Ensure stats collector has been initialized
  if (!runner.stats) {
    var createStatsCollector = {};
    createStatsCollector(runner);
  }

  // Reporter options
  var reporterOptions = _extends({}, options.reporterOptions, {
    reportFilename: this.config.reportFilename,
    saveHtml: this.config.saveHtml,
    saveJson: this.config.saveJson
  });

  // Done function will be called before mocha exits
  // This is where we will save JSON and generate the HTML report
  this.done = function (failures, exit) {
    return done(_this.output, reporterOptions, _this.config, failures, exit);
  };

  // Reset total tests counter
  totalTestsRegistered.total = 0;

  // Call the Base mocha reporter
  _base2.default.call(this, runner);

  var reporterName = reporterOptions.consoleReporter;
  if (reporterName !== 'none') {
    var ConsoleReporter = consoleReporter(reporterName);
    new ConsoleReporter(runner); // eslint-disable-line
  }

  var endCalled = false;

  // Add a unique identifier to each suite/test/hook
  ['suite', 'test', 'hook', 'pending'].forEach(function (type) {
    runner.on(type, function (item) {
      item.uuid = _uuid2.default.v4();
    });
  });

  // Process the full suite
  runner.on('end', function () {
    try {
      /* istanbul ignore else */
      if (!endCalled) {
        // end gets called more than once for some reason
        // so we ensure the suite is processed only once
        endCalled = true;

        var rootSuite = mapSuites(_this.runner.suite, totalTestsRegistered, _this.config);

        var obj = {
          stats: _this.stats,
          results: [rootSuite],
          meta: {
            mocha: {
              version: _package2.default.version
            },
            mochawesome: {
              options: _this.config,
              version: pkg.version
            },
            marge: {
              options: options.reporterOptions,
              version: _package4.default.version
            }
          }
        };

        obj.stats.testsRegistered = totalTestsRegistered.total;

        var _obj$stats = obj.stats,
            passes = _obj$stats.passes,
            failures = _obj$stats.failures,
            pending = _obj$stats.pending,
            tests = _obj$stats.tests,
            testsRegistered = _obj$stats.testsRegistered;

        var passPercentage = passes / (testsRegistered - pending) * 100;
        var pendingPercentage = pending / testsRegistered * 100;

        obj.stats.passPercent = passPercentage;
        obj.stats.pendingPercent = pendingPercentage;
        obj.stats.other = passes + failures + pending - tests; // Failed hooks
        obj.stats.hasOther = obj.stats.other > 0;
        obj.stats.skipped = testsRegistered - tests;
        obj.stats.hasSkipped = obj.stats.skipped > 0;
        obj.stats.failures -= obj.stats.other;

        // Save the final output to be used in the done function
        _this.output = obj;
      }
    } catch (e) {
      // required because thrown errors are not handled directly in the
      // event emitter pattern and mocha does not have an "on error"
      /* istanbul ignore next */
      log("Problem with mochawesome: " + e.stack, 'error');
    }
  });
}

var exported_Mochawesome = Mochawesome;

/**
 * Initialize a new reporter.
 *
 * @param {Runner} runner
 * @api public
 */
exports.Mochawesome = exported_Mochawesome;
