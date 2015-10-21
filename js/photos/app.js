angular.module("voltaic.photos", [])


.config(["$stateProvider", function($stateProvider) {
    $stateProvider
        .state("photo_detail", {
            controller: "PhotoDetailCtrl",
            templateUrl: "js/photos/views/detail.html",
            title: "Photo",
            url: "/photos/:slug"
        })
        .state("photo_list", {
            controller: "PhotoListCtrl",
            templateUrl: "js/photos/views/list.html",
            title: "Photos",
            url: "/photos"
        });
}])


.controller("PhotoDetailCtrl", [
        "$scope", "$stateParams", "Photo", function($scope, $stateParams, Photo) {
    Photo.one($stateParams.slug).get().then(function(photo) {
        $scope.photo = photo;
    });
}])


.controller("PhotoListCtrl", ["$scope", "Photo", function($scope, Photo) {
    Photo.getList().then(function(photos) {
        $scope.photos = photos;
    });
}])


.factory("Photo", ["Restangular", function(Restangular) {
    return Restangular.service("photos");
}]);
