'use strict';

var gulp = require('gulp');
var del  = require('del');
var path = require('path');

module.exports = function(options) {

    // Clean CSS
    gulp.task('clean:build', function() {
        return del([
            options.build
        ]);
    });

    gulp.task('clean:favicons', function() {
        return del([
            options.params.faviconsIncludePath,
            path.join(options.src, options.dist, options.params.faviconsFolder)
        ]);
    });
};
