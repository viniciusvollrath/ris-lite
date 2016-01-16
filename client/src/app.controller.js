(function() {
    "use strict";

    /**
     * Module: app
     * Controller: AppController
     * Description:
     * 
     */
    angular.module('app').controller('AppController', AppController);

    function AppController($scope, $state, USER_ROLES, AuthService, AUTH_EVENTS) {
        $scope.currentUser = null;
        $scope.userRoles = USER_ROLES;
        $scope.isAuthorized = AuthService.isAuthorized;

        $scope.$on(AUTH_EVENTS.notAuthorized, function(event) {

        });

        $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
            AuthService.logout();
            $state.go('login');

        });
    }

})();
