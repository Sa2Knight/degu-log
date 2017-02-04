var gulp = require('gulp');
var less = require('gulp-less');
var babel = require('gulp-babel');
var babelTargets = [
  'app/scripts/*.js' ,
  'app/scripts/controllers/*.js',
  'app/scripts/models/*.js',
];

gulp.task('babel' , function() {
  gulp.src(babelTargets)
      .pipe(babel({presets: ['es2015']}))
      .pipe(gulp.dest('app/build/'));
});

gulp.task('less' , function() {
  gulp.src('app/styles/style.less')
      .pipe(less())
      .pipe(gulp.dest('app/styles/build/'));
});

gulp.task('watch' , function() {
  gulp.watch(babelTargets , ['babel']);
  gulp.watch('app/styles/style.less' , ['less']);
});

gulp.task('default' , ['babel' , 'less' , 'watch']);
