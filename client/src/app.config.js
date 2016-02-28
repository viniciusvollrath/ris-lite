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

    configure.$inject = ['$httpProvider', '$urlRouterProvider', 'recorderServiceProvider', '$mdThemingProvider', 'cfpLoadingBarProvider', '$breadcrumbProvider', 'RestangularProvider'];

    function configure($httpProvider, $urlRouterProvider, recorderServiceProvider, $mdThemingProvider, cfpLoadingBarProvider, $breadcrumbProvider, RestangularProvider) {
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

        //configuring the loader
        cfpLoadingBarProvider.includeSpinner = false;
        cfpLoadingBarProvider.includeBar = true;
        cfpLoadingBarProvider.latencyThreshold = 100;

        // breadcrumb configuration custom layout
        $breadcrumbProvider.setOptions({
            template: '<div>RIS<span ng-repeat="step in steps"> > <a href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel}}</a></span></div>'
        });


        $mdThemingProvider.theme('default')
            .primaryPalette('blue', {
                'hue-1': '100',
                'hue-2': '400',
                'hue-3': '300'
            })
            .accentPalette('red');

        recorderServiceProvider
            .forceSwf(true)
            //.setSwfUrl('/lib/recorder.swf')
            .withMp3Conversion(true);

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
