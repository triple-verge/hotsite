var gulp = require('gulp'),
	gutil = require('gulp-util'),
	jshint = require('gulp-jshint'),
	stylish = require('jshint-stylish'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	connect = require('gulp-connect'),
	colors = require('colors');

var path = {
	intro: ['src/intro.js'],
	end: ['src/end.js'],
	src: [
		'src/core.js',
		'src/traversing.js',
		'src/manipulation.js',
		'src/attributes.js',
		'src/classes.js',
		'src/css.js',
		'src/forms.js',
		'src/events.js',
		'src/ajax.js',
		'src/polyfills.js'
	]
}
path.all = path.intro.concat(path.src, path.end);

var logger = function (event) {
	var file = event.path.split(__dirname)[1],
		color;

	switch (event.type) {
		case 'added':
			color = 'green';
			break;
		case 'changed':
			color = 'yellow';
			break;
		case 'deleted':
			color = 'red';
			break;
	}

	var message = 'The file ' + file.bold.blue + ' was ' + event.type.bold[color];

	gutil.log('[Mantis.js] '.green + message);
};

gulp.task('lint', function () {
	return gulp.src(path.src)
		.pipe(jshint())
		.pipe(jshint.reporter(stylish));
});

gulp.task('concat', function() {
	return gulp.src(path.all)
		.pipe(concat('mantis.js'))
		.pipe(gulp.dest('./'));
});

gulp.task('uglify', function() {
	return gulp.src(path.all)
		.pipe(concat('mantis.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./'));
});

gulp.task('connect', function () {
	connect.server({
		root: __dirname + '/playground',
		livereload: true
	});
});

gulp.task('watch', function () {
	return gulp.watch(['src/*.js', 'playground/*.html'], ['lint', 'concat', 'uglify'])
		.on('change', function (event) {
			logger(event);

			gulp.src(__dirname + '/playground/*.html')
				.pipe(connect.reload());
		});
});

gulp.task('default', ['lint', 'concat', 'uglify', 'watch', 'connect']);
