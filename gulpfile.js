var concat = require("gulp-concat"),
    gulp = require("gulp"),
    gulpNgConfig = require("gulp-ng-config"),
    jshint = require("gulp-jshint"),
    server = require("gulp-webserver");


gulp.task("build", function() {
    gulp.src("cfg")
        .pipe(gulpNgConfig("voltaic.cfg"))
        .pipe(gulp.dest("js"));

    gulp.src([
            "bower_components/angular/angular.min.js",
            "bower_components/angular-sanitize/angular-sanitize.min.js",
            "bower_components/angular-ui-router/release/angular-ui-router.min.js",
            "bower_components/lodash/lodash.min.js",
            "bower_components/restangular/dist/restangular.min.js",
            "bower_components/jquery/dist/jquery.min.js",
            "js/lib/bootstrap.min.js"
        ])
        .pipe(concat("lib.js"))
        .pipe(gulp.dest("./js/"));

    gulp.src([
        "js/cfg.js",
        "js/main.js",
        "js/*/app.js",
        ])
        .pipe(concat("voltaic.js"))
        .pipe(gulp.dest("./js/"));
});


gulp.task("lint", function() {
    gulp.src([
            "!js/lib/*.js",
            "js/*/*.js",
            "js/main.js"
        ])
        .pipe(jshint())
        .pipe(jshint.reporter("default"));
});


gulp.task("serve", function() {
    gulp.src(".")
        .pipe(server({ port: 8080 }));
});


gulp.task("watch", function() {
    gulp.watch(
        ["app/js/main.js", "app/js/*/*.js"],
        ["lint", "build"]);
});


gulp.task("default", ["lint", "build", "serve", "watch"]);
