'use strict';

var gulp     = require('gulp');
var path     = require('path');
var extender = require('gulp-html-extend');

module.exports = function(options) {

    gulp.task('extend', function() {

        var htmlFiles = '*.html';

        var globs = [path.join(options.src, options.params.htmlPageFolder, htmlFiles)];

        return gulp.src(globs)

            .pipe(extender({
                annotations: true,
                verbose    : false
            }))

            .pipe(gulp.dest(path.join(options.src)));
    });
};
