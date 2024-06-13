const { merge } = require('webpack-merge')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const commonConfig = require('./webpack.config')
const TerserPlugin = require('terser-webpack-plugin')

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, 'public/index.html'),
  filename: './index.html',
})

module.exports = merge(commonConfig, {
  entry: './src/index',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    library: 'react-epubjs',
    libraryTarget: 'umd',
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
      root: 'ReactDOM',
    },
    epubjs: {
      commonjs: 'epubjs',
      commonjs2: 'epubjs',
      amd: 'epubjs',
      root: 'epubjs',
    },
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  },
  devtool: 'source-map', // Add this line if you need source maps
  plugins: [htmlWebpackPlugin],
})
