(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.yieldToMain = factory());
})(this, (function () { 'use strict';

  /**
   * Yields execution to the main thread, allowing other tasks to be processed.
   * Uses scheduler.yield() if available, falling back to setTimeout.
   *
   * @example
   * // Basic usage
   * await yieldToMain();
   *
   * @example
   * // Use in a loop to prevent blocking
   * async function processItems(items) {
   *   for (const item of items) {
   *     await yieldToMain();
   *     // Process item
   *   }
   * }
   *
   * @example
   * // Use with heavy computation
   * async function heavyTask() {
   *   for (let i = 0; i < 1000000; i++) {
   *     if (i % 1000 === 0) await yieldToMain();
   *     // Compute something
   *   }
   * }
   *
   * @returns {Promise<void>} A promise that resolves after yielding to the main thread
   */
  function yieldToMain() {
    // @ts-ignore
    const scheduler = globalThis.scheduler;
    if (scheduler && typeof scheduler.yield === 'function') {
      return scheduler.yield();
    }
    return new Promise((resolve) => {
      setTimeout(resolve, 0);
    });
  }

  return yieldToMain;

}));
//# sourceMappingURL=yieldToMain.umd.js.map
