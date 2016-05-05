'use strict';

var gulp       = require('gulp');
var Datauri    = require('datauri');
var imagemin   = require('gulp-imagemin');
var livereload = require('gulp-livereload');
var svgSymbols = require('gulp-svg-symbols');
var path       = require('path');

module.exports = function(options) {

    var params = options.params;

    // Image minification
    gulp.task('icons', function() {
        return gulp.src(
                params.tasksPath.source.icons + '*.svg'
            )
            .pipe(
                imagemin({
                    //svgoPlugins: [
                    //    {removeViewBox: false}
                    //]
                })
            )
            .pipe(
                svgSymbols({
                    templates    : [
                        path.join(params.absolutePath, params.tasksPath.source.icons, '_icons.scss')
                    ],
                    transformData: function(svg, defaultData) {

                        var dUri = new Datauri();

                        var svgFinal = '<svg xmlns="http://www.w3.org/2000/svg" width="' + svg.width + '" height="' + svg.height + '" viewBox="0 0 ' + svg.width + ' ' + svg.height + '">';
                        svgFinal += svg.content;
                        svgFinal += '</svg>';

                        dUri.format('.svg', svgFinal);

                        return {
                            datauri: dUri.content,
                            id     : defaultData.id,
                            name   : svg.name,
                            width  : svg.width,
                            height : svg.height
                        };
                    }
                })
            )
            .pipe(
                gulp.dest(
                    params.tasksPath.destination.iconsScss
                )
            )
            .pipe(
                livereload()
            );
    });
};
