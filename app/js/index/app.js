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

.controller("IndexCtrl", [
        "$scope", "Photo", "Post", "Project",
        function($scope, Photo, Post, Project) {

    Photo.getList().then(function(photos) {
        $scope.photo = photos[0];
    });

    Post.getList().then(function(posts) {
        $scope.post = posts[0];
    });

    Project.getList().then(function(projects) {
        $scope.project = projects[0];
    });

}]);
