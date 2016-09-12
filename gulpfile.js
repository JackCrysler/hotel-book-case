var gulp = require('gulp');
var scss = require('gulp-sass');
var browsersync= require('browser-sync').create();
var reload = browsersync.reload;
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var minCss = require('gulp-clean-css');
var rjs = require('gulp-requirejs');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
gulp.task('start',['sass'],function() {
	browsersync.init({
		server:{baseDir:'./'},
		startPath:'src/html/index.html'
	});

	gulp.watch('src/scss/*.scss',['sass']);
	gulp.watch('src/html/*.html').on('change',reload);
	gulp.watch('src/js/*.js').on('change',reload);
	gulp.watch('src/img/*.jpg').on('change',reload);
});

gulp.task('sass',function(){
	gulp.src('src/main.scss')
	.pipe(sourcemaps.init())
	.pipe(scss())
	.on('error',function(err){
            console.log(err.message);
        })
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('src/css'))
	.pipe(reload({stream:true}))
});

gulp.task('less',function(){
	gulp.src('src/less/*.less')
		.pipe(less())
		.pipe(gulp.dest('src/css'))
});


gulp.task('test',['buildjs'],function(){
	gulp.src('src/css/main.css')
		.pipe(autoprefixer({
		browsers: ['last 3 version']
	}))
		.pipe(gulp.dest('test/css'))
		.pipe(minCss())
		.pipe(gulp.dest('test/min'));
});

gulp.task('minjs',function(){
	rjs({
		baseUrl:'./src',
		name:'lib/almond',
		include:['main'],
		out:'main.min.js',
		paths:{
			'jquery':'lib/jquery',
			'swiper':'lib/swiper',
			'fastclick':'lib/fastclick',
			'template':'lib/template-native'
		}
	})
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'))
});
gulp.task('mincss',function(){
	gulp.src('src/css/main.css')
	.pipe(minCss())
	.pipe(rename('main.min.css'))
	.pipe(gulp.dest('dist/css'))
});
gulp.task('copyimg',function(){
	gulp.src('src/img/*.[jpg,png,gif]')
	.pipe(gulp.dest('dist/img'))
});
gulp.task('build',['minjs','mincss','copyimg']);