import { babel } from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'

const options = {}

if (process.env.MODE === 'dev') {
  options.watch = {
    include: 'src/**'
  }
} else {
  options.plugins = [
    terser(),
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env']
    })
  ]
}

const banner = `
/*! Copyright Notice
 * @version ${require('./package.json').version}
 * @author VSirrr <1084037255@qq.com>
 */
`

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'umd',
    name: 'Seal',
    banner
  },
  onwarn: (msg, warn) => {
    if (!/Circular/.test(msg)) {
      warn(msg)
    }
  },
  ...options
}
