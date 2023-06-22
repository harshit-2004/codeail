const gulp = require('gulp');

const sass = require('gulp-sass')(require('sass'));

const rev = require('gulp-rev');

const cssnano = require('gulp-cssnano');

const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const del = require('del');

gulp.task('css', function(done){
    console.log("minifying css");
     gulp.src('./assets/sass/**/*.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(cssnano())
    .pipe(gulp.dest('./assets/css'));

    return gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd:'public',
        merge:true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
})


gulp.task('js', function(done){
    console.log('minifying js...');
     gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done()
});


gulp.task('images', function(done){
    console.log('compressing images...');
     gulp.src('./assets/**/*.+(png|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});


// empty the public/assets directory
gulp.task('clean:assets',  function(done){
     del.sync('./public/assets');
    done();
});

gulp.task('build', gulp.series('clean:assets', 'css', 'js', 'images'),async function(done){
    console.log('Building assets');
    done();
});



// const gulp = require('gulp');
// const sass = require('gulp-sass')(require('sass'));
// const cssnano = require('gulp-cssnano');

// gulp.task('css', async function() {
//   console.log('minifying css');
  
//   await gulp.src('./assets/sass/**/*.scss')
//     .pipe(sass())
//     .pipe(cssnano())
//     .pipe(gulp.dest('./assets/css'));

//   return gulp.src('./assets/**/*.css')
//     .pipe((await import('gulp-rev')).default())
//     .pipe(gulp.dest('./public/assets'))
//     .pipe((await import('gulp-rev')).manifest({
//       cwd: 'public',
//       merge: true
//     }))
//     .pipe(gulp.dest('./public/assets'));
// });

// const gulp = require('gulp');
// const sass = require('gulp-sass')(require('sass'));
// const cssnano = require('gulp-cssnano');
// const rev = require('gulp-rev');

// gulp.task('css', async function() {
//   console.log('minifying css');
  
//   await gulp.src('./assets/sass/**/*.scss')
//     .pipe(sass())
//     .pipe(cssnano())
//     .pipe(gulp.dest('./assets/css'));

//   return gulp.src('./assets/**/*.css')
//     .pipe(rev())
//     .pipe(gulp.dest('./public/assets'))
//     .pipe(rev.manifest({
//         cwd:'public',
//         merge:true
//     }))
//     .pipe(gulp.dest('./public/assets'));
// });
