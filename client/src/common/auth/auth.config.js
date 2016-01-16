(function() {
    "use strict";

    /**
     * Configuration for the  module
     * Description:
     * 
     */
    angular
        .module('app.auth')
        .config(configure);

    configure.$inject = ['$stateProvider', 'USER_ROLES'];

    function configure($stateProvider, USER_ROLES) {
        console.info("the auth configuration is runing");

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
                        controllerAs: 'login',

                    }
                }
            });
    }

})();
