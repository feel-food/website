var gulp = require('gulp');
var runSequence = require('run-sequence')

var favicons = require("gulp-favicons"),
    imagemin = require('gulp-imagemin'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    combineMq = require('gulp-combine-mq'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    livereload = require('gulp-livereload');

var params  = {
    siteName: 'feel-food',
    siteDesc: 'Feel Food',
    appVersion: '1.0.0',
    developerName: 'Yann Lombard',
    developerURL: 'http://yannlombard.fr/',
    faviconsPath: './favicon/',
    faviconsIncludePath: 'app/_favicon.txt',
    tasksPath: {
        source: {
            favicon: 'app/favicon.png',
            images: 'app/images/**/*',
            imagesDir: 'app/images/',
            sass: 'app/sass/**/*.scss',
            sassDir: 'app/sass/',
            scripts: 'app/scripts/**/*.js',
            scriptsDir: 'app/scripts/'
        },
        destination: {
            favicon: 'dist/favicon/',
            images: 'dist/images/',
            css: 'dist/css/',
            scripts: 'dist/js/'
        }
    }
};

// Favicon generation
gulp.task('favicons', function () {
    return gulp.src(params.tasksPath.source.favicon)
        .pipe(
            favicons({
                appName: params.siteName, // Your application's name. `string`
                background: '#fff', // Background colour for flattened icons. `string`
                path: params.faviconsPath,      // Path for overriding default icons path. `string`
                url: params.faviconsPath,       // Absolute URL for OpenGraph image. `string`
                display: 'standalone', // Android display: "browser" or "standalone". `string`
                orientation: 'portrait', // Android orientation: "portrait" or "landscape". `string`
                version: params.appVersion, // Your application's version number. `number`
                logging: false, // Print logs to console? `boolean`
                online: false, // Use RealFaviconGenerator to create favicons? `boolean`
                icons: {
                    android: true,              // Create Android homescreen icon. `boolean`
                    appleIcon: true,            // Create Apple touch icons. `boolean`
                    appleStartup: true,         // Create Apple startup images. `boolean`
                    coast: false,                // Create Opera Coast icon. `boolean`
                    favicons: true,             // Create regular favicons. `boolean`
                    firefox: true,              // Create Firefox OS icons. `boolean`
                    opengraph: false,            // Create Facebook OpenGraph image. `boolean`
                    twitter: false,              // Create Twitter Summary Card image. `boolean`
                    windows: true,              // Create Windows 8 tile icons. `boolean`
                    yandex: true                // Create Yandex browser icon. `boolean`
                },
                html: params.faviconsIncludePath
            })
        )
        .pipe(
            gulp.dest(params.tasksPath.destination.favicon)
        );
});

// Image minification
gulp.task('images', function () {
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
            gulp.dest(params.tasksPath.destination.images)
        );
});

// SASS Compile with Autoprefixer
gulp.task('sass', function () {
    return gulp.src(params.tasksPath.source.sass)
        .pipe(
            sass().on('error', sass.logError)
        )
        .pipe(
            gulp.dest(params.tasksPath.destination.css)
        )
        .pipe(
            autoprefixer({
                'browsers': [
                    'last 2 Edge versions',
                    'last 2 Chrome versions',
                    'last 2 Firefox versions',
                    'last 2 Explorer versions',
                    'last 2 Safari versions',
                    'ie 11',
                    'ie 10',
                    'ie 9',
                    'last 2 Android versions',
                    'last 2 iOS versions',
                    '> 3%'
                ]
            })
        )
        .pipe(
            gulp.dest(params.tasksPath.destination.css)
        );
});

// Clean CSS
gulp.task('cssclean', function () {
    return gulp.src(params.tasksPath.destination.css+'styles.css')
        .pipe(
            combineMq({
                beautify: true
            })
        )
        .pipe(
            cssnano()
        )
        .pipe(
            rename({
                suffix: ".min"
            })
        )
        .pipe(
            gulp.dest(params.tasksPath.destination.css)
        )
        .pipe(
            livereload()
        );
});

// Styles task
gulp.task('styles', function(callback){
    runSequence('sass', 'cssclean', callback);
});


// Javascript
gulp.task('scripts', function() {
    return gulp.src(params.tasksPath.source.scripts)
        .pipe(
            concat('functions.js')
        )
        .pipe(
            uglify()
        )
        .pipe(
            gulp.dest(params.tasksPath.destination.scripts)
        )
        .pipe(
            livereload()
        );
});


// Watcher
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('**/*.scss', {cwd: params.tasksPath.source.sassDir}, ['styles']);
    gulp.watch('**/*.js', {cwd: params.tasksPath.source.scriptsDir}, ['scripts']);
    gulp.watch('**/*', {cwd: params.tasksPath.source.imagesDir}, ['images']);
});