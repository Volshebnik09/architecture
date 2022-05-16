const {src, dest, watch} = require('gulp');
const path = require('../projectConfig.json').path;
const sassGlob = require('gulp-sass-glob');
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug');
const webp = require('gulp-webp');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const webpack = require('gulp-webpack');
const rename = require('gulp-rename');
const minify = require('gulp-minify');

var webpackCFG = require('../webpack.config.js');

console.log(webpackCFG)
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
        .pipe(dest(path.buildPath));
    cb();
};

function buildCSS (){
    return src(path.srcPath + '/styles/*.scss')
        .pipe(sassGlob())
        .pipe(sass({
            outputStyle:'compressed',
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false,
        }))
        .pipe(dest(path.buildPath + '/styles'));
}

function transformPicture() {
    return src(path.srcPath +'/**/*.{png,jpeg}')
        .pipe(webp({
            method: 6,
        }))
        .pipe(dest(path.buildPath+'/images'))
}

function buildJS() {
    return src(path.srcPath)
    .pipe(webpack(webpackCFG))
    .pipe(minify())
    .pipe(dest(path.buildPath + '/'));
}

exports.default = async (cb) =>{
    await del(path.buildPath,{force:true});
    buildPug();
    buildCSS();
    buildJS();
    transformPicture();
    cb();
}