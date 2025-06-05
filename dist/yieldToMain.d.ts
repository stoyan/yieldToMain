export default yieldToMain;
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
declare function yieldToMain(): Promise<void>;
