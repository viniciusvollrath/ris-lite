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
            .state('app.dashboard.main', {
                url: '/dashboard',
                views: {
                    'main@app': {
                        templateUrl: 'src/dashboard/views/dashboard.main.view.html',
                        controller: 'DashboardMainController',
                        controllerAs: 'ex'
                    }

                },
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.doctor, USER_ROLES.assistant]
                },
                ncyBreadcrumb: {
                    label: 'Dashboard'
                }
            })
            .state('app.dashboard.main.quotation', {
                url: '/quotation',
                views: {
                    'main@app': {
                        templateUrl: 'src/dashboard/views/dashboard.quotation.new.view.html',
                        controller: 'DashboardQuotationNewController',
                        controllerAs: 'qt'
                    }

                },
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.doctor, USER_ROLES.assistant]
                },
                ncyBreadcrumb: {
                    label: 'New Quotation'
                }
            })
            .state('app.dashboard.main.quotation.patient', {
                url: '/patient',
                views: {
                    'main@app': {
                        templateUrl: 'src/dashboard/views/dashboard.quotation.patient.details.view.html',
                        controller: 'DashboardQuotationPatientController',
                        controllerAs: 'qtp'
                    }

                },
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.doctor, USER_ROLES.assistant]
                },
                ncyBreadcrumb: {
                    label: 'Patient Details'
                }
            });
    }

})();
