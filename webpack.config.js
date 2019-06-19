const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const devConfig = require('./build/webpack.dev')

const config = {
    entry: './src/index.js',
    output: {
        library: 'VueHtml5Editor',
        libraryTarget: 'umd',
        filename: 'vue-html5-editor.js',
        path: path.resolve(__dirname, 'dist'),
        // 不用 写 var editor = VueHtml5Editor.default
        libraryExport: 'default'
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
                    'style-loader',
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
    }


}
if (process.env.NODE_ENV !== 'production'){
    Object.assign(config,devConfig)
}
module.exports = config