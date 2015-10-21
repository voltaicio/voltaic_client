angular.module('voltaic.cfg', [])
.constant('API_URL', "http://127.0.0.1:8000/v1/");

angular.module("voltaic", [
    "ngSanitize",
    "restangular",
    "ui.router",
    "voltaic.alerts",
    "voltaic.cfg",
    "voltaic.blog",
    "voltaic.index",
    "voltaic.search",
    "voltaic.photos",
    "voltaic.projects"
])


.config([
        "$httpProvider",
        "$locationProvider",
        "$urlRouterProvider",
        "API_URL",
        "RestangularProvider",
        function(
            $httpProvider,
            $locationProvider,
            $urlRouterProvider,
            API_URL,
            RestangularProvider) {

    $httpProvider.defaults.headers.common.Accept = "application/json";
    $httpProvider.defaults.headers.common["Content-Type"] = "application/json";

    $locationProvider.html5Mode(true);

    $urlRouterProvider.when("", "/");
    $urlRouterProvider.otherwise("/404");

    RestangularProvider.setBaseUrl(API_URL);
    RestangularProvider.addResponseInterceptor(function(
            data, operation, what, url, response, deferred) {
        var payload = {};

        if (operation === "getList") {
            payload = data.results;
            payload.count = data.count;
            payload.next = data.next;
            payload.previous = data.previous;
        } else {
            payload = data;
        }

        return payload;
    });
}])


.controller("RootCtrl", [
        "$scope", "$state", "$window", function($scope, $state, $window) {

    $scope.data = { query: "" };

    // on search form submit redirect to results page
    $scope.onSearch = function() {
        var query = $scope.data.query;
        $scope.data.query = "";
        $window.document.getElementById("search-query").blur();
        $state.go("search", { q: query }); 
    };
}])


.run(["$rootScope", "$state", function($rootScope, $state) {
    $rootScope.$on(
            "$stateChangeStart",
            function(event, toState, toParams, fromState, fromParams) {
        $rootScope.metaDescription = toState.metaDescription || "";
        $rootScope.title = toState.title || "Voltaic";
    });
}]);

/**
 * @see https://github.com/jmcunningham/angularBPSeed
 */
angular.module("voltaic.alerts", [])


.controller("AlertsCtrl", ["Alerts", function(Alerts) {
    this.alerts = Alerts.get();

    this.closeAlert = function(index) {
        Alerts.removeAlert(index);
    };
}])


.directive("alerts", [function() {
    return {
        restrict: "EA",
        controller: "AlertsCtrl",
        controllerAs: "alertsCtrl",
        templateUrl: "js/alerts/views/_main.html",
        scope: {}
    };
}])


.service("Alerts", [function() {
    var _alerts = [];

    this.add = function(a) {
        _alerts.push(a);
    };

    this.get = function() {
        return _alerts;
    };

    this.remove = function(index) {
        _alerts.splice(index, 1);
    };
}]);

angular.module("voltaic.blog", [])


.config(["$stateProvider", function($stateProvider) {
    $stateProvider
        .state("post_detail", {
            controller: "PostDetailCtrl",
            templateUrl: "js/blog/views/post_detail.html",
            title: "Post",
            url: "/posts/:slug"
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
    Post.one($stateParams.slug).get().then(function(post) {
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

angular.module("voltaic.projects", [])


.config(["$stateProvider", function($stateProvider) {
    $stateProvider
        .state("project_detail", {
            controller: "ProjectDetailCtrl",
            templateUrl: "js/projects/views/detail.html",
            title: "Project",
            url: "/projects/:slug"
        })
        .state("project_list", {
            controller: "ProjectListCtrl",
            templateUrl: "js/projects/views/list.html",
            title: "Projects",
            url: "/projects"
        });
}])


.controller("ProjectDetailCtrl", [
        "$scope", "$stateParams", "Project",
        function($scope, $stateParams, Project) {
    Project.one($stateParams.slug).get().then(function(project) {
        $scope.project = project;
    });
}])


.controller("ProjectListCtrl", ["$scope", "Project", function($scope, Project) {
    Project.getList().then(function(projects) {
        $scope.projects = projects;
    });
}])


.factory("Project", ["Restangular", function(Restangular) {
    return Restangular.service("projects");
}]);

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

    var searchQuery = $stateParams.q;

    if (searchQuery !== undefined) {
        $http.get(API_URL + "search/?q=" + searchQuery)
            .then(function(response) {
                $scope.searchResults = response.data.results;
            }, function(response) {
                Alerts.add({
                    body: "The server returned a " + response.status + " error.",
                    callout: "WHOOPS!",
                    type: "danger"
                });
            });
        $scope.searchQuery = searchQuery;
    }

    $scope.onSubmit = function() {
        $state.go("search", { q: $scope.query }); 
    };
}]);
