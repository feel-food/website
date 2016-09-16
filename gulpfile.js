'use strict';

var gulp  = require('gulp');
var gutil = require('gulp-util');
var glob  = require('glob');

var options = {
    src         : 'src',
    dist        : 'dist',
    build       : 'build',
    tmp         : '.tmp',
    e2e         : 'e2e',
    errorHandler: function(title) {
        return function(err) {
            gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
            this.emit('end');
        };
    },
    params      : {
        siteName           : 'feel-food',
        siteDesc           : 'Feel Food',
        appVersion         : '1.0.0',
        developerName      : 'Yann Lombard',
        developerURL       : 'http://yannlombard.fr/',
        faviconsPath       : 'dist/favicon/',
        faviconsFolder     : 'favicon',
        faviconsIncludePath: 'src/_favicon.txt',
        htmlTemplateFolder : 'templates',
        htmlPageFolder     : 'pages',
        tasksPath          : {
            source     : {
                favicon   : 'src/favicon.png',
                images    : 'src/images/**/*',
                icons     : 'src/icons/',
                imagesDir : 'src/images/',
                sass      : 'src/sass/**/*.scss',
                sassDir   : 'src/sass/',
                scripts   : 'src/scripts/**/*.js',
                scriptsDir: 'src/scripts/'
            },
            destination: {
                favicon  : 'src/dist/favicon/',
                images   : 'images',
                css      : 'src/dist/css/',
                scripts  : 'src/dist/js/',
                iconsScss: 'src/sass/components'
            }
        },
        absolutePath       : __dirname
    }
};

glob.sync('gulp/*.js').map(function(file) {
    require('./' + file)(options);
});

gulp.task('default', ['clean:build'], function() {
    gulp.start('build');
});