import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';

const inputFile = 'src/index.js'; // Entry file
const outputDir = 'dist'; // Output directory

export default [
  // UMD Build (Non-minified)
  {
    input: inputFile,
    output: {
      file: `${outputDir}/david-ai.js`,
      format: 'umd', // Universal Module Definition
      name: 'DavidAI', // Global variable for browsers
      exports: 'named', // Ensure named exports
      sourcemap: true,
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        presets: ['@babel/preset-env'],
      }),
    ],
  },
  // UMD Build (Minified)
  {
    input: inputFile,
    output: {
      file: `${outputDir}/david-ai.min.js`,
      format: 'umd',
      name: 'DavidAI',
      exports: 'named',
      sourcemap: true,
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        presets: ['@babel/preset-env'],
      }),
      terser(), // Minify the output
    ],
  },
  // ES Module Build
  {
    input: inputFile,
    output: {
      file: `${outputDir}/david-ai.esm.js`,
      format: 'esm', // ES module format
      sourcemap: true,
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        presets: ['@babel/preset-env'],
      }),
    ],
  },
];
