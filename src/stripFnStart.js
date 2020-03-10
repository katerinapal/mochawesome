'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function stripFunctionStart(input) {
  var BEGIN = 1;
  var LBRACE = 2;
  var EQ = 4;
  var ARROW = 8;
  var ARROW_LBRACE = 16;
  var ARROW_PAREN = 32;
  var DONE = 64;

  var isWhitespace = function isWhitespace(ch) {
    return ch === ' ' || ch === '\t' || ch === '\n';
  };

  var nextState = function nextState(state, c) {
    switch (state) {
      case BEGIN:
        switch (c) {
          case '{':
            return LBRACE;
          case '=':
            return EQ;
          default:
            return BEGIN;
        }

      case LBRACE:
        return c === ' ' ? LBRACE : DONE;

      case EQ:
        return c === '>' ? ARROW : BEGIN;

      case ARROW:
        if (isWhitespace(c)) return ARROW;
        switch (c) {
          case '{':
            return ARROW_LBRACE;
          case '(':
            return ARROW_PAREN;
          default:
            return DONE;
        }

      case ARROW_LBRACE:
      case ARROW_PAREN:
        return DONE;
    }
  };

  var state = BEGIN;
  var pos = 0;
  while (pos < input.length && state !== DONE) {
    state = nextState(state, input.charAt(pos));
    pos += 1;
  }
  return state === DONE ? input.slice(pos - 1) : input;
}

var exported_stripFunctionStart = stripFunctionStart;

/* eslint-disable consistent-return */
/**
 * Strip start of function
 *
 * @param {string} input
 *
 * @return {string}
 */
exports.stripFunctionStart = exported_stripFunctionStart;
