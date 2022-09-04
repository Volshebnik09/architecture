var path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        index: "../src/pages/index/index.js",
    },
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
    }
};