(function() {
    "use strict";

    angular.module('app.auth')
        .service('AuthService', AuthService);

    function AuthService($state, USER_ROLES, DevRestangular, $http, $rootScope, AUTH_EVENTS) {
        var LOCAL_TOKEN_KEY = 'yourTokenKey';
        var username = '';
        var isAuthenticated = false;
        var role = '';
        var authToken;

        function loadUserCredentials() {
            var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
            if (token) {
                useCredentials(token);
            }
        }

        function storeUserCredentials(token) {
            window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
            useCredentials(token);
        }

        function useCredentials(token) {
            username = token.split('.')[0];
            isAuthenticated = true;
            authToken = token.split('.')[1];

            // Set the token as header for your requests!
            $http.defaults.headers.common['X-Access-Token'] = authToken;

        }

        function destroyUserCredentials() {
            authToken = undefined;
            username = '';
            isAuthenticated = false;
            $http.defaults.headers.common['X-Access-Token'] = undefined;
            window.localStorage.removeItem(LOCAL_TOKEN_KEY);
        }

        var login = function(credentials) {
            console.log("login service");
            console.log(credentials);
            var login = DevRestangular.all("users");
            return login.customPOST({
                "username": credentials.username,
                "password": credentials.password
            }, "login").then(function(user) {
                storeUserCredentials(credentials.userName + user.id);
                role = user.role[0];
                console.log(user);
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);

                $state.go('dashboard');
            }, function error(err) {
                console.log(err);
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            });;
        };

        var logout = function() {
            destroyUserCredentials();
        };

        var isAuthorized = function(authorizedRoles) {
            console.log(authorizedRoles);
            console.log(role);

            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }
            return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
        };

        loadUserCredentials();

        return {
            login: login,
            logout: logout,
            isAuthorized: isAuthorized,
            isAuthenticated: function() {
                return isAuthenticated;
            },
            username: function() {
                return username;
            },
            role: function() {
                return role;
            }
        };
    };

})();
