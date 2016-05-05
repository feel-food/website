'use strict';

var gulp         = require('gulp');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

module.exports = function(options) {

    var params = options.params;

    // SASS Compile with Autoprefixer
    gulp.task('sass', function() {
        return gulp.src(params.tasksPath.source.sass)
            .pipe(
                sass().on('error', sass.logError)
            )
            .pipe(
                gulp.dest(params.tasksPath.destination.css)
            )
            .pipe(
                autoprefixer({
                    'browsers': [
                        'last 2 Edge versions',
                        'last 2 Chrome versions',
                        'last 2 Firefox versions',
                        'last 2 Explorer versions',
                        'last 2 Safari versions',
                        'ie 11',
                        'ie 10',
                        'ie 9',
                        'last 2 Android versions',
                        'last 2 iOS versions',
                        '> 3%'
                    ]
                })
            )
            .pipe(
                gulp.dest(params.tasksPath.destination.css)
            );
    });
};
