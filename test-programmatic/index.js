"use strict";

var _mocha = require("mocha");

var _mocha2 = _interopRequireDefault(_mocha);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

require("should");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Instantiate a Mocha instance.
var mocha = new _mocha2.default({
  reporter: _path2.default.resolve(__dirname, '../src/mochawesome'),
  reporterOptions: {
    reportFilename: 'adam',
    timestamp: 'dd yyyy'
  }
});

var testDir = _path2.default.resolve(__dirname, '../test-functional');

// Add each .js file to the mocha instance
_fs2.default.readdirSync(testDir)
// .filter(file => file.substr(-3) === '.js')
.filter(function (file) {
  return file === 'test.js';
}).forEach(function (file) {
  return mocha.addFile(_path2.default.join(testDir, file));
});

// Run the tests.
mocha.run(function (failures) {
  process.on('exit', function () {
    process.exit(failures); // exit with non-zero status if there were failures
  });
});
