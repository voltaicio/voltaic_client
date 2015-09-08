angular.module("voltaic.index", [])


.config(["$stateProvider", function($stateProvider) {
    $stateProvider
        .state("index", {
            controller: "IndexCtrl",
            metaDescription: "Voltaic TechniCreative",
            templateUrl: "js/index/views/index.html",
            title: "Index",
            url: "/?q"
        });
}])


.controller("IndexCtrl", [
        "$scope", "$http", "$state", "$stateParams", "API_URL",
        function($scope, $http, $state, $stateParams, API_URL) {

    if ($stateParams.q !== undefined) {
        $http.get(API_URL + "search/?q=" + $stateParams.q)
            .then(function(response) {
                $scope.searchResults = response.data;
            }, function(response) {
                // @todo handle this
                console.log("ERROR");
            });
        $scope.searchQuery = $stateParams.q;
    }

    $scope.onSubmit = function() {
        $state.go("index", { q: $scope.searchQuery }); 
    };
}]);
