'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var sampletestsjs = {
  passing: {
    raw: {
      title: 'passing test',
      fullTitle: function fullTitle() {
        return 'passing test';
      },
      body: 'function () {}',
      async: 0,
      sync: true,
      _timeout: 2000,
      _slow: 75,
      _enableTimeouts: true,
      timedOut: false,
      _trace: {},
      _retries: -1,
      _currentRetry: 0,
      pending: false,
      type: 'test',
      parent: {
        title: 'Mochawesome Suite',
        ctx: {},
        suites: [],
        tests: ['[Circular ~]'],
        pending: false,
        _beforeEach: [],
        _beforeAll: [],
        _afterEach: [],
        _afterAll: [],
        root: false,
        _timeout: 2000,
        _enableTimeouts: true,
        _slow: 75,
        _bail: false,
        _retries: -1,
        _onlyTests: [],
        _onlySuites: [],
        delayed: false,
        parent: {
          title: '',
          suites: ['[Circular ~.parent]'],
          tests: [],
          pending: [],
          root: true,
          _timeout: 2000,
          uuid: 'f8d58281-fc7a-4d75-8bc7-b1c32a5cd15e',
          fullFile: '',
          file: '',
          passes: [],
          failures: [],
          skipped: [],
          duration: 0,
          rootEmpty: true
        },
        uuid: 'a8a6bd0a-3e18-4aa3-ba36-f660e07ebed8'
      },
      ctx: {},
      uuid: '0e877e24-a28b-4869-bcb4-7c3529d84ef6',
      _events: {},
      _eventsCount: 1,
      duration: 0,
      state: 'passed',
      speed: 'fast'
    },
    cleaned: {
      title: 'passing test',
      fullTitle: 'passing test',
      timedOut: false,
      duration: 0,
      state: 'passed',
      speed: 'fast',
      pass: true,
      fail: false,
      pending: false,
      context: undefined,
      code: '',
      err: {},
      uuid: '0e877e24-a28b-4869-bcb4-7c3529d84ef6',
      parentUUID: 'a8a6bd0a-3e18-4aa3-ba36-f660e07ebed8',
      skipped: false,
      isHook: false
    }
  },
  failing: {
    raw: {
      title: 'failing test',
      body: 'function (tDone) {\n        return tDone(new Assert(error));\n      }',
      async: 1,
      sync: false,
      _timeout: 2000,
      _slow: 75,
      _enableTimeouts: true,
      timedOut: false,
      _trace: {},
      _retries: -1,
      _currentRetry: 0,
      pending: false,
      type: 'test',
      parent: {
        title: 'Mochawesome Suite',
        ctx: {},
        suites: [],
        tests: ['[Circular ~]'],
        pending: false,
        _beforeEach: [],
        _beforeAll: [],
        _afterEach: [],
        _afterAll: [],
        root: false,
        _timeout: 2000,
        _enableTimeouts: true,
        _slow: 75,
        _bail: false,
        _retries: -1,
        _onlyTests: [],
        _onlySuites: [],
        delayed: false,
        parent: {
          title: '',
          suites: ['[Circular ~.parent]'],
          tests: [],
          pending: [],
          root: true,
          _timeout: 2000,
          uuid: '27dabdab-e16a-4e91-bb8e-1e070734a661',
          fullFile: '',
          file: '',
          passes: [],
          failures: [],
          skipped: [],
          duration: 0,
          rootEmpty: true
        },
        uuid: '56508f44-b4e6-40f0-bae8-b15e0720f120'
      },
      ctx: {},
      uuid: '2bcbe88c-acd6-4a53-ba3a-61a59188d5b0',
      _events: {},
      _eventsCount: 1,
      timer: {
        0: null,
        _called: false,
        _idleTimeout: -1,
        _idlePrev: null,
        _idleNext: null,
        _idleStart: 2729,
        _onTimeout: null,
        _repeat: null
      },
      duration: 2,
      state: 'failed',
      err: {
        name: 'AssertionError',
        actual: '{\n  \"a\": 2\n}',
        expected: '{\n  \"a\": 1\n}',
        message: '{ a: 2 } undefined { a: 1 }',
        generatedMessage: true,
        stack: 'AssertionError: { a: 2 } undefined { a: 1 }'
      }
    },
    cleaned: {
      title: 'failing test',
      fullTitle: 'failing test',
      timedOut: false,
      duration: 2,
      state: 'failed',
      speed: undefined,
      pass: false,
      fail: true,
      pending: false,
      context: undefined,
      code: 'return tDone(new Assert(error));',
      err: {
        message: 'AssertionError: { a: 2 } undefined { a: 1 }',
        estack: 'AssertionError: { a: 2 } undefined { a: 1 }',
        diff: ' {\n-   \"a\": 2\n+   \"a\": 1\n }\n'
      },
      uuid: '2bcbe88c-acd6-4a53-ba3a-61a59188d5b0',
      parentUUID: '56508f44-b4e6-40f0-bae8-b15e0720f120',
      skipped: false,
      isHook: false
    },
    cleanedWithInlineDiff: {
      title: 'failing test',
      fullTitle: 'failing test',
      timedOut: false,
      duration: 2,
      state: 'failed',
      speed: undefined,
      pass: false,
      fail: true,
      pending: false,
      context: undefined,
      code: 'return tDone(new Assert(error));',
      err: {
        message: 'AssertionError: { a: 2 } undefined { a: 1 }',
        estack: 'AssertionError: { a: 2 } undefined { a: 1 }',
        diff: [{ count: 7, value: '{\n  "a": ' }, { count: 1, added: undefined, removed: true, value: '2' }, { count: 1, added: true, removed: undefined, value: '1' }, { count: 2, value: '\n}' }]
      },
      uuid: '2bcbe88c-acd6-4a53-ba3a-61a59188d5b0',
      parentUUID: '56508f44-b4e6-40f0-bae8-b15e0720f120',
      skipped: false,
      isHook: false
    }
  },
  pending: {
    raw: {
      title: 'pending test',
      body: '',
      sync: true,
      _timeout: 2000,
      _slow: 75,
      _enableTimeouts: true,
      timedOut: false,
      _trace: {},
      _retries: -1,
      _currentRetry: 0,
      pending: true,
      type: 'test',
      parent: {
        title: 'Mochawesome Suite',
        ctx: {},
        suites: [],
        tests: ['[Circular ~]'],
        pending: false,
        _beforeEach: [],
        _beforeAll: [],
        _afterEach: [],
        _afterAll: [],
        root: false,
        _timeout: 2000,
        _enableTimeouts: true,
        _slow: 75,
        _bail: false,
        _retries: -1,
        _onlyTests: [],
        _onlySuites: [],
        delayed: false,
        parent: {
          title: '',
          suites: ['[Circular ~.parent]'],
          tests: [],
          pending: [],
          root: true,
          _timeout: 2000,
          uuid: '875747c6-96e7-44a7-a4ad-921bddd1746d',
          fullFile: '',
          file: '',
          passes: [],
          failures: [],
          skipped: [],
          duration: 0,
          rootEmpty: true
        },
        uuid: '88d24c3c-9262-4f6f-9419-a9fe259e3c95'
      },
      ctx: {},
      uuid: '6e8e6fe4-b2a1-4cdf-8f94-099f98b5b472'
    },
    cleaned: {
      title: 'pending test',
      fullTitle: 'pending test',
      timedOut: false,
      duration: 0,
      state: undefined,
      speed: undefined,
      pass: false,
      fail: false,
      pending: true,
      context: undefined,
      code: '',
      err: {},
      uuid: '6e8e6fe4-b2a1-4cdf-8f94-099f98b5b472',
      parentUUID: '88d24c3c-9262-4f6f-9419-a9fe259e3c95',
      skipped: false,
      isHook: false
    }
  },
  hook: {
    raw: {
      title: '\"before each\" hook: failing beforeEach hook for \"passing test\"',
      body: 'function () {\n      console.log(a); // eslint-disable-line\n    }',
      async: 0,
      sync: true,
      _timeout: 2000,
      _slow: 75,
      _enableTimeouts: true,
      timedOut: false,
      _trace: {},
      _retries: -1,
      _currentRetry: 0,
      pending: false,
      type: 'hook',
      parent: {
        title: 'Test Suite - Failed Before Each',
        ctx: {
          currentTest: {
            title: 'passing test',
            body: 'function (done) {\n      (1 1).should.equal(2);\n      done();\n    }',
            async: 1,
            sync: false,
            _timeout: 2000,
            _slow: 75,
            _enableTimeouts: true,
            timedOut: false,
            _trace: {},
            _retries: -1,
            _currentRetry: 0,
            pending: false,
            type: 'test',
            file: '/Users/adamg/Sites/mafork/test-functional/test-hooks.js',
            parent: '[Circular ~.parent]',
            ctx: '[Circular ~.parent.ctx]',
            uuid: 'fde7ab64-61b9-4c6d-b893-6f013a6317db'
          },
          _runnable: '[Circular ~]',
          test: '[Circular ~]'
        },
        suites: [],
        tests: [{
          title: 'passing test',
          body: 'function (done) {\n      (1 1).should.equal(2);\n      done();\n    }',
          async: 1,
          sync: false,
          _timeout: 2000,
          _slow: 75,
          _enableTimeouts: true,
          timedOut: false,
          _trace: {},
          _retries: -1,
          _currentRetry: 0,
          pending: false,
          type: 'test',
          file: '/Users/adamg/Sites/mafork/test-functional/test-hooks.js',
          parent: '[Circular ~.parent]',
          ctx: {
            currentTest: '[Circular ~.parent.tests.0]',
            _runnable: '[Circular ~]',
            test: '[Circular ~]'
          },
          uuid: 'fde7ab64-61b9-4c6d-b893-6f013a6317db'
        }],
        pending: false,
        _beforeEach: ['[Circular ~]'],
        _beforeAll: [],
        _afterEach: [],
        _afterAll: [],
        root: false,
        _timeout: 2000,
        _enableTimeouts: true,
        _slow: 75,
        _retries: -1,
        _onlyTests: [],
        _onlySuites: [],
        delayed: false,
        parent: {
          title: 'Hooks',
          suites: ['[Circular ~.parent]'],
          tests: [],
          pending: [],
          root: false,
          _timeout: 2000,
          file: '/test-functional/test-hooks.js',
          uuid: '93a639a5-429e-44a0-854c-6758408fca62',
          beforeHooks: [],
          afterHooks: [],
          fullFile: '/Users/adamg/Sites/mafork/test-functional/test-hooks.js',
          passes: [],
          failures: [],
          skipped: [],
          duration: 0,
          rootEmpty: false
        },
        file: '/Users/adamg/Sites/mafork/test-functional/test-hooks.js',
        uuid: '3303effe-2b74-4156-a141-6cf51324e8f5'
      },
      ctx: {
        currentTest: {
          title: 'passing test',
          body: 'function (done) {\n      (1 1).should.equal(2);\n      done();\n    }',
          async: 1,
          sync: false,
          _timeout: 2000,
          _slow: 75,
          _enableTimeouts: true,
          timedOut: false,
          _trace: {},
          _retries: -1,
          _currentRetry: 0,
          pending: false,
          type: 'test',
          file: '/Users/adamg/Sites/mafork/test-functional/test-hooks.js',
          parent: {
            title: 'Test Suite - Failed Before Each',
            ctx: '[Circular ~.ctx]',
            suites: [],
            tests: ['[Circular ~.ctx.currentTest]'],
            pending: false,
            _beforeEach: ['[Circular ~]'],
            _beforeAll: [],
            _afterEach: [],
            _afterAll: [],
            root: false,
            _timeout: 2000,
            _enableTimeouts: true,
            _slow: 75,
            _retries: -1,
            _onlyTests: [],
            _onlySuites: [],
            delayed: false,
            parent: {
              title: 'Hooks',
              suites: ['[Circular ~.ctx.currentTest.parent]'],
              tests: [],
              pending: [],
              root: false,
              _timeout: 2000,
              file: '/test-functional/test-hooks.js',
              uuid: '93a639a5-429e-44a0-854c-6758408fca62',
              beforeHooks: [],
              afterHooks: [],
              fullFile: '/Users/adamg/Sites/mafork/test-functional/test-hooks.js',
              passes: [],
              failures: [],
              skipped: [],
              duration: 0,
              rootEmpty: false
            },
            file: '/Users/adamg/Sites/mafork/test-functional/test-hooks.js',
            uuid: '3303effe-2b74-4156-a141-6cf51324e8f5'
          },
          ctx: '[Circular ~.ctx]',
          uuid: 'fde7ab64-61b9-4c6d-b893-6f013a6317db'
        },
        _runnable: '[Circular ~]',
        test: '[Circular ~]'
      },
      uuid: '51933158-66a0-4b6c-bc04-65d7ce24804b',
      _events: {},
      _eventsCount: 1,
      duration: 0,
      _error: null,
      originalTitle: '\"before each\" hook: failing beforeEach hook',
      state: 'failed',
      err: {
        stack: 'ReferenceError: a is not defined\n    at Context.<anonymous> (test-functional/test-hooks.js:4:19)'
      }
    },
    cleaned: {
      title: '\"before each\" hook: failing beforeEach hook for \"passing test\"',
      fullTitle: '\"before each\" hook: failing beforeEach hook for \"passing test\"',
      timedOut: false,
      duration: 0,
      state: 'failed',
      speed: undefined,
      pass: false,
      fail: true,
      pending: false,
      context: undefined,
      code: 'console.log(a); // eslint-disable-line',
      err: {
        message: 'ReferenceError: a is not defined',
        diff: undefined,
        estack: 'ReferenceError: a is not defined\n    at Context.<anonymous> (test-functional/test-hooks.js:4:19)'
      },
      uuid: '51933158-66a0-4b6c-bc04-65d7ce24804b',
      parentUUID: '3303effe-2b74-4156-a141-6cf51324e8f5',
      isHook: true,
      skipped: false
    }
  }
};

