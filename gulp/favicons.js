'use strict';

var gulp     = require('gulp');
var favicons = require('gulp-favicons');

module.exports = function(options) {

    var params = options.params;

    // Favicon generation
    gulp.task('favicons', function() {
        return gulp.src(params.tasksPath.source.favicon)
            .pipe(
                favicons({
                    appName    : params.siteName, // Your application's name. `string`
                    background : '#fff', // Background colour for flattened icons. `string`
                    path       : params.faviconsPath,      // Path for overriding default icons path. `string`
                    url        : params.faviconsPath,       // Absolute URL for OpenGraph image. `string`
                    display    : 'standalone', // Android display: "browser" or "standalone". `string`
                    orientation: 'portrait', // Android orientation: "portrait" or "landscape". `string`
                    version    : params.appVersion, // Your application's version number. `number`
                    logging    : false, // Print logs to console? `boolean`
                    online     : false, // Use RealFaviconGenerator to create favicons? `boolean`
                    icons      : {
                        android     : true,              // Create Android homescreen icon. `boolean`
                        appleIcon   : true,            // Create Apple touch icons. `boolean`
                        appleStartup: true,         // Create Apple startup images. `boolean`
                        coast       : false,                // Create Opera Coast icon. `boolean`
                        favicons    : true,             // Create regular favicons. `boolean`
                        firefox     : true,              // Create Firefox OS icons. `boolean`
                        opengraph   : false,            // Create Facebook OpenGraph image. `boolean`
                        twitter     : false,              // Create Twitter Summary Card image. `boolean`
                        windows     : true,              // Create Windows 8 tile icons. `boolean`
                        yandex      : true                // Create Yandex browser icon. `boolean`
                    },
                    html       : params.faviconsIncludePath
                })
            )
            .pipe(
                gulp.dest(params.tasksPath.destination.favicon)
            );
    });
};
