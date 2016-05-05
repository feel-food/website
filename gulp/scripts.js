'use strict';

var gulp       = require('gulp');
var concat     = require('gulp-concat');
var uglify     = require('gulp-uglify');
var livereload = require('gulp-livereload');

module.exports = function(options) {

    var params = options.params;

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
};
