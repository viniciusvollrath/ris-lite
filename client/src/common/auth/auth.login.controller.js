/**
 * Module: app.login
 * Controller: LoginController
 * Description:
 * 
 */
angular.module('app.auth').controller('LoginController', LoginController);

function LoginController($scope, $rootScope, AUTH_EVENTS, AuthService) {
    /* jshint validthis: true */

    $scope.credentials = {
        username: '',
        password: ''
    };
    $scope.login = login;

    function login(credentials) {
        console.log("login function");
        AuthService.login(credentials).then(function(authenticated) {
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            $scope.setCurrentUsername($scope.credentials.userName);
        }, function(err) {
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        });

    };




}
