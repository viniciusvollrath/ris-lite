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

    configure.$inject = ['$httpProvider'];

    function configure($httpProvider) {

        $httpProvider.interceptors.push([
            '$injector',
            function($injector) {
                return $injector.get('AuthInterceptor');
            }
        ]);
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
