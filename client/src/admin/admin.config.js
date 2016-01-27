(function() {
    "use strict";
    /**
     * Configuration for the  module app.setting
     * Description:
     * 
     */
    angular
        .module('app.admin')
        .config(configure);

    configure.$inject = ['$stateProvider', 'USER_ROLES'];

    function configure($stateProvider, USER_ROLES) {
        $stateProvider.state('app.admin', {
            url: '/admin',
            views: {
                'main@app': {
                    templateUrl: 'src/admin/views/admin.main.view.html',
                    controller: 'AdminMainController',
                    controllerAs: 'admin'

                }
            },
            data: {
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.doctor]
            },
            ncyBreadcrumb: {
                label: 'Administration'
            }
        })
    }



})();
