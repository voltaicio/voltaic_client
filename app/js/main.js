angular.module("voltaic", [
    "ngSanitize",
    "restangular",
    "ui.router",
    "voltaic.alerts",
    "voltaic.cfg",
    "voltaic.blog",
    "voltaic.index",
    "voltaic.search",
    "voltaic.photos",
    "voltaic.projects"
])


.config([
        "$httpProvider",
        "$locationProvider",
        "$urlRouterProvider",
        "API_URL",
        "RestangularProvider",
        function(
            $httpProvider,
            $locationProvider,
            $urlRouterProvider,
            API_URL,
            RestangularProvider) {

    $httpProvider.defaults.headers.common.Accept = "application/json";
    $httpProvider.defaults.headers.common["Content-Type"] = "application/json";

    $locationProvider.html5Mode(true);

    $urlRouterProvider.when("", "/");
    $urlRouterProvider.otherwise("/404");

    RestangularProvider.setBaseUrl(API_URL);
    RestangularProvider.addResponseInterceptor(function(
            data, operation, what, url, response, deferred) {
        var payload = {};

        if (operation === "getList") {
            payload = data.results;
            payload.count = data.count;
            payload.next = data.next;
            payload.previous = data.previous;
        } else {
            payload = data;
        }

        return payload;
    });
}])


.controller("RootCtrl", ["$scope", "$state", function($scope, $state) {

    // on search form submit redirect to results page
    $scope.onSearch = function(query) {
        $scope.query = null;
        $state.go("search", { q: query }); 
    };
}])


.run(["$rootScope", "$state", function($rootScope, $state) {
    $rootScope.$on(
            "$stateChangeStart",
            function(event, toState, toParams, fromState, fromParams) {
        $rootScope.metaDescription = toState.metaDescription || "";
        $rootScope.title = toState.title || "Voltaic";
    });
}]);