var sampletestsjs_passing = {
  raw: {
    title: "passing test",
    fullTitle: function fullTitle() {
      return "passing test";
    },
    body: "function () {}",
    async: 0,
    sync: true,
    _timeout: 2000,
    _slow: 75,
    _enableTimeouts: true,
    timedOut: false,
    _trace: {},
    _retries: -1,
    _currentRetry: 0,
    pending: false,
    type: "test",

    parent: {
      title: "Mochawesome Suite",
      ctx: {},
      suites: [],
      tests: ["[Circular ~]"],
      pending: false,
      _beforeEach: [],
      _beforeAll: [],
      _afterEach: [],
      _afterAll: [],
      root: false,
      _timeout: 2000,
      _enableTimeouts: true,
      _slow: 75,
      _bail: false,
      _retries: -1,
      _onlyTests: [],
      _onlySuites: [],
      delayed: false,

      parent: {
        title: "",
        suites: ["[Circular ~.parent]"],
        tests: [],
        pending: [],
        root: true,
        _timeout: 2000,
        uuid: "f8d58281-fc7a-4d75-8bc7-b1c32a5cd15e",
        fullFile: "",
        file: "",
        passes: [],
        failures: [],
        skipped: [],
        duration: 0,
        rootEmpty: true
      },

      uuid: "a8a6bd0a-3e18-4aa3-ba36-f660e07ebed8"
    },

    ctx: {},
    uuid: "0e877e24-a28b-4869-bcb4-7c3529d84ef6",
    _events: {},
    _eventsCount: 1,
    duration: 0,
    state: "passed",
    speed: "fast"
  },

  cleaned: {
    title: "passing test",
    fullTitle: "passing test",
    timedOut: false,
    duration: 0,
    state: "passed",
    speed: "fast",
    pass: true,
    fail: false,
    pending: false,
    context: undefined,
    code: "",
    err: {},
    uuid: "0e877e24-a28b-4869-bcb4-7c3529d84ef6",
    parentUUID: "a8a6bd0a-3e18-4aa3-ba36-f660e07ebed8",
    skipped: false,
    isHook: false
  }
};

