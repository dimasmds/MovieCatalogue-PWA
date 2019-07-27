/*eslint-env node */

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const eslint = require('gulp-eslint');

gulp.task("default", ['styles', 'lint'], () => {
    gulp.watch("sass/**/*.scss", ['styles']);
    gulp.watch("js/**/*.js", ['lint']);
    browserSync.init({
        server: './'
    })
});

gulp.task("styles", () => {
    gulp
        .src("sass/**/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(
            autoprefixer({
                browsers: ["last 2 versions"]
            })
        )
        .pipe(gulp.dest("./css"))
        .pipe(browserSync.stream())
});

gulp.task('lint', () => {
    return (
        gulp
            .src(['js/**/*.js'])
            .pipe(eslint())
            .pipe(eslint.format())
            .pipe(eslint.failOnError())
    );
});