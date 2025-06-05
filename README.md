# yieldToMain

A utility function to yield execution to the main thread in JavaScript, preventing UI blocking. Uses `scheduler.yield()` when available, falling back to `setTimeout`.

The gist is this:

```js
function yieldToMain() {
  const scheduler = globalThis.scheduler;
  if (scheduler && typeof scheduler.yield === 'function') {
    return scheduler.yield();
  }
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}
```

Feel free to copy and paste this into your codebase. Or continue with using it as a module etc., as described below.

## Installation

```bash
npm install yieldtomain
```

## Usage

The library can be used in a bunch o' JavaScript environments:

### ES Modules

```javascript
import yieldToMain from 'yieldtomain';

async function processItems(items) {
  for (const item of items) {
    await yieldToMain();
    // Process item
  }
}
```

### CommonJS

```javascript
const yieldToMain = require('yieldtomain');

async function heavyTask() {
  for (let i = 0; i < 1000000; i++) {
    if (i % 1000 === 0) await yieldToMain();
    // Compute something
  }
}
```

### Browser

```html
<script src="dist/yieldToMain.browser.js"></script>
<script>
  async function nonBlockingTask() {
    for (let i = 0; i < 1000000; i++) {
      if (i % 1000 === 0) await yieldToMain();
      // Heavy computation
    }
  }
</script>
```

## Demo

Check out the `examples/heavy.html` demo to see the difference between blocking and non-blocking computations. The demo includes:

- A counter animation to visualize thread blocking
- Pure computation examples (where "pure" means a JS loop without any DOM involvement)
- DOM access in addition to computations
- Multiple runs while reporting the median

A live version of the demo is [right here](https://www.phpied.com/files/yieldToMain/examples/heavy.html).

## Build Formats

The library is distributed in multiple formats:

- `dist/yieldToMain.esm.js` - ECMAScript Module
- `dist/yieldToMain.cjs.js` - CommonJS
- `dist/yieldToMain.browser.js` - Minified browser build with an IIFE that provides a global `yieldToMain()` function

All builds include source maps and TypeScript type definitions.

## API

```typescript
function yieldToMain(): Promise<void>;
```

The function returns a Promise that resolves after yielding execution to the main thread. It uses:

1. `scheduler.yield()` if available
2. `setTimeout(0)` fallback

## Development

```bash
# Install dependencies
npm install

# Build all formats and types
npm run build

# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## License

MIT

## Further Reading

The `yieldToMain()` function is in no way my invention, I was just surprised it's not widely available in npm, so I decided to create a package for it. It's like a folk song that everyone knows, and yet it's origins are a little mirky. For more nitty-gritty details here's a selection of light (haha!) reading:

- [Breaking Up Long Tasks](https://calendar.perfplanet.com/2022/breaking-up-long-tasks/) (2022) - Introduction to long tasks, INP metric, and various yielding strategies including isInputPending and postTask.
- [Yielding to the Main Thread: How Breaking Up Tasks Can Fix INP](https://calendar.perfplanet.com/2023/yielding-main-thread-breaking-up-tasks-fix-inp/) (2023) - A deep dive into how yielding improves Interaction to Next Paint (INP) scores and overall responsiveness.
- [Breaking Up with Long Tasks: How I Learned to Group Loops and Wield the Yield](https://calendar.perfplanet.com/2024/breaking-up-with-long-tasks-or-how-i-learned-to-group-loops-and-wield-the-yield/) (2024) - Advanced techniques for batching and optimizing yield calls, including frame rate considerations and background tab handling.
- [setTimeout vs rAF when yielding](https://groups.google.com/g/web-vitals-feedback/c/97ydYkrYjx8) (2024)
