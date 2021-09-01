import {nodeResolve} from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default [{
    input: 'src/index.js',
    output: {
      file: 'bundled.js',
      sourcemap: 'inline',
      format: 'iife',
      exports: 'default',
    },
    plugins: [
      nodeResolve({browser: true}),
      commonjs(),
    ]
  }
]
