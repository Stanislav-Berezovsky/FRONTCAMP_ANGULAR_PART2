var gulp = require('gulp'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    html2js = require('gulp-html2js'),
    htmlmin = require('gulp-htmlmin'),
    sequence = require('run-sequence'),
    webserver = require('gulp-webserver');

var jsSrc = './app/**/*.js';

gulp.task('webserver', function() {
    gulp.src('./dist/')
        .pipe(webserver({
            port: 8001,
            livereload: true,
            open: true
        }));
});

gulp.task('jshint-app', function() {
    return gulp.src(jsSrc)
        .pipe(jshint())
        .pipe(jshint.reporter('default', { verbose: true }))
        .pipe(jshint.reporter('fail'));
});

gulp.task('concat-allJs', function() {
    return gulp.src([
        './node_modules/angular-utils-pagination/dirPagination.js',
        jsSrc])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('watch-app', function() {
    gulp.watch(jsSrc, ['jshint-app', 'concat-allJs']);
});

gulp.task('html2js-app', function () {
    return gulp.src(['./app/templates/*.html'])
        .pipe(htmlmin({
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
        }))
        .pipe(html2js('templates.js', {
            base: './dist/compiled/',
            quoteChar: '\'',
            useStrict: true,
            name: 'newsTemplates'
        }))

        .pipe(gulp.dest('./dist/compiled/js/'));
});

gulp.task('run', function(cb) {
    return sequence(
        'jshint-app',
        'concat-allJs', ['webserver', 'watch-app'],
        cb
    );
});