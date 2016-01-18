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

    configure.$inject = ['$stateProvider', 'USER_ROLES'];

    function configure($stateProvider, USER_ROLES) {
        console.info("the layout configuration is runing");

        $stateProvider
            .state('dashboard', {
                url: '',
                abstract: true,
                views: {
                    '': {
                        templateUrl: 'src/layout/templates/dashboard.layout.html',
                        controller: 'LayoutController',
                        controllerAs: 'layout'
                    }
                },
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.doctor, USER_ROLES.assistant]
                },
            });

    }

})();
