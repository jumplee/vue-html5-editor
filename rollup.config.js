import progress from 'rollup-plugin-progress'
import resolve from 'rollup-plugin-node-resolve'
import commonJs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'

import html from 'rollup-plugin-html'
import postcss from 'rollup-plugin-postcss'
import precss from 'precss'
import clean from 'postcss-clean'

let postConfig = {
    // 导出为单独css文件
    extract: true,
    // 支持inline注释，需要安装当前语法为scss
    syntax: 'postcss-scss',
    plugins: [
        precss()
    ],
    extensions: ['.css']
}
const postConfigBuild = {
    // 导出为单独css文件
    extract: true,
    // 支持inline注释，需要安装当前语法为scss
    syntax: 'postcss-scss',
    plugins: [
        precss(),
        clean()
    ],
    extensions: ['.css']
}
const config = {
    input: 'src/index.js',
    output: {
        name: 'VueHtml5Editor',
        file: 'dist/vue-html5-editor.js',
        format: 'es'
    },
    plugins: [
        progress({
            clearLine: false
        }),
        html({
            include: '**/*.html',
            htmlMinifierOptions: {
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                conservativeCollapse: true
            }
        }),
        postcss(postConfig),
        resolve(),
        commonJs({
            include: 'node_modules/vue-image-uploader/dist/**'
        }),
        // babel({
        //     exclude: 'node_modules/**'
        // })
    ]
}
if (process.env.NODE_ENV === 'production'){
    postConfig = postConfigBuild
    Object.assign(config,{
        output: {
            name: 'VueHtml5Editor',
            file: 'dist/vue-html5-editor.js',
            format: 'iife'
        }
    })
    // 压缩
    config.plugins.push(uglify())
    console.log(config.plugins)
}
export default config