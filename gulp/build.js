const { src, dest } = require('gulp');
const pug = require('gulp-pug');

function buildPug () {
    return src('./src/*.pug')
        .pipe(
            pug({
                pretty:true
            })
        )
        .pipe(dest('./dist'));
};

buildPug()
