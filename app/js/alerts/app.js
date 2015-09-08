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
