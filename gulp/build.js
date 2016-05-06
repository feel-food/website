'use strict';

var gulp = require('gulp');
var del  = require('del');

module.exports = function(options) {

    var params = options.params;

    // Clean CSS
    gulp.task('build', ['clean:build', 'images'], function() {

        return gulp.src([
            options.src + '/{*,**}',
            '!' + options.src + '/_favicon.txt',
            '!' + options.src + '/icons{,/*,**}',
            '!' + options.src + '/images{,/*,**}',
            '!' + options.src + '/sass{,/*,**}'
            //options.src + '/*.{html,php}'
        ]).pipe(gulp.dest(options.build));

    });
};
