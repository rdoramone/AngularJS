var browserSync = require('browser-sync'),
	gulp = require('gulp'),
	reload = browserSync.reload;

/* Caminhos do ambiente de Desenvolvimento. */
var pathSource = 'source',
	pathSourceHtml = pathSource + '/html',
	pathSourceHtmlFiles = pathSourceHtml + '/*.html',
	pathSourceJs = pathSource + '/js',
	pathSourceJsApp = pathSourceJs + '/application',
	pathSourceJsAppFiles = pathSourceJsApp + '/*.js',
	pathSourceJsLibs = pathSourceJs + '/libs',
	pathSourceJsLibsFiles = pathSourceJsLibs + '/*.js',
	pathSourceJsUtils = pathSourceJs + '/utils',
	pathSourceJsUtilsFiles = pathSourceJsUtils + '/*.js';

/* Caminhos do ambiente de HML. Aqui é pra onde vai os arquivos que foram compilados. */
var pathPublic = 'public',
	pathPublicHtml = pathPublic + '/*.html',
	pathPublicAssets = pathPublic + '/assets',
	pathPublicJs = pathPublicAssets + '/js',
	pathPublicJsFiles = pathPublicJs + '/*.js',
	pathPublicJsLibs = pathPublicJs + '/libs',
	pathPublicJsLibsFiles = pathPublicJsLibs + '/*.js';

var configBrowserSyncDev = {
	browser: 'chrome',
	logPrefix : 'AngularJS', 
	notify: true,
	open: true,
	port: 3000,
	server: {
		baseDir: pathPublic,
		index: '9.1_rotas_hashbang.html'
	}
}

/* ---------- ESTRUTURA DE DEV ---------- */
	gulp.task('gulpfile', function(){
		return gulp.src('./Gulpfile.js')
			.pipe(reload({stream: true}));
	})

	gulp.task('htmlsDev', function(){
		return gulp.src(pathSourceHtmlFiles)
			.pipe(gulp.dest(pathPublic))
			.pipe(reload({stream: true}));
	})

	gulp.task('appsDev', function(){
		return gulp.src(pathSourceJsAppFiles)
			.pipe(gulp.dest(pathPublicJs))
			.pipe(reload({stream: true}));
	})

	gulp.task('libsDev', function(){
		return gulp.src(pathSourceJsLibsFiles)
			.pipe(gulp.dest(pathPublicJsLibs))
			.pipe(reload({stream: true}));
	})

	gulp.task('browserSyncDev', ['libsDev', 'appsDev', 'htmlsDev'], function(){
		browserSync(configBrowserSyncDev);
	})

	gulp.task('watchGulpfile', function(){
		gulp.watch('Gulpfile.js', ['gulpfile']);
	})

	gulp.task('watchHtml', function(){
		gulp.watch(pathSourceHtmlFiles, ['htmlsDev']);
	})

	gulp.task('watchLibs', function(){
		gulp.watch(pathSourceJsLibsFiles, ['libsDev']);
	})

	gulp.task('watchApps', function(){
		gulp.watch(pathSourceJsAppFiles, ['appsDev']);
	})

/* ---------- TASKS DE COMPILAÇÃO ---------- */
	gulp.task('default',  ['browserSyncDev', 'watchGulpfile', 'watchHtml', 'watchLibs', 'watchApps']);