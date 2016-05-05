'use strict';

var gulp  = require('gulp');
var gutil = require('gulp-util');
var glob  = require('glob');

var options = {
    src         : 'src',
    dist        : 'dist',
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
        faviconsPath       : './favicon/',
        faviconsIncludePath: 'src/_favicon.txt',
        tasksPath          : {
            source     : {
                favicon   : 'src/favicon.png',
                images    : 'src/images/**/*',
                imagesDir : 'src/images/',
                sass      : 'src/sass/**/*.scss',
                sassDir   : 'src/sass/',
                scripts   : 'src/scripts/**/*.js',
                scriptsDir: 'src/scripts/'
            },
            destination: {
                favicon: 'dist/favicon/',
                images : 'dist/images/',
                css    : 'dist/css/',
                scripts: 'dist/js/'
            }
        }
    }
};

glob.sync('gulp/*.js').map(function(file) {
    require('./' + file)(options);
});

gulp.task('default', ['clean'], function() {
    gulp.start('build');
});