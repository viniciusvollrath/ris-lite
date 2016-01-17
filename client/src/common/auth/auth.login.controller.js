/**
 * Module: app.login
 * Controller: LoginController
 * Description:
 * 
 */
angular.module('app.auth').controller('LoginController', LoginController);

function LoginController($scope, $rootScope, $state, AUTH_EVENTS, AuthService) {
    /* jshint validthis: true */

    $scope.credentials = {
        username: '',
        password: ''
    };
    $scope.login = login;

    function login(credentials) {
        console.log("login function");
        AuthService.login(credentials);

    };




}
