'use strict';

var gulp         = require('gulp');
var ftp          = require('vinyl-ftp');
var path         = require('path');
var glob         = require('glob');
var keysFilePath = 'keys.json';

module.exports = function(options) {

    var params = options.params;
    var keys;

    gulp.task('deploy', [
        'build'
    ], function() {

        var keysFile = glob.sync(path.join('.', keysFilePath));

        if(!keysFile || !keysFile.length) {

            throw Error('Fichier keys.json introuvable. Nécessaire pour envoyer les fichiers via FTP.');

        } else {
            keysFile.map(function(file) {
                keys = require(path.join('..', file));
            });
        }

        var conn = ftp.create(keys.ftp);

        var globs = [path.join('.', options.build, '**')];

        return gulp.src(globs, {base: path.join('.', options.build), buffer: false})
            .pipe(conn.differentSize(keys.ftp.path))
            .pipe(conn.dest(keys.ftp.path));
    });
};
