const { src, dest,watch } = require('gulp');
const path = require('../projectConfig.json').path;
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug');

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
    return src('./sass/**/*.scss')
        .pipe(sass({
            outputStyle:'compressed',
        }).on('error', sass.logError))
        .pipe(dest('./css'));
}
exports.WatchAndBuild = (cb) =>{
    buildPug();
    buildCSS();
    watch(path.srcPath + '/**/*.pug',buildPug);
    watch(path.srcPath + '/**/*.styl',buildCSS);
    cb();
}
