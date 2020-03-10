import isObject from "lodash.isobject";
import isEmpty from "lodash.isempty";
import chalk from "chalk";
import stringify from "json-stringify-safe";

const errorPrefix = 'Error adding context:';
const ERRORS = {
  INVALID_ARGS: `${errorPrefix} Invalid arguments.`,
  INVALID_TEST: `${errorPrefix} Invalid test object.`,
  INVALID_CONTEXT: ctx => {
    const expected = 'Expected a string or an object of shape { title: string, value: any } but saw:';
    return `${errorPrefix} ${expected}\n${stringify(ctx, (key, val) => (val === undefined ? 'undefined' : val), 2)}`;
  }
};

/**
 * HELPER FUNCTIONS
 */

/* istanbul ignore next */
function log(msg, level) {
  const logMethod = console[level] || console.log;
  let out = msg;
  if (typeof msg === 'object') {
    out = stringify(msg, null, 2);
  }
  logMethod(`[${chalk.gray('mochawesome')}] ${out}\n`);
}

function _isValidContext(ctx) {
  /*
   * Context is valid if any of the following are true:
   * 1. Type is string and it is not empty
   * 2. Type is object and it has properties `title` and `value` and `title` is not empty
   */
  if (!ctx) return false;
  return ((typeof ctx === 'string') && !isEmpty(ctx))
    || (Object.hasOwnProperty.call(ctx, 'title') && !isEmpty(ctx.title) && Object.hasOwnProperty.call(ctx, 'value'));
}

const addContext = function (...args) {
  // Check args to see if we should bother continuing
  if ((args.length !== 2) || !isObject(args[0])) {
    log(ERRORS.INVALID_ARGS, 'error');
    return;
  }

  const ctx = args[1];

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
  const currentTest = args[0].currentTest;
  const activeTest = args[0].test;

  /* For `before` and `after`, add the context to the hook,
   * otherwise add it to the actual test.
   */
  const isEachHook = currentTest
    && /^"(?:before|after)\seach"/.test(activeTest.title);
  const test = isEachHook ? currentTest : activeTest;

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
    test.context = [ test.context ];
    test.context.push(ctx);
  }
};

let exported_addContext = addContext;
export { exported_addContext as addContext };
