'use strict';

var gulp       = require('gulp');
var combineMq  = require('gulp-combine-mq');
var cssnano    = require('gulp-cssnano');
var rename     = require('gulp-rename');
var livereload = require('gulp-livereload');

module.exports = function(options) {

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
};
