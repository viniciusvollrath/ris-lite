(function() {
    "use strict";

    /**
     * Configuration for the  module
     * Description:
     * 
     */
    angular
        .module('app')
        .config(configure)
        .factory('AuthInterceptor', AuthInterceptor);

    configure.$inject = ['$httpProvider', '$urlRouterProvider'];

    function configure($httpProvider, $urlRouterProvider) {
        //injecting the auth interceptor for http request responses
        $httpProvider.interceptors.push([
            '$injector',
            function($injector) {
                return $injector.get('AuthInterceptor');
            }
        ]);
        //setting the default url to redirect to in case of an unmatched url
        $urlRouterProvider.otherwise(function($injector, $location) {
            var $state = $injector.get("$state");
            $state.go("welcome");
        });
    };

    function AuthInterceptor($rootScope, $q, AUTH_EVENTS) {
        return {
            responseError: function(response) {
                $rootScope.$broadcast({
                    401: AUTH_EVENTS.notAuthenticated,
                    403: AUTH_EVENTS.notAuthorized
                }[response.status], response);
                return $q.reject(response);
            }
        };
    }




})();
