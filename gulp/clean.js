'use strict';

var gulp = require('gulp');
var del  = require('del');

module.exports = function(options) {

    // Clean CSS
    gulp.task('clean:build', function() {
        return del([
            options.build
        ]);
    });
};
