const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (environment = {}) => ({
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'index.bundle.js',
        publicPath: '/',
        clean: true
    },
    mode: environment.production ? 'production' : 'development',
    devtool: environment.production ? false : 'source-map',
    watchOptions: {
        ignored: path.join(__dirname, 'media/**')
    },
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },
    devServer: {
        static: [
            { directory: path.join(__dirname, 'static') },
            { directory: path.join(__dirname, 'media'), publicPath: '/media', watch: false }
        ],
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                // this is so that we can compile any React,
                // ES6 and above into normal ES5 syntax
                test: /\.(js|jsx)$/,
                // we do not want anything from node_modules to be compiled
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    'style-loader', // creates style nodes from JS strings
                    'css-loader', // translates CSS into CommonJS
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            api: 'modern-compiler'
                        }
                    }
                ]
            },
            {
                test: /\.html$/i,
                use: 'raw-loader'
            },
            {
                test: /\.md$/i,
                use: 'raw-loader'
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html')
        }),
        new webpack.DefinePlugin({
            PRODUCTION: environment.production,
            DEBUG: environment.dev, // if true it will show the query parameters into console

            MEDIA_ENDPOINT: JSON.stringify('/media')
        }),
        ...(environment.production
            ? [new CopyWebpackPlugin({
                patterns: [
                    { from: path.join(__dirname, 'media'), to: 'media' }
                ]
            })]
            : [])
    ]
});
