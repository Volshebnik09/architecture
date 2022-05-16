var path = require('path');

module.exports = {
  entry: {
    main: "../src/pages/main/main.js",
    page1: '../src/pages/page1/page1.js'
  },
  optimization: {
    splitChunks: {
      // include all types of chunks
      chunks: 'all',
    },
  },
  output: {
    filename: 'scripts/[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    clean:true
  }
};