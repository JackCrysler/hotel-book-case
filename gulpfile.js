
var gulp = require('gulp');
var scss = require('gulp-sass');
var browsersync= require('browser-sync').create();
var reload = browsersync.reload;



gulp.task('start',['sass'],function() {
	browsersync.init({
		server:{baseDir:'./'},
		startPath:'src/html/index.html'
	})

	gulp.watch('src/scss/*.scss',['sass'])
})

gulp.task('sass',function(){
	gulp.src('src/main.scss')
	.pipe(scss())
	.on('error',function(err){
            console.log(err.message);
        })
	.pipe(gulp.dest('src/css'))
	.pipe(reload({stream:true}))
})