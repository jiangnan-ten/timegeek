const del = require('del')
const gulp = require('gulp')
const path = require('path')
const less = require('gulp-less')
const cleanCss = require('gulp-clean-css')

const paths = {
	styles: {
		src: 'public/less/**/*.less',
		dest: 'public/css/'
	}
}

function _cleanCss() {
	return del(['public/css'])
}

function _compileLess() {
	return gulp
		.src(paths.styles.src)
		.pipe(less())
		.pipe(gulp.dest(paths.styles.dest))
}

function watch() {
	del.sync(['public/css'])
	gulp.watch(paths.styles.src, { ignoreInitial: false }, _compileLess)
}

function build() {
	del.sync(['public/css'])
	return gulp
		.src(paths.styles.src)
		.pipe(less())
		.pipe(cleanCss())
		.pipe(gulp.dest(paths.styles.dest))
}

exports.watch = watch
exports.build = build
