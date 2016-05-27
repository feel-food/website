'use strict';

var gulp       = require('gulp');
var livereload = require('gulp-livereload');

module.exports = function(options) {

    var params = options.params;

    // Watcher
    gulp.task('watch', ['icons', 'styles', 'images', 'scripts', 'extend'], function() {
        livereload.listen();
        gulp.watch('*.svg', {cwd: params.tasksPath.source.icons}, ['icons']);
        gulp.watch('**/*.scss', {cwd: params.tasksPath.source.sassDir}, ['styles']);
        gulp.watch('**/*.js', {cwd: params.tasksPath.source.scriptsDir}, ['scripts']);
        gulp.watch('**/*', {cwd: params.tasksPath.source.imagesDir}, ['images']);
        gulp.watch(
            '{,' + options.params.htmlTemplateFolder + '/,' + options.params.htmlPageFolder + '/}*.html',
            {cwd: options.src},
            ['extend']
        );
    });
};
