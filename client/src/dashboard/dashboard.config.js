(function() {
    "use strict";

    /**
     * Configuration for the  module
     * Description:
     * 
     */
    angular
        .module('app.dash')
        .config(configure);

    configure.$inject = ['$stateProvider', 'USER_ROLES'];

    function configure($stateProvider, USER_ROLES) {
        console.info("the auth dashboard is runing");

        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                views: {
                    '': {
                        templateUrl: 'src/layout/templates/dashboard.layout.html',
                        controller: 'DashController'
                    }
                },
                data: {
                    authorizedRoles: [USER_ROLES.admin]
                },
            });
    }

})();
