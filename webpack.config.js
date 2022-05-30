var path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    main: "../src/pages/main/main.js",
    // second: "../src/pages/second/second.js" пример подгрузки след. страницы
  },
  module: {
    rules: [{
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }]
  },
  output: {
    filename: 'scripts/[name].bundle.js',
  }
};