const {src, dest, watch} = require('gulp');
const path = require('../projectConfig.json').path;
const sassGlob = require('gulp-sass-glob');
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug');
const webp = require('gulp-webp');
const del = require('del');

function buildPug () {
    return src(path.buildPath + '/*.pug')
        .pipe(
            pug({
                pretty:false
            })
        )
        .pipe(dest(path.buildPath));
};

function buildCSS (){
    return src(path.srcPath + '/styles/*.scss')
        .pipe(sassGlob())
        .pipe(sass({
            outputStyle:'compressed',
        }).on('error', sass.logError))
        .pipe(dest(path.buildPath + '/styles'));
}

function transformPicture() {
    return src(path.srcPath +'/**/*.{png,jpeg}')
        .pipe(webp({
            method: 6,
        }))
        .pipe(dest(path.buildPath+'/images'))
}

exports.default = async (cb) =>{
    await del(path.buildPath,{force:true});
    transformPicture();
    buildCSS();
    buildPug();
}