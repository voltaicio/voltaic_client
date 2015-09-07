angular.module("voltaic", [
    "restangular",
    "ui.router",
    "voltaic.cfg",
    "voltaic.blog",
    "voltaic.index",
    "voltaic.photos",
    "voltaic.projects"
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
}])


.run(["$rootScope", "$state", function($rootScope, $state) {
    $rootScope.$on(
            "$stateChangeStart",
            function(event, toState, toParams, fromState, fromParams) {
        $rootScope.metaDescription = toState.metaDescription || "";
        $rootScope.title = toState.title || "Voltaic";
    });
}]);
