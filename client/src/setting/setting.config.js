(function() {
    "use strict";

    /**
     * Configuration for the  module
     * Description:
     * 
     */
    angular
        .module('app.setting')
        .config(configure);

    configure.$inject = ['$stateProvider', 'USER_ROLES'];

    function configure($stateProvider, USER_ROLES) {
        console.info("the setting config is runing");

        $stateProvider
            .state('app.setting', {
                url: '/setting',
                views: {
                    'main@app': {
                        templateUrl: 'src/setting/views/setting.main.view.html',
                        controller: ''
                    },
                    'left-side@app': {
                        templateUrl: 'src/setting/views/setting.side.view.html',
                        controller: ''
                    }
                },
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.doctor, USER_ROLES.assistant]
                },
                ncyBreadcrumb: {
                    label: 'Settings'
                }
            });
    }

})();
