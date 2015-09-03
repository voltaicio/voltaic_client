angular.module("voltaic", [
    "ui.router",
    "voltaic.cfg",
    "voltaic.index"
])


.config([
        "$httpProvider",
        "$urlRouterProvider",
        function($httpProvider, $urlRouterProvider) {

    $httpProvider.defaults.headers.common["Accept"] = "application/json";
    $httpProvider.defaults.headers.common["Content-Type"] = "application/json";

    $urlRouterProvider.when("", "/");
    $urlRouterProvider.otherwise("/404");
}]);
