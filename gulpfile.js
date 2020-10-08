//plug-in
var gulp = require('gulp');//インストールしたライブラリ名
var minifycss = require('gulp-minify-css');
var sass = require('gulp-sass');
var changed  = require('gulp-changed');
var imagemin = require('gulp-imagemin');


// gulpタスクの作成
// gulp.task()を使う
// 第一引数に任意のタスク名、第二引数に実行したい処理をfunction関数で渡してあげる
// 関数内ではpipe()で処理を繋ぐ（jQueryのメソッドチェーンと同じ）

//１実行前２どこに吐き出すか


//CSS圧縮//余計な改行とかスペースとかを無くすもの
//minify-はcreanに変わっている


// sassをコンパイル
gulp.task('sass', function(){
  return gulp.src('./src/scss/*.scss')
     .pipe(sass())
     .pipe(gulp.dest('./dist/scss'));
 });

gulp.task('minify-css', function() {
  return gulp.src("./dist/scss/*.css")//圧縮前＊は全てのという意味。
    .pipe(minifycss())
    .pipe(gulp.dest('./dist/css'));
    //どこに吐き出すか。吐き出すところはだいたいdist
    //minifycss dest メソッド
});




// 画像圧縮
// 圧縮前と圧縮後のディレクトリを定義
var paths = {
  srcDir : 'src',
  dstDir : 'dist'
};
// jpg,png,gif画像の圧縮タスク
gulp.task('imagemin', function(){
  var srcGlob = paths.srcDir + '/**/*.+(jpg|jpeg|png|gif)';
  var dstGlob = paths.dstDir;
  return  gulp.src( srcGlob )
    .pipe(changed( dstGlob ))
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5})
      ]
    ))
    .pipe(gulp.dest( dstGlob ));
});


// Gulpを使ったファイルの監視
// watch()を使う
// 第一引数は監視したいディレクトリ配下
// 第二引数に変更があった場合に実行するタスクを配列形式で指定
gulp.task('watch', function(){
  gulp.watch(paths.srcDir + '/**/*', ['sass', 'minify-css','imagemin']);
 
});



gulp.task('default', ['sass', 'minify-css','imagemin','watch']);