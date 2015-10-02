angular.module("voltaic.search", [])


.config(["$stateProvider", function($stateProvider) {
    $stateProvider
        .state("search", {
            controller: "SearchCtrl",
            metaDescription: "Voltaic TechniCreative",
            templateUrl: "js/search/views/search.html",
            title: "Search",
            url: "/search?q"
        });
}])


.controller("SearchCtrl", [
        "$scope", "$http", "$state", "$stateParams", "Alerts", "API_URL",
        function($scope, $http, $state, $stateParams, Alerts, API_URL) {

    if ($stateParams.q !== undefined) {
        $http.get(API_URL + "search/?q=" + $stateParams.q)
            .then(function(response) {
                $scope.searchResults = response.data.results;
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
        $state.go("search", { q: $scope.query }); 
    };
}]);
