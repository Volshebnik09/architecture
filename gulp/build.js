const { src, dest } = require('gulp');
const path = require('../projectConfig.json').path;
const pug = require('gulp-pug');

function buildPug () {
    return src('.' + path.srcPath + '/*.pug')
        .pipe(
            pug({
                pretty:true
            })
        )
        .pipe(dest('.' + path.distPath));
};

exports.build = buildPug
