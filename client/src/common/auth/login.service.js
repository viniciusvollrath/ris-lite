(function() {
    "use strict";

    angular.module('app.auth')
        .service('AuthService', AuthService);

    function AuthService(USER_ROLES, AUTH_EVENTS, Rest, $state, $http, $rootScope, cfpLoadingBar) {
        var LOCAL_TOKEN_KEY = 'yourTokenKey';
        var username = '';
        var isAuthenticated = false;
        //var role = '';
        var authToken;

        function loadUserCredentials() {
            var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
            if (token) {
                useCredentials(token);
            }
        }

        function storeUserCredentials(token, role) {
            window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
            window.localStorage.setItem('ROLE', role);
            Rest.setDefaultHeaders({
                "X-Access-Token": token,
            });
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
            window.localStorage.removeItem('ROLE');
        }

        var login = function(credentials) {
            // console.log("login service");
            cfpLoadingBar.start();
            console.log(credentials);
            var login = Rest.all("users");
            return login.customPOST({
                "username": credentials.username,
                "password": credentials.password
            }, "login").then(function(user) {
                storeUserCredentials(credentials.userName + user.id, user.role[0]);
                //role = user.role[0];
                console.log(user);
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                cfpLoadingBar.set(0.3);
                cfpLoadingBar.inc();
                cfpLoadingBar.set(0.6);

                cfpLoadingBar.set(0.7);


                cfpLoadingBar.complete()
                $state.go('dashboard.main');


            }, function error(err) {
                console.log(err);
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            });;
        };

        var logout = function() {
            destroyUserCredentials();
            $state.go('welcome');
        };

        var isAuthorized = function(authorizedRoles) {
            // console.log(authorizedRoles);
            var role = window.localStorage.getItem('ROLE');

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
                return window.localStorage.getItem('ROLE');;
            }
        };
    };

})();
