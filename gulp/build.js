'use strict';

var gulp = require('gulp');

module.exports = function(options) {

    var params = options.params;
    
    gulp.task('build', ['clean:build', 'images', 'favicons', 'icons', 'styles', 'scripts'], function() {

        return gulp.src([
            options.src + '/{*,**}',
            '!' + options.src + '/_favicon.txt',
            '!' + options.src + '/icons{,/*,/**}',
            '!' + options.src + '/images{,/*,/**}',
            '!' + options.src + '/sass{,/*,/**}',
            '!' + options.src + '/scripts{,/*,/**}'
        ]).pipe(gulp.dest(options.build));

    });
};
