export default {
  entry: ['src/index.tsx'],
  // umd: {
  //   globals: {
  //     react: 'React',
  //     'react-dom': 'ReactDOM',
  //     antd: 'antd',
  //   },
  // },
  esm: 'rollup',
  extractCSS: true,
  extraExternals: ['react', 'react-dom', 'antd'],
}
