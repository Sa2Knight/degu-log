var gulp = require('gulp'),
    less = require('gulp-less'),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    babel = require('gulp-babel'),
    rename = require('gulp-rename');
var babelTargets = [
  'app/scripts/*.js' ,
  'app/scripts/controllers/*.js',
  'app/scripts/models/*.js',
];

gulp.task('js' , function() {
  gulp.src(babelTargets)
    .pipe(concat('degulog.js'))
    .pipe(babel({presets: ['es2015']}))
    .pipe(uglify({ mangle: false }))
    .pipe(rename('degulog.min.js'))
    .pipe(gulp.dest('app/build'));
});

gulp.task('less' , function() {
  gulp.src('app/styles/style.less')
    .pipe(less())
    .pipe(gulp.dest('app/styles/build/'));
});

gulp.task('watch' , function() {
  gulp.watch(babelTargets , ['js']);
  gulp.watch('app/styles/style.less' , ['less']);
});

gulp.task('default' , ['js' , 'less' , 'watch']);
