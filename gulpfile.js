'use strict';

var gulp   = require('gulp');
var gutil  = require('gulp-util');
var _      = require('lodash');
var wrench = require('wrench');

var combineMq    = require('gulp-combine-mq');
var cssnano      = require('gulp-cssnano');
var rename       = require('gulp-rename');
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');
var livereload   = require('gulp-livereload');


var options = {
    src         : 'src',
    dist        : 'dist',
    tmp         : '.tmp',
    e2e         : 'e2e',
    errorHandler: function(title) {
        return function(err) {
            gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
            this.emit('end');
        };
    },
    params      : {
        siteName           : 'feel-food',
        siteDesc           : 'Feel Food',
        appVersion         : '1.0.0',
        developerName      : 'Yann Lombard',
        developerURL       : 'http://yannlombard.fr/',
        faviconsPath       : './favicon/',
        faviconsIncludePath: 'src/_favicon.txt',
        tasksPath          : {
            source     : {
                favicon   : 'src/favicon.png',
                images    : 'src/images/**/*',
                imagesDir : 'src/images/',
                sass      : 'src/sass/**/*.scss',
                sassDir   : 'src/sass/',
                scripts   : 'src/scripts/**/*.js',
                scriptsDir: 'src/scripts/'
            },
            destination: {
                favicon: 'dist/favicon/',
                images : 'dist/images/',
                css    : 'dist/css/',
                scripts: 'dist/js/'
            }
        }
    }
};

wrench.readdirSyncRecursive('./gulp').filter(function(file) {
    return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
    require('./gulp/' + file)(options);
});

gulp.task('default', ['clean'], function() {
    gulp.start('build');
});


var params = options.params;


// Clean CSS
gulp.task('cssclean', function() {
    return gulp.src(params.tasksPath.destination.css + 'styles.css')
        .pipe(
            combineMq({
                beautify: true
            })
        )
        .pipe(
            cssnano()
        )
        .pipe(
            rename({
                suffix: ".min"
            })
        )
        .pipe(
            gulp.dest(params.tasksPath.destination.css)
        )
        .pipe(
            livereload()
        );
});

var runSequence = require('run-sequence');
// Styles task
gulp.task('styles', function(callback) {
    runSequence('sass', 'cssclean', callback);
});


// Javascript
gulp.task('scripts', function() {
    return gulp.src(params.tasksPath.source.scripts)
        .pipe(
            concat('functions.js')
        )
        .pipe(
            uglify()
        )
        .pipe(
            gulp.dest(params.tasksPath.destination.scripts)
        )
        .pipe(
            livereload()
        );
});


// Watcher
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('**/*.scss', {cwd: params.tasksPath.source.sassDir}, ['styles']);
    gulp.watch('**/*.js', {cwd: params.tasksPath.source.scriptsDir}, ['scripts']);
    gulp.watch('**/*', {cwd: params.tasksPath.source.imagesDir}, ['images']);
});