const assert = require('assert');
const test = require('node:test');
const yieldToMain = require('../dist/yieldToMain.cjs');

test('CommonJS require', async () => {
  assert.strictEqual(typeof yieldToMain, 'function', 'yieldToMain should be a function');
  assert(yieldToMain() instanceof Promise, 'yieldToMain() should return a Promise');
}); 