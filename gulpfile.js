var gulp = require('gulp');
var less = require('gulp-less');
var babel = require('gulp-babel');

gulp.task('babel' , function() {
  gulp.src('app/scripts/*.js')
      .pipe(babel({presets: ['es2015']}))
      .pipe(gulp.dest('app/scripts/build/'));
});

gulp.task('less' , function() {
  gulp.src('app/styles/style.less')
      .pipe(less())
      .pipe(gulp.dest('app/styles/build/'));
});

gulp.task('watch' , function() {
  gulp.watch('app/scripts/*.js' , ['babel']);
  gulp.watch('app/styles/style.less' , ['less']);
});

gulp.task('default' , ['babel' , 'less' , 'watch']);
