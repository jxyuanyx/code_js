const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

let arguments = process.argv.splice(2);		// 参数数组

let dirName=arguments[0];

let destDirName=arguments[1];

console.log(">>>sssss",dirName,destDirName);

if(!dirName){
    console.error("请传入要压缩的目录");
    return
}

if(!destDirName){
    console.error("请传入输出目录");
    return
}

gulp.task("imagemin", function (cb) {
    gulp.src(dirName+"/*")
    .pipe((imagemin([
        imagemin.mozjpeg({progressive: true}),
        imagemin.optipng({optimizationLevel: 5})
    ]))
    .pipe(gulp.dest(destDirName))
    .on("end",cb)
    )
})
