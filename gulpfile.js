var gulp = require('gulp');
babel = require('gulp-babel'),
sass = require('gulp-sass'),
watch = require('gulp-watch'),
babel = require('gulp-babel'),
runSequence = require('run-sequence'),
plumber = require('gulp-plumber'),
concat = require('gulp-concat'),
prefixer = require('gulp-autoprefixer'),
sourcemaps = require('gulp-sourcemaps'),
csso = require('gulp-csso'),
browserify = require('browserify'),
babelify = require('babelify'),
imagemin = require('gulp-imagemin'),
uglify = require('gulp-uglify'),
source = require('vinyl-source-stream'),
browserSync = require('browser-sync'),
react = require('gulp-react'),
reload = browserSync.reload;
 

var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        style: 'build/style/',
        img: 'build/img/'
    },
    libs: [
        'bower_components/react/react.js',
        'bower_components/react/react-dom.js',
        'bower_components/eventEmitter/EventEmitter.js',
        'bower_components/jquery/dist/jquery.js',
        'bower_components/react/react-router.js',
    ],
    src: {
        html: 'src/*.html',
        js: 'src/js/**/*.js',
        jsx: 'src/js/**/*.jsx',
        style: 'src/style/*.scss',
        img: 'src/img/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        jsx: 'src/js/**/*.jsx',
        style: 'src/style/**/*.scss',
        img: 'src/img/**/*.*'
    },
    clean: './build'
    
};

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 8000,
    logPrefix: "Global-task"
};
/* Libs*/
gulp.task('libs', function() {
  return gulp.src(path.libs)
    .pipe(sourcemaps.init())
    .pipe(concat('libs.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.build.js))
})

/* JSX-build*/

gulp.task('jsBuild', function () {
    return browserify({
        entries: 'src/js/app.jsx',
        paths: ['src/js/components/', 'src/js/', 'src/js/store/','src/js/dispatcher/','src/js/actions/', 'node_modules/', 'bower_components/'],
        extensions: ['.jsx'],
        debug: true}
    )
    .transform(babelify.configure({
        presets: ['es2015','react']
}))
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(source('build.js'))
    .pipe(gulp.dest(path.build.js));
});
/* CSS-build*/
gulp.task('style-build', function(){
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(prefixer())
        .pipe(csso())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.build.style))
        .pipe(reload({stream: true}));
});

/*Images*/
gulp.task('images', function() {
    gulp.src(path.src.img)
        .pipe(imagemin())
        .pipe(gulp.dest(path.build.img));
});
/*Copy files in src folder*/
gulp.task('html', function() {
    gulp.src(path.src.html)
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});
/*Copy JS*/
gulp.task('JS', function() {
    gulp.src(path.src.js)
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

/*webserver*/
gulp.task('webserver', function () {
    browserSync(config);
});


/*watch*/
gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style-build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('images');
    });
    watch([path.watch.jsx], function(event, cb) {
        gulp.start('jsBuild');
    });    
    watch([path.watch.js], function(event, cb) {
        gulp.start('JS');
    });
});
gulp.task('server', ['webserver', 'watch']);
gulp.task('build', function(callback) {
  runSequence(['libs', 'style-build', 'images', 'html',  'JS' ], callback)
});
gulp.task('default', function(callback) {
  runSequence(['build'], 'server', callback)
});
