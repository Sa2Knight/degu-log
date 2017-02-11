var gulp = require('gulp'),
    less = require('gulp-less'),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    babel = require('gulp-babel'),
    rename = require('gulp-rename');
    plumber = require('gulp-plumber');
var babelTargets = [
  'app/scripts/*.js' ,
  'app/scripts/controllers/*.js',
  'app/scripts/models/*.js',
];

gulp.task('babel' , function() {
  return gulp.src(babelTargets)
    .pipe(plumber())
    .pipe(babel({presets: ['es2015']}))
    .pipe(gulp.dest('app/build'));
});

gulp.task('concat-uglify' , ['babel'] , function() {
  gulp.src('app/build/*.js')
      .pipe(concat('degulog.js'))
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
  gulp.watch(babelTargets , ['babel' , 'concat-uglify']);
  gulp.watch('app/styles/style.less' , ['less']);
});

gulp.task('default' , ['babel' , 'concat-uglify' ,  'less' , 'watch']);
