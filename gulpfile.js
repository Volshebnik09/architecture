const { src, dest, task, watch } = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');

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
  return src('./src/styles/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./dist/styles'));
};
exports.imageMinify = ()=>{
  return src('src/images/*')
      .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
      ])).pipe(dest('dist/images'))
}

task('default', function () {
    watch('./src/pages/**/*.pug', updatePug);
    watch('./src/styles/**/*.scss', buildStyles);
});