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
        console.info("the dashboard config is runing");

        $stateProvider
            .state('dashboard.main', {
                url: '/dashboard',
                views: {
                    'main@dashboard': {
                        templateUrl: 'src/dashboard/dashboard.main.view.html',
                        controller: 'AdminController'
                    }
                    // .
                    // 'left-side@dashboard': {
                    //     templateUrl: 'src/dashboard/dashboard.side.view.html',
                    //     controller: 'DashController'
                    // }
                },
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.doctor, USER_ROLES.assistant]
                },
                ncyBreadcrumb: {
                    label: 'Home page'
                }
            });
    }

})();
