var path = require('path');
// const CommonsChunkPlugin = require('webpack').optimization.CommonsChunkPlugin

module.exports = {
  mode: 'development',
  entry: {
    ExampleBlock2:  '../src/sections/ExampleBlock2/index.js',
    ExampleBlock: '../src/sections/ExampleBlock/index.js',
  },
  optimization: {
    splitChunks: {
      // include all types of chunks
      chunks: 'all',
    },
  },
  // plugins: [
  //   new CommonsChunkPlugin({
  //     name: "commons",
  //     filename: "commons.js",
  //     chunks: ["index", "aboutUs", "contactUs"]
  //   })
  // ]
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist')
  }
};