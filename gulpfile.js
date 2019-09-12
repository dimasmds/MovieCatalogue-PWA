/*eslint-env node */

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const eslint = require('gulp-eslint');

gulp.task("default", ['styles', 'lint', 'pages', 'index', 'manifest', 'sw', 'materialize', 'images'], () => {
    gulp.watch("sass/**/*.scss", ['styles']);
    gulp.watch("js/**/*.js", ['lint']);
    gulp.watch("pages/**/*.html", ['pages']);
    gulp.watch("*.html", ['index']);
    gulp.watch("manifest.json", ['manifest']);
    gulp.watch("sw.js", ['sw']);
    browserSync.init({
        server: './public'
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
        .pipe(gulp.dest("./public/css"))
        .pipe(browserSync.stream())
});

gulp.task('lint', () => {
    return (
        gulp
            .src(['js/**/*.js'])
            .pipe(eslint())
            .pipe(eslint.format())
            .pipe(eslint.failOnError())
            .pipe(gulp.dest("./public/js"))
    );
});

gulp.task('pages', () => {
    return (
        gulp
            .src(['pages/**/*.html'])
            .pipe(gulp.dest("./public/pages"))
    );
});

gulp.task('index', () => {
    return (
        gulp.src(['*.html'])
            .pipe(gulp.dest("./public"))
    );
});

gulp.task('manifest', () => {
    return (
        gulp.src(["manifest.json"])
            .pipe(gulp.dest("./public"))
    )
});

gulp.task('sw', () => {
    return (
        gulp.src(["sw.js"])
            .pipe(gulp.dest("./public"))
    );
});

gulp.task('materialize', () => {
    return (
        gulp.src(["css/materialize.min.css"])
            .pipe(gulp.dest("./public/css"))
    )
});

gulp.task('images', () => {
    return(
        gulp.src(["images/**/*.png"])
            .pipe(gulp.dest("./public/images"))
    )
});