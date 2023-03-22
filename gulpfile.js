const gulp = require('gulp');
const compileSass = require('gulp-sass')(require('sass'));

compileSass.compiler = require('node-sass');

const bundleSass = () => {
    return gulp.src('./src/public/sass/**/*.scss')
    .pipe(compileSass().on('error', compileSass.logError))
    .pipe(gulp.dest('./src/public/stylesheets'));
}   

const devWatch = () => {
    gulp.watch('./src/public/sass/**/*.scss', bundleSass);
}

exports.bundleSass = bundleSass;
exports.devWatch = devWatch;