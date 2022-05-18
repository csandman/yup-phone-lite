import compiler from '@ampproject/rollup-plugin-closure-compiler';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import filesize from 'rollup-plugin-filesize';
import analyze from 'rollup-plugin-analyzer';
import progress from 'rollup-plugin-progress';
import typescript from 'rollup-plugin-ts';

import pkg from './package.json';

const commonWebConfig = {
  input: 'src/index.ts',
  external: ['yup'],
  output: {
    name: 'yupPhoneLite',
    file: pkg.browser,
    format: 'umd',
    sourcemap: true,
    globals: {
      yup: 'yup',
    },
  },
  plugins: [
    progress(),
    filesize(),
    analyze(),
    nodeResolve({
      browser: true,
      dedupe: ['yup'],
    }), // so Rollup can find `yup`
    commonjs({
      include: /node_modules/,
    }), // so Rollup can convert `yup` to an ES module
    typescript({
      transpiler: 'babel',
    }),
  ],
};

// browser-friendly UMD build
const webConfig = commonWebConfig;

const webMinConfig = Object.assign({}, commonWebConfig, {
  output: {
    ...commonWebConfig.output,
    file: pkg.browser.replace(/(\.js)$/, '.min$1'), // yup-phone-lite.umd.js → yup-phone-lite.umd.min.js
  },
  plugins: [...commonWebConfig.plugins, compiler()],
});

// CommonJS (for Node) and ES module (for bundlers) build.
// (We could have three entries in the configuration array
// instead of two, but it's quicker to generate multiple
// builds from a single configuration where possible, using
// an array for the `output` option, where we can specify
// `file` and `format` for each target)
const nodeConfig = {
  input: 'src/index.ts',
  external: ['yup'],
  output: [
    { file: pkg.main, format: 'cjs', sourcemap: true },
    { file: pkg.module, format: 'es', sourcemap: 'inline' },
  ],
  plugins: [
    progress(),
    filesize(),
    analyze(),
    typescript({
      transpiler: 'babel',
    }),
    compiler(),
  ],
};

export default process.env.NODE_ENV === 'test'
  ? nodeConfig
  : [webConfig, webMinConfig, nodeConfig];
