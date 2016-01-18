(function() {
    "use strict";

    /**
     * Configuration for the  module
     * Description:
     * 
     */
    angular
        .module('app.admin')
        .config(configure);

    configure.$inject = ['$stateProvider', 'USER_ROLES'];

    function configure($stateProvider, USER_ROLES) {
        console.info("the admin config is runing");

        $stateProvider
            .state('dashboard.admin', {
                url: '/admin',
                views: {
                    'main@dashboard': {
                        templateUrl: 'src/admin/admin.main.view.html',
                        controller: 'DashController'
                    },
                    'left-side@dashboard': {
                        templateUrl: 'src/admin/admin.side.view.html',
                        controller: 'DashController'
                    }
                },
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.doctor, USER_ROLES.assistant]
                },
            });
    }

})();
