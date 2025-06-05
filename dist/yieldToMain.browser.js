var yieldToMain=function(){"use strict";return function(){const e=globalThis.scheduler;return e&&"function"==typeof e.yield?e.yield():new Promise((e=>{setTimeout(e,0)}))}}();
//# sourceMappingURL=yieldToMain.browser.js.map
