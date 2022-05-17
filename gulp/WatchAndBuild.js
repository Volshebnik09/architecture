const { src, dest,watch } = require('gulp');
const path = require('../projectConfig.json').path;
const sassGlob = require('gulp-sass-glob');
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug');
var webpack = require('gulp-webpack');
const webp = require('gulp-webp');
const rename = require('gulp-rename');


function buildPug (cb) {
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
exports.default= (cb) =>{
    buildPug();
    buildCSS();
    buildJS();
    watch(path.srcPath + '/**/*.pug',buildPug);
    watch(path.srcPath + '/**/*.scss',buildCSS);
    watch(path.srcPath +'/**/*.{png,jpeg}',transformPicture);
    watch(path.srcPath + '/**/*.js', buildJS)
    cb();
}
