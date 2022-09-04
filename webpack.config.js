var path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'development',
  watch: true,
  entry: {
    index: "../src/pages/index/index.js",
  },
  // plugins: [
  //   new BundleAnalyzerPlugin()
  // ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: "all"
        }
      }
    }
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
    },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }]
  },
  output: {
    filename: 'scripts/[name].bundle.js',
  },


};