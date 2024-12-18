import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';

const inputFile = 'src/index.js'; // Entry file (all files will be imported here)
const outputDir = 'dist';

export default [
  // For david-ai.js (Non-minified version)
  {
    input: inputFile,
    output: {
      file: `${outputDir}/david-ai.js`,
      format: 'umd', // Universal Module Definition (works in all frameworks)
      name: 'DavidAI', // Global variable name (accessible in browsers)
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
  // For david-ai.min.js (Minified version)
  {
    input: inputFile,
    output: {
      file: `${outputDir}/david-ai.min.js`,
      format: 'umd',
      name: 'DavidAI',
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
];
