var path = require('path');
// const CommonsChunkPlugin = require('webpack').optimization.CommonsChunkPlugin

module.exports = {
  mode: 'development',
  entry: {
    main: "../src/pages/main/main.js"
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
    filename: 'scripts/[name].bundle.js',
    path: path.resolve(__dirname, '../dist')
  }
};