var sampletestsjs_failing = {
  raw: {
    title: "failing test",
    body: "function (tDone) {\n        return tDone(new Assert(error));\n      }",
    async: 1,
    sync: false,
    _timeout: 2000,
    _slow: 75,
    _enableTimeouts: true,
    timedOut: false,
    _trace: {},
    _retries: -1,
    _currentRetry: 0,
    pending: false,
    type: "test",

    parent: {
      title: "Mochawesome Suite",
      ctx: {},
      suites: [],
      tests: ["[Circular ~]"],
      pending: false,
      _beforeEach: [],
      _beforeAll: [],
      _afterEach: [],
      _afterAll: [],
      root: false,
      _timeout: 2000,
      _enableTimeouts: true,
      _slow: 75,
      _bail: false,
      _retries: -1,
      _onlyTests: [],
      _onlySuites: [],
      delayed: false,

      parent: {
        title: "",
        suites: ["[Circular ~.parent]"],
        tests: [],
        pending: [],
        root: true,
        _timeout: 2000,
        uuid: "27dabdab-e16a-4e91-bb8e-1e070734a661",
        fullFile: "",
        file: "",
        passes: [],
        failures: [],
        skipped: [],
        duration: 0,
        rootEmpty: true
      },

      uuid: "56508f44-b4e6-40f0-bae8-b15e0720f120"
    },

    ctx: {},
    uuid: "2bcbe88c-acd6-4a53-ba3a-61a59188d5b0",
    _events: {},
    _eventsCount: 1,

    timer: {
      0: null,
      _called: false,
      _idleTimeout: -1,
      _idlePrev: null,
      _idleNext: null,
      _idleStart: 2729,
      _onTimeout: null,
      _repeat: null
    },

    duration: 2,
    state: "failed",

    err: {
      name: "AssertionError",
      actual: "{\n  \"a\": 2\n}",
      expected: "{\n  \"a\": 1\n}",
      message: "{ a: 2 } undefined { a: 1 }",
      generatedMessage: true,
      stack: "AssertionError: { a: 2 } undefined { a: 1 }"
    }
  },

  cleaned: {
    title: "failing test",
    fullTitle: "failing test",
    timedOut: false,
    duration: 2,
    state: "failed",
    speed: undefined,
    pass: false,
    fail: true,
    pending: false,
    context: undefined,
    code: "return tDone(new Assert(error));",

    err: {
      message: "AssertionError: { a: 2 } undefined { a: 1 }",
      estack: "AssertionError: { a: 2 } undefined { a: 1 }",
      diff: " {\n-   \"a\": 2\n+   \"a\": 1\n }\n"
    },

    uuid: "2bcbe88c-acd6-4a53-ba3a-61a59188d5b0",
    parentUUID: "56508f44-b4e6-40f0-bae8-b15e0720f120",
    skipped: false,
    isHook: false
  },

  cleanedWithInlineDiff: {
    title: "failing test",
    fullTitle: "failing test",
    timedOut: false,
    duration: 2,
    state: "failed",
    speed: undefined,
    pass: false,
    fail: true,
    pending: false,
    context: undefined,
    code: "return tDone(new Assert(error));",

    err: {
      message: "AssertionError: { a: 2 } undefined { a: 1 }",
      estack: "AssertionError: { a: 2 } undefined { a: 1 }",

      diff: [{
        count: 7,
        value: "{\n  \"a\": "
      }, {
        count: 1,
        added: undefined,
        removed: true,
        value: "2"
      }, {
        count: 1,
        added: true,
        removed: undefined,
        value: "1"
      }, {
        count: 2,
        value: "\n}"
      }]
    },

    uuid: "2bcbe88c-acd6-4a53-ba3a-61a59188d5b0",
    parentUUID: "56508f44-b4e6-40f0-bae8-b15e0720f120",
    skipped: false,
    isHook: false
  }
};

