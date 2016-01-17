/**
 * Module: app.login
 * Controller: LoginController
 * Description:
 * 
 */
angular.module('app.auth').controller('LoginController', LoginController);

function LoginController($scope, AuthService) {
    /* jshint validthis: true */

    $scope.credentials = {
        username: '',
        password: ''
    };
    $scope.login = login;

    function login(credentials) {
        AuthService.login(credentials);

    };




}
