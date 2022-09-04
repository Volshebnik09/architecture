const { src, dest,watch } = require('gulp');
const path = require('../projectConfig.json').path;
const sassGlob = require('gulp-sass-glob');
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug');
const webpackStream = require('webpack-stream');
const webp = require('gulp-webp');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const del = require("del");

function buildPug () {
    return src(path.srcPath + '/pages/**/*.pug')
        .pipe(
            pug({
                pretty:true,
                data: require('../../charity/src/base/data/data.json')
            })
        )

        .pipe(rename({
            dirname:"",
        }))
        .pipe(dest(path.distPath));
}

function buildCSS (){
    return src(path.srcPath + '/styles/*.scss')
        .pipe(sassGlob())
        .pipe(sass({
            outputStyle:'compressed',
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false,
        }))
        .pipe(dest(path.distPath + '/styles'));
}

function transformPicture() {
    return src(path.srcPath +'/assets/**/*.{png,jpeg}')
        .pipe(webp({
            method: 1,
        }))
        .pipe(rename(function (path){
            // path.dirname = path.dirname.split("\\").filter(el=> el != 'images').join('\\')
            path.dirname = ''
        }))
        .pipe(dest(path.distPath+'/images'))
}

function copyOtherImg(){
    return src(path.srcPath +'/assets/*.{png,jpeg,ico}')
        .pipe(dest(path.distPath+'/images'))
}

function buildJS() {
    return src('../src/[pages,template]/**/*.js')
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
    copyOtherImg();
    transformPicture();
    cb();
}
