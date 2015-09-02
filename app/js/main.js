angular.module("voltaic", [
    "ui.router",
    "voltaic.cfg",
    "voltaic.index"
])


.config([
        "$urlRouterProvider",
        function($urlRouterProvider) {
    $urlRouterProvider.when("", "/");
    $urlRouterProvider.otherwise("/404");
}]);
