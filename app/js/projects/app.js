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
