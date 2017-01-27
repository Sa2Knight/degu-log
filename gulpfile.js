var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('babel' , function() {
  gulp.src('app/scripts/*.js')
      .pipe(babel({presets: ['es2015']}))
      .pipe(gulp.dest('app/scripts/build/'));
});

gulp.task('watch' , function() {
  gulp.watch('app/scripts/*.js' , ['babel']);
});

gulp.task('default' , ['babel' , 'watch']);
