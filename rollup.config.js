import progress from 'rollup-plugin-progress'
import resolve from 'rollup-plugin-node-resolve'
import commonJs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'

import html from 'rollup-plugin-html'
import postcss from 'rollup-plugin-postcss'
import precss from 'precss'
import clean from 'postcss-clean'

// dev 和 es模式共用
const postConfig = {
    // 导出为单独css文件
    extract: true,
    // 支持inline注释，需要安装当前语法为scss
    syntax: 'postcss-scss',
    plugins: [
        precss()
    ],
    extensions: ['.css','.pcss']
}
// 打包
const postConfigBuild = {
    // 导出为单独css文件
    extract: true,
    // 支持inline注释，需要安装当前语法为scss
    syntax: 'postcss-scss',
    plugins: [
        precss(),
        clean(),
        require('cssnano')({
            preset: 'default'
        })
    ],
    extensions: ['.css','.pcss']
}
const config = {
    input: 'src/index.js',
    output: {
        name: 'VueHtml5Editor',
        file: 'dist/es6/vue-html5-editor.js',
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

        resolve(),
        commonJs({
            include: 'node_modules/vue-image-uploader/dist/**'
        }),
        babel({
            exclude: 'node_modules/**'
        })
    ]
}
// 打包为浏览器使用版本
if (process.env.NODE_ENV === 'production'){
    Object.assign(config,{
        output: {
            name: 'VueHtml5Editor',
            file: 'dist/vue-html5-editor.min.js',
            format: 'iife'
        }
    })
    // 压缩
    config.plugins.push(uglify())
    // postcss配置
    config.plugins.push(postcss(postConfigBuild))
} else {
    config.plugins.push(postcss(postConfig))
}
if (process.env.NODE_ENV === 'dev'){
    Object.assign(config,{
        output: {
            name: 'VueHtml5Editor',
            file: 'example/vue-html5-editor.js',
            format: 'umd'
        }
    })
}
export default config