var gulp = require("gulp"),
    zip = require('gulp-zip');

gulp.task('zip', function() {
    return gulp.src(['src/**/*.*','!dist/dist.zip','!dist/dist.tar.gz'])
        .pipe(zip('dist.zip'))
        .pipe(gulp.dest('dist'));
});