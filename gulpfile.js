var concat = require("gulp-concat"),
    gulp = require("gulp"),
    gulpNgConfig = require("gulp-ng-config"),
    jshint = require("gulp-jshint"),
    server = require("gulp-webserver");


gulp.task("build", function() {
    gulp.src("cfg")
        .pipe(gulpNgConfig("voltaic.cfg"))
        .pipe(gulp.dest("app/js"));

    gulp.src([
            "app/bower_components/angular/angular.min.js",
            "app/bower_components/angular-sanitize/angular-sanitize.min.js",
            "app/bower_components/angular-ui-router/release/angular-ui-router.min.js",
            "app/bower_components/lodash/lodash.min.js",
            "app/bower_components/restangular/dist/restangular.min.js",
            "app/bower_components/jquery/dist/jquery.min.js",
            "app/js/lib/bootstrap.min.js"
        ])
        .pipe(concat("lib.js"))
        .pipe(gulp.dest("./app/js/"));

    gulp.src([
        "app/js/cfg.js",
        "app/js/main.js",
        "app/js/*/app.js",
        ])
        .pipe(concat("voltaic.js"))
        .pipe(gulp.dest("./app/js/"));
});


gulp.task("lint", function() {
    gulp.src([
            "!app/js/lib/*.js",
            "app/js/*/*.js",
            "app/js/main.js"
        ])
        .pipe(jshint())
        .pipe(jshint.reporter("default"));
});


gulp.task("serve", function() {
    gulp.src("app")
        .pipe(server({ port: 8080 }));
});


gulp.task("watch", function() {
    gulp.watch(
        ["app/js/main.js", "app/js/*/*.js"],
        ["lint", "build"]);
});


gulp.task("default", ["lint", "build", "serve", "watch"]);
