const { src, dest,watch } = require('gulp');
const path = require('../projectConfig.json').path;
const sassGlob = require('gulp-sass-glob');
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug');
const webp = require('gulp-webp');
const del = require('del');
const rename = require('gulp-rename');
const webpack = require('gulp-webpack');


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
    return src('../src')
    .pipe(webpack(require('../webpack.config.js')))
    .pipe(dest('../dist/'));
}

exports.default= async(cb) =>{
    await del(path.distPath,{force:true});
    buildPug();
    buildCSS();
    buildJS();
    transformPicture();
    cb();
}
