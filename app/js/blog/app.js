angular.module("voltaic.blog", [])


.config(["$stateProvider", function($stateProvider) {
    $stateProvider
        .state("post_detail", {
            controller: "PostDetailCtrl",
            templateUrl: "js/blog/views/post_detail.html",
            title: "Post",
            url: "/posts/:id"
        })
        .state("post_list", {
            controller: "PostListCtrl",
            templateUrl: "js/blog/views/post_list.html",
            title: "Posts",
            url: "/posts"
        });
}])


.controller("PostDetailCtrl", [
        "$scope", "$stateParams", "Post", function($scope, $stateParams, Post) {
    Post.one($stateParams.id).get().then(function(post) {
        $scope.post = post;
    });
}])


.controller("PostListCtrl", ["$scope", "Post", function($scope, Post) {
    Post.getList().then(function(posts) {
        $scope.posts = posts;
    });
}])


.factory("Post", ["Restangular", function(Restangular) {
    return Restangular.service("posts");
}]);
