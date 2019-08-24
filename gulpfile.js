const gulp=require('gulp');

const babel = require('gulp-babel'); // 语法转换
const concat = require('gulp-concat'); // 合并
const uglify = require('gulp-uglify'); // js压缩
var rename = require('gulp-rename');//重命名
const sass = require('gulp-sass'); // sacc编译
const minifyCSS = require('gulp-minify-css'); //css压缩
const imagemin = require('gulp-imagemin'); // 图片压缩
const htmlmin = require('gulp-htmlmin'); //html压缩
const del = require('del'); // 清空目录
const connect = require('gulp-connect'); // 服务
const watch = require('gulp-watch');// 监听文件
const open = require('open');//自动打开端口


// es6语法转换 js压缩 md5命名
gulp.task("js", async () => {
  await gulp.src(['./src/js/*.js','!./src/js/jquery.min.js','!./src/js/wow.js'])
        .pipe(babel({
            presets: ['@babel/env']
        }))
		.pipe(concat('build.js'))   //临时合并文件
		.pipe(uglify())// js压缩
		.pipe(rename({suffix:'.min'}))//重命名
		.pipe(gulp.dest('./dist/js'))
		.pipe(connect.reload())
});

// scss编译成css
gulp.task("sass", async () => {
  await gulp.src('./src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/css'))
		.pipe(connect.reload()) 
});

// css合并压缩
gulp.task("css", async() => {
  await gulp.src(['./src/css/*.css','!./src/css/animate.css'])
        .pipe(concat('index.css'))
		.pipe(rename({suffix:'.min'}))//重命名
        .pipe(minifyCSS({keepBreaks:true}))
        .pipe(gulp.dest('./dist/css'))
        .pipe(connect.reload())
})

// 压缩图片
gulp.task('img', async () => {
  await gulp.src('./src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'))
		.pipe(connect.reload()) 
})

// html压缩
gulp.task('html', async() => {
  await gulp.src('./index.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist/'))
        .pipe(connect.reload())   
});

// 清空目录
gulp.task('clean', async() => {
  await del(['dist/*']);
})

//服务
gulp.task('connect', function () {
  connect.server({
      root: "./dist",
      port: 8080,
      livereload: true,
  });
});

open('http://localhost:8080/');

//监视文件， 自动执行
gulp.task('myWatch', function(){
  gulp.watch('./src/sass/*.scss', gulp.series('sass'))
  gulp.watch('./src/css/*.css', gulp.series('css'))
  gulp.watch('./src/js/*.js', gulp.series('js'))
  gulp.watch('./index.html', gulp.series('html'))
  gulp.watch('./src/images/*', gulp.series('img'))
})

//启动开发环境
gulp.task('start', gulp.series(gulp.parallel('myWatch', 'connect')));

// 构建项目
gulp.task('dist',gulp.series(gulp.parallel('clean','html','sass','css','js','img')));

 
 