const {path} = require("../projectConfig.json");
const { src, dest, watch } = require('gulp');
const webp = require('gulp-webp');
const rename = require("gulp-rename");

function transformPicture() {
    return src(path.srcPath +'/**/*.{png,jpeg}')
        .pipe(webp())
        .pipe(rename(function (path){
            path.dirname = path.dirname.split("\\").filter(el=> el != 'images').join('\\')
        }))
        .pipe(dest(path.buildPath+'/images'))
}
exports.default = (cb) =>{
    transformPicture();
    cb();
}