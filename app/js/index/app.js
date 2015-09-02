angular.module("voltaic.index", [])


.config(["$stateProvider", function($stateProvider) {
    $stateProvider
        .state("index", {
            controller: "IndexCtrl",
            templateUrl: "js/index/views/index.html",
            title: "Index",
            url: "/"
        });
}])


.controller("IndexCtrl", ["$scope", function($scope) {

}]);
