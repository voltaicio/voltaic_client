angular.module("voltaic", [
    "restangular",
    "ui.router",
    "voltaic.cfg",
    "voltaic.index",
    "voltaic.photos"
])


.config([
        "$httpProvider",
        "$urlRouterProvider",
        "RestangularProvider",
        function($httpProvider, $urlRouterProvider, RestangularProvider) {

    $httpProvider.defaults.headers.common.Accept = "application/json";
    $httpProvider.defaults.headers.common["Content-Type"] = "application/json";

    $urlRouterProvider.when("", "/");
    $urlRouterProvider.otherwise("/404");

    RestangularProvider.setBaseUrl("http://127.0.0.1:8000/v1");
}]);
