const { src, dest,watch } = require('gulp');
const path = require('../projectConfig.json').path;
const sassGlob = require('gulp-sass-glob');
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug');
const webp = require('gulp-webp');
const del = require('del');
const rename = require('gulp-rename');
const webpackStream = require("webpack-stream");
const webpack = require('webpack');


function buildPug (cb) {
    return src(path.srcPath + '/pages/**/*.pug')
        .pipe(
            pug({
                pretty:true
            })
        )
        .pipe(rename({
            dirname:"",
        }))
        .pipe(dest(path.distPath));
    cb();
};

function buildCSS (){
    return src(path.srcPath + '/styles/*.scss')
        .pipe(sassGlob())
        .pipe(sass({
            outputStyle:'compressed',
        }).on('error', sass.logError))
        .pipe(dest(path.distPath + '/styles'));
}

function transformPicture() {
    return src(path.srcPath +'/**/*.{png,jpeg}')
        .pipe(webp())
        .pipe(dest(path.distPath+'/images'))
}

function buildJS() {
    return src('../src/pages/**/*.js')
        .pipe(webpackStream(
            require('../webpack.config.js')
        ))
        .on('error', function (err) {
            console.error('WEBPACK ERROR', err);
            this.emit('end'); // Don't stop the rest of the task
        })
        .pipe(dest(path.distPath))
}

exports.default= async(cb) =>{
    await del(path.distPath,{force:true});
    buildPug();
    buildCSS();
    buildJS();
    transformPicture();
    cb();
}
