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
        "$scope", "$http", "$state", "$stateParams",
        function($scope, $http, $state, $stateParams) {

    if ($stateParams.q !== undefined) {
        $http.get("http://127.0.0.1:8000/v1/search/?q=" + $stateParams.q)
            .then(function(response) {
                $scope.searchResults = response.data;
            }, function(response) {
                // @todo handle this
                console.log("ERROR");
            });
    }

    $scope.onSubmitClick = function() {
        $state.go("index", { q: $scope.searchQuery }); 
    };
}]);
