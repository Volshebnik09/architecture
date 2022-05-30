const {path} = require("../projectConfig.json");
const { src, dest, watch } = require('gulp');
const webp = require('gulp-webp');

function transformPicture() {
    return src(path.srcPath +'/**/*.{png,jpeg}')
        .pipe(webp())
        .pipe(dest(path.buildPath+'/images'))
}
exports.default = (cb) =>{
    transformPicture();
    cb();
}