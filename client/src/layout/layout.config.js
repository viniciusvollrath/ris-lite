(function() {
    "use strict";

    /**
     * Configuration for the  module
     * Description:
     * 
     */
    angular
        .module('app.layout')
        .config(configure);

    configure.$inject = ['$stateProvider'];

    function configure($stateProvider) {
        console.info("the layout configuration is runing");

        $stateProvider
            .state('login', {
                url: '/login',
                views: {
                    '': {
                        templateUrl: 'src/layout/templates/login.layout.html'
                    },
                    'form@login': {
                        templateUrl: 'src/common/auth/login.view.html',
                        controller: 'LoginController',
                        controllerAs: 'vm'
                    }
                }
            });
    }

})();
