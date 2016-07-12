// gulp dependencies
var gulp = require('gulp'),
    spsave = require('gulp-spsave'),
    cache = require('gulp-cached'),
    notify = require("gulp-notify"),
    fs = require('fs');


var config = JSON.parse(fs.readFileSync('./config.json'));


gulp.task("js", function () {
    return gulp.src([config.JSsrc])
        .pipe(cache('updated_js'))
        .pipe(spsave({
            siteUrl: config.host,
            username: config.username,
            password: config.password,
            folder: config.JSdes,
            flatten: false,
            checkin: true,
            checkinType: 1
        }))
        .pipe(notify({ message: "Javascript is Updated!", onLast: true }));
    ;
});


gulp.task("css", function () {
    return gulp.src([config.CSSsrc])
        .pipe(cache('updated_css'))
        .pipe(spsave({
            siteUrl: config.host,
            username: config.username,
            password: config.password,
            folder: config.CSSdes,
            flatten: false,
            checkin: true,
            checkinType: 1
        }))
       .pipe(notify({ message: "CSS is Updated!", onLast: true }));
});


//these tasks will run first to upload the files to SP
gulp.task('default',['watch'], function () {
    gulp.start('js');
    gulp.start('css');
 
   
});

//creates a watch on files system changes
gulp.task('watch', function () {
   gulp.watch(config.jsSource, ['js']);
    gulp.watch(config.cssSource, ['css']);

});
