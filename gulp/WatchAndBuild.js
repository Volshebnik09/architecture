const { src, dest,watch } = require('gulp');
const path = require('../projectConfig.json').path;
const sassGlob = require('gulp-sass-glob');
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug');
const webpackStream = require('webpack-stream');
const webp = require('gulp-webp');
const rename = require('gulp-rename');

function buildPug () {
    return src(path.srcPath + '/pages/**/*.pug')
        .pipe(
            pug({
                pretty:true,
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
        .pipe(dest(path.distPath + '/styles'));
}

function transformPicture() {
    return src(path.srcPath +'/**/*.{png,jpeg}')
    .pipe(webp({
        method: 1,
    }))
    .pipe(rename(function (path){
        path.dirname = path.dirname.split("\\").filter(el=> el != 'images').join('\\')
    }))
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

exports.default= (cb) =>{
    buildPug();
    buildCSS();
    buildJS();
    transformPicture();
    watch(path.srcPath + '/**/*.pug',buildPug);
    watch(path.srcPath + '/**/*.scss',buildCSS);
    watch(path.srcPath +'/**/*.{png,jpeg}',transformPicture);
    watch(path.srcPath + '/**/*.js', buildJS)
    cb();
}
