// Initialize modules
const { src, dest, watch, series, parallel } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const mmq = require('gulp-merge-media-queries');
const path = require('path');

// File paths
const paths = {
    scss: {
        src: './assets/scss/**/*.scss',
        dest: './assets/css/'
    }
};

// Error handling function
function onError(err) {
    console.log('\n====================');
    console.log('🚨 SCSS Compilation Error:');
    console.log(err.message);
    console.log('====================\n');
    this.emit('end');
}

// Development SCSS task
function scssDev() {
    return src(paths.scss.src)
        .pipe(sourcemaps.init())
        .pipe(sass.sync({
            outputStyle: 'expanded',
        }).on('error', onError))
        .pipe(postcss([
            autoprefixer({
                cascade: false,
                grid: true
            })
        ]))
        //.pipe(mmq())
        .pipe(sourcemaps.write('./maps', {
            sourceRoot: '../scss/',
            mapSources: function(sourcePath) {
                // Convert absolute paths thành relative và normalize slashes
                return path.basename(sourcePath);
            }
        }))
        .pipe(dest(paths.scss.dest));
}

// Production SCSS task (minified, no sourcemaps)
function scssProd() {
    return src(paths.scss.src)
        .pipe(sass.sync({
            outputStyle: 'compressed'
        }).on('error', onError))
        .pipe(postcss([
            autoprefixer({
                cascade: false,
                grid: true
            }),
            cssnano({
                preset: ['default', {
                    discardComments: {
                        removeAll: true
                    }
                }]
            })
        ]))
        .pipe(mmq())
        .pipe(dest(paths.scss.dest));
}

// Watch task
function watchTask() {
    watch([paths.scss.src], {
        interval: 1000, 
        usePolling: true
    }, series(scssDev));
}

// Build task for production
const build = series(scssProd);

// Default development task
const dev = series(scssDev, watchTask);

// Exports
exports.scss = scssDev;
exports.build = build;
exports.watch = watchTask;
exports.default = dev;