const {src, dest, watch} = require('gulp');
const path = require('../projectConfig.json').path;
const sassGlob = require('gulp-sass-glob');
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug');
const webp = require('gulp-webp');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');

function buildPug () {
    return src(path.srcPath + '/*.pug')
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

exports.default = async (cb) =>{
    await del(path.buildPath,{force:true});
    buildPug();
    buildCSS();
    transformPicture();
    cb();
}