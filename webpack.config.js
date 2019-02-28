const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'vue-html5-editor.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['raw-loader']
            },
            {
                test: /\.js$/,
                use: ['babel-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    // fallback to style-loader in development
                    process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }

            // {
            //     test: /\.scss$/,
            //     use: [
            //         'style-loader', // creates style nodes from JS strings
            //         'css-loader', // translates CSS into CommonJS
            //         'sass-loader' // compiles Sass to CSS, using Node Sass by default
            //     ]
            // }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'vue-html5-editor.css'
        })
    ],

    optimization: {
        minimizer: [
            // new UglifyJsPlugin({
            //     cache: true,
            //     parallel: true,
            //     sourceMap: true // set to true if you want JS source maps
            // }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    mode: 'production'

}