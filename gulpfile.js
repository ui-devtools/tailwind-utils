const gulp = require('gulp');
const concat = require('gulp-concat');
const ts = require('gulp-typescript');

const tsProject = ts.createProject('tsconfig.json');

gulp.task('default', function () {
  var tsResult = gulp.src('src/*.ts').pipe(tsProject());

  return tsResult.js.pipe(concat('umd.js')).pipe(gulp.dest('dist/'));
});
