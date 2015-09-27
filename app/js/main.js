angular.module("voltaic", [
    "restangular",
    "ui.router",
    "voltaic.alerts",
    "voltaic.cfg",
    "voltaic.blog",
    "voltaic.search",
    "voltaic.photos",
    "voltaic.projects"
])


.config([
        "$httpProvider",
        "$urlRouterProvider",
        "API_URL",
        "RestangularProvider",
        function(
            $httpProvider,
            $urlRouterProvider,
            API_URL,
            RestangularProvider) {

    $httpProvider.defaults.headers.common.Accept = "application/json";
    $httpProvider.defaults.headers.common["Content-Type"] = "application/json";

    $urlRouterProvider.when("", "/");
    $urlRouterProvider.otherwise("/404");

    RestangularProvider.setBaseUrl(API_URL);
}])


.run(["$rootScope", "$state", function($rootScope, $state) {
    $rootScope.$on(
            "$stateChangeStart",
            function(event, toState, toParams, fromState, fromParams) {
        $rootScope.metaDescription = toState.metaDescription || "";
        $rootScope.title = toState.title || "Voltaic";
    });
}]);
