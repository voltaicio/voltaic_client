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

    Photo.getList({ limit: 3, ordering: "-created" }).then(function(photos) {
        $scope.photos = photos;
    });

    Post.getList({ limit: 1, ordering: "-created" }).then(function(posts) {
        $scope.post = posts[0];
    });
}]);
