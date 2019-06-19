// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    plugins: [
        // new MiniCssExtractPlugin({
        //     filename: 'vue-html5-editor.css'
        // })
    ],
    optimization: {
        minimizer: [
            // new UglifyJsPlugin({
            //     cache: true,
            //     parallel: true,
            //     sourceMap: true // set to true if you want JS source maps
            // }),
            // new OptimizeCSSAssetsPlugin({})
        ]
    },
    mode: 'production'
}