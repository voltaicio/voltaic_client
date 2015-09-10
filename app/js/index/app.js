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
        "$scope", "$http", "$state", "$stateParams", "Alerts", "API_URL",
        function($scope, $http, $state, $stateParams, Alerts, API_URL) {

    if ($stateParams.q !== undefined) {
        $http.get(API_URL + "search/?q=" + $stateParams.q)
            .then(function(response) {
                $scope.searchResults = response.data;
            }, function(response) {
                Alerts.add({
                    body: "The server returned a " + response.status + " error.",
                    callout: "WHOOPS!",
                    type: "danger"
                });
            });
        $scope.query = $stateParams.q;
    }

    $scope.onSubmit = function() {
        $state.go("index", { q: $scope.query }); 
    };
}]);
