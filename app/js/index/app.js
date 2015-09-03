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


.controller("IndexCtrl", ["$scope", "$http", function($scope, $http) {

    $scope.onSubmitClick = function() {
        $http.get("http://127.0.0.1:8000/v1/search?q=" + $scope.searchQuery)
            .then(function(response) {
                $scope.searchResults = response.data;
            }, function(response) {
                // @todo handle this
                console.log("ERROR");
            });
    };
}]);
