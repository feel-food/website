'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

module.exports = function(options) {

    var params = options.params;

    // Styles task
    gulp.task('styles', function(callback) {
        runSequence('sass', 'cssclean', callback);
    });
};