var sampletestsjs_pending = {
  raw: {
    title: "pending test",
    body: "",
    sync: true,
    _timeout: 2000,
    _slow: 75,
    _enableTimeouts: true,
    timedOut: false,
    _trace: {},
    _retries: -1,
    _currentRetry: 0,
    pending: true,
    type: "test",

    parent: {
      title: "Mochawesome Suite",
      ctx: {},
      suites: [],
      tests: ["[Circular ~]"],
      pending: false,
      _beforeEach: [],
      _beforeAll: [],
      _afterEach: [],
      _afterAll: [],
      root: false,
      _timeout: 2000,
      _enableTimeouts: true,
      _slow: 75,
      _bail: false,
      _retries: -1,
      _onlyTests: [],
      _onlySuites: [],
      delayed: false,

      parent: {
        title: "",
        suites: ["[Circular ~.parent]"],
        tests: [],
        pending: [],
        root: true,
        _timeout: 2000,
        uuid: "875747c6-96e7-44a7-a4ad-921bddd1746d",
        fullFile: "",
        file: "",
        passes: [],
        failures: [],
        skipped: [],
        duration: 0,
        rootEmpty: true
      },

      uuid: "88d24c3c-9262-4f6f-9419-a9fe259e3c95"
    },

    ctx: {},
    uuid: "6e8e6fe4-b2a1-4cdf-8f94-099f98b5b472"
  },

  cleaned: {
    title: "pending test",
    fullTitle: "pending test",
    timedOut: false,
    duration: 0,
    state: undefined,
    speed: undefined,
    pass: false,
    fail: false,
    pending: true,
    context: undefined,
    code: "",
    err: {},
    uuid: "6e8e6fe4-b2a1-4cdf-8f94-099f98b5b472",
    parentUUID: "88d24c3c-9262-4f6f-9419-a9fe259e3c95",
    skipped: false,
    isHook: false
  }
};

