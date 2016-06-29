// set up your dependencies
var gulp = require('gulp'),
    spsave = require('gulp-spsave'),
    cache = require('gulp-cached'),
    notify = require("gulp-notify"),
    fs = require('fs');

// read an external config file containing credentials and source/destination mapping
var config = JSON.parse(fs.readFileSync('./config.json'));

// task to update javascript files
gulp.task("updatejs", function () {
    return gulp.src([config.jsSource])
        .pipe(cache('updated_js'))
        .pipe(spsave({
            siteUrl: config.host,
            username: config.username,
            password: config.password,
            folder: config.jsDest,
            flatten: false,
            checkin: true,
            checkinType: 1
        }))
        .pipe(notify({ message: "Javascript Updated!", onLast: true }));
    ;
});

//task to update CSS
gulp.task("updatecss", function () {
    return gulp.src([config.cssSource])
        .pipe(cache('updated_css'))
        .pipe(spsave({
            siteUrl: config.host,
            username: config.username,
            password: config.password,
            folder: config.cssDest,
            flatten: false,
            checkin: true,
            checkinType: 1
        }))
       .pipe(notify({ message: "CSS Updated!", onLast: true }));
});


//runs all build tasks
gulp.task('default',['watch'], function () {
    gulp.start('updatejs');
    gulp.start('updatecss');
 
   
});

//creates a watch on filessystem changes
gulp.task('watch', function () {
   gulp.watch(config.jsSource, ['updatejs']);
    gulp.watch(config.cssSource, ['updatecss']);

});
