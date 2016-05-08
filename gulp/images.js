'use strict';

var gulp     = require('gulp');
var imagemin = require('gulp-imagemin');
var path     = require('path');

module.exports = function(options) {

    var params = options.params;

    // Image minification
    gulp.task('images', function() {
        return gulp.src(params.tasksPath.source.images)
            .pipe(
                imagemin({
                    progressive: true,
                    svgoPlugins: [{
                        removeViewBox: false
                    }]
                })
            )
            .pipe(
                gulp.dest(path.join(options.src, options.dist, params.tasksPath.destination.images))
            );
    });
};