var sampletestsjs_hook = {
  raw: {
    title: "\"before each\" hook: failing beforeEach hook for \"passing test\"",
    body: "function () {\n      console.log(a); // eslint-disable-line\n    }",
    async: 0,
    sync: true,
    _timeout: 2000,
    _slow: 75,
    _enableTimeouts: true,
    timedOut: false,
    _trace: {},
    _retries: -1,
    _currentRetry: 0,
    pending: false,
    type: "hook",

    parent: {
      title: "Test Suite - Failed Before Each",

      ctx: {
        currentTest: {
          title: "passing test",
          body: "function (done) {\n      (1 1).should.equal(2);\n      done();\n    }",
          async: 1,
          sync: false,
          _timeout: 2000,
          _slow: 75,
          _enableTimeouts: true,
          timedOut: false,
          _trace: {},
          _retries: -1,
          _currentRetry: 0,
          pending: false,
          type: "test",
          file: "/Users/adamg/Sites/mafork/test-functional/test-hooks.js",
          parent: "[Circular ~.parent]",
          ctx: "[Circular ~.parent.ctx]",
          uuid: "fde7ab64-61b9-4c6d-b893-6f013a6317db"
        },

        _runnable: "[Circular ~]",
        test: "[Circular ~]"
      },

      suites: [],

      tests: [{
        title: "passing test",
        body: "function (done) {\n      (1 1).should.equal(2);\n      done();\n    }",
        async: 1,
        sync: false,
        _timeout: 2000,
        _slow: 75,
        _enableTimeouts: true,
        timedOut: false,
        _trace: {},
        _retries: -1,
        _currentRetry: 0,
        pending: false,
        type: "test",
        file: "/Users/adamg/Sites/mafork/test-functional/test-hooks.js",
        parent: "[Circular ~.parent]",

        ctx: {
          currentTest: "[Circular ~.parent.tests.0]",
          _runnable: "[Circular ~]",
          test: "[Circular ~]"
        },

        uuid: "fde7ab64-61b9-4c6d-b893-6f013a6317db"
      }],

      pending: false,
      _beforeEach: ["[Circular ~]"],
      _beforeAll: [],
      _afterEach: [],
      _afterAll: [],
      root: false,
      _timeout: 2000,
      _enableTimeouts: true,
      _slow: 75,
      _retries: -1,
      _onlyTests: [],
      _onlySuites: [],
      delayed: false,

      parent: {
        title: "Hooks",
        suites: ["[Circular ~.parent]"],
        tests: [],
        pending: [],
        root: false,
        _timeout: 2000,
        file: "/test-functional/test-hooks.js",
        uuid: "93a639a5-429e-44a0-854c-6758408fca62",
        beforeHooks: [],
        afterHooks: [],
        fullFile: "/Users/adamg/Sites/mafork/test-functional/test-hooks.js",
        passes: [],
        failures: [],
        skipped: [],
        duration: 0,
        rootEmpty: false
      },

      file: "/Users/adamg/Sites/mafork/test-functional/test-hooks.js",
      uuid: "3303effe-2b74-4156-a141-6cf51324e8f5"
    },

    ctx: {
      currentTest: {
        title: "passing test",
        body: "function (done) {\n      (1 1).should.equal(2);\n      done();\n    }",
        async: 1,
        sync: false,
        _timeout: 2000,
        _slow: 75,
        _enableTimeouts: true,
        timedOut: false,
        _trace: {},
        _retries: -1,
        _currentRetry: 0,
        pending: false,
        type: "test",
        file: "/Users/adamg/Sites/mafork/test-functional/test-hooks.js",

        parent: {
          title: "Test Suite - Failed Before Each",
          ctx: "[Circular ~.ctx]",
          suites: [],
          tests: ["[Circular ~.ctx.currentTest]"],
          pending: false,
          _beforeEach: ["[Circular ~]"],
          _beforeAll: [],
          _afterEach: [],
          _afterAll: [],
          root: false,
          _timeout: 2000,
          _enableTimeouts: true,
          _slow: 75,
          _retries: -1,
          _onlyTests: [],
          _onlySuites: [],
          delayed: false,

          parent: {
            title: "Hooks",
            suites: ["[Circular ~.ctx.currentTest.parent]"],
            tests: [],
            pending: [],
            root: false,
            _timeout: 2000,
            file: "/test-functional/test-hooks.js",
            uuid: "93a639a5-429e-44a0-854c-6758408fca62",
            beforeHooks: [],
            afterHooks: [],
            fullFile: "/Users/adamg/Sites/mafork/test-functional/test-hooks.js",
            passes: [],
            failures: [],
            skipped: [],
            duration: 0,
            rootEmpty: false
          },

          file: "/Users/adamg/Sites/mafork/test-functional/test-hooks.js",
          uuid: "3303effe-2b74-4156-a141-6cf51324e8f5"
        },

        ctx: "[Circular ~.ctx]",
        uuid: "fde7ab64-61b9-4c6d-b893-6f013a6317db"
      },

      _runnable: "[Circular ~]",
      test: "[Circular ~]"
    },

    uuid: "51933158-66a0-4b6c-bc04-65d7ce24804b",
    _events: {},
    _eventsCount: 1,
    duration: 0,
    _error: null,
    originalTitle: "\"before each\" hook: failing beforeEach hook",
    state: "failed",

    err: {
      stack: "ReferenceError: a is not defined\n    at Context.<anonymous> (test-functional/test-hooks.js:4:19)"
    }
  },

  cleaned: {
    title: "\"before each\" hook: failing beforeEach hook for \"passing test\"",
    fullTitle: "\"before each\" hook: failing beforeEach hook for \"passing test\"",
    timedOut: false,
    duration: 0,
    state: "failed",
    speed: undefined,
    pass: false,
    fail: true,
    pending: false,
    context: undefined,
    code: "console.log(a); // eslint-disable-line",

    err: {
      message: "ReferenceError: a is not defined",
      diff: undefined,
      estack: "ReferenceError: a is not defined\n    at Context.<anonymous> (test-functional/test-hooks.js:4:19)"
    },

    uuid: "51933158-66a0-4b6c-bc04-65d7ce24804b",
    parentUUID: "3303effe-2b74-4156-a141-6cf51324e8f5",
    isHook: true,
    skipped: false
  }
};

exports.passing = sampletestsjs_passing;
exports.failing = sampletestsjs_failing;
exports.pending = sampletestsjs_pending;
exports.hook = sampletestsjs_hook;
