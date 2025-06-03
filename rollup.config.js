import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import {readFileSync} from 'fs';
import {rm} from 'fs/promises';

const pkg = JSON.parse(readFileSync('./package.json'));

// Clean ./dist dire before building anything
await rm('./dist', {recursive: true, force: true});

export default [
  // UMD
  {
    input: 'src/yieldToMain.js',
    output: {
      name: 'yieldToMain',
      file: 'dist/yieldToMain.umd.js',
      format: 'umd',
      sourcemap: true,
    },
    plugins: [resolve(), commonjs()],
  },
  // ECMAScript module
  {
    input: 'src/yieldToMain.js',
    output: {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  },
  // CommonJS build
  {
    input: 'src/yieldToMain.js',
    output: {
      file: 'dist/yieldToMain.cjs.js',
      format: 'cjs',
      sourcemap: true,
    },
  },
  // Browser build, minified, with a `yieldToMain()` global
  {
    input: 'src/yieldToMain.js',
    output: {
      file: 'dist/yieldToMain.browser.js',
      format: 'iife',
      name: 'yieldToMain',
      sourcemap: true,
    },
    plugins: [
      resolve(),
      commonjs(),
      terser({
        format: {
          comments: false,
        },
      }),
    ],
  },
];
