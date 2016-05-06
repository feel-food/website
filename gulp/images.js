'use strict';

var gulp     = require('gulp');
var imagemin = require('gulp-imagemin');
var path     = require('path');

module.exports = function(options) {

    var params = options.params;

    var distDest = path.join(options.dist, params.tasksPath.destination.images);

    var imageminConfig = {
        progressive: true,
        svgoPlugins: [{
            removeViewBox: false
        }]
    };

    // Image minification
    gulp.task('images', function() {
        return gulp.src(params.tasksPath.source.images)
            .pipe(
                imagemin(imageminConfig)
            )
            .pipe(
                gulp.dest(distDests)
            );
    });
};
