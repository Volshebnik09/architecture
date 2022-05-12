const { src, dest, task, watch } = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));

updatePug = () => {
  return src('./src/pages/*.pug')
    .pipe(
      pug({
        pretty:true
      })
    )
    .pipe(dest('./dist'));
};

function buildStyles() {
  return src('./src/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./dist/styles'));
};

task('default', function () {
    watch('./src/pages/**/*.pug', updatePug);
    watch('./src/styles/**/*.scss', buildStyles);
});