const { src, dest,watch } = require('gulp');
const path = require('../projectConfig.json').path;
const sassGlob = require('gulp-sass-glob');
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug');
const webp = require('gulp-webp');
const del = require('del');


function buildPug () {
    return src(path.srcPath + '/*.pug')
        .pipe(
            pug({
                pretty:true
            })
        )
        .pipe(dest(path.distPath));
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
exports.default= async(cb) =>{
    await del(path.distPath,{force:true});
    buildPug();
    buildCSS();
    transformPicture();
    cb();
}
