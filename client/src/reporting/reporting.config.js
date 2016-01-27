(function() {
    "use strict";
    /**
     * Configuration for the  module app.reporting
     * Description:
     * 
     */
    angular
        .module('app.reporting')
        .config(configure);

    configure.$inject = ['$stateProvider', 'USER_ROLES'];

    function configure($stateProvider, USER_ROLES) {
        $stateProvider.state('app.reporting', {
            url: '/reporting',
            views: {
                'main@app': {
                    templateUrl: 'src/reporting/views/reporting.main.view.html',
                    controller: 'ReportingMainController',
                    controllerAs: 'reporting'

                }
            },
            data: {
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.doctor]
            },
            ncyBreadcrumb: {
                label: 'Reporting'
            }
        })
    }



})();
