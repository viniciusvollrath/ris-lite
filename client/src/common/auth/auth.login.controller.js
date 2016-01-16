/**
 * Module: app.login
 * Controller: LoginController
 * Description:
 * 
 */
angular.module('app.auth').controller('LoginController', LoginController);

function LoginController($rootScope, AUTH_EVENTS, AuthService) {
    /* jshint validthis: true */
    var vm = this;
    vm.credentials = {
        username: '',
        password: ''
    };
    vm.login = login;

    function login(credentials) {
        AuthService.login(credentials).then(function(user) {
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            $scope.setCurrentUser(user);
        }, function() {
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        });

    };

}
