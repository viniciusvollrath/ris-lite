(function() {
    "use strict";

    /**
     * Configuration for the  module app.patient
     * Description:
     * 
     */
    angular
        .module('app.patient')
        .config(configure);

    configure.$inject = ['$stateProvider', 'USER_ROLES'];

    function configure($stateProvider, USER_ROLES) {
        $stateProvider.state('app.patient', {
            url: '/patient',
            views: {
                'main@app': {
                    templateUrl: 'src/patient/views/patient.main.view.html',
                    controller: 'PatientMainController',
                    controllerAs: 'patient'

                }
            },
            data: {
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.doctor]
            },
            ncyBreadcrumb: {
                label: 'Patient'
            }
        });
    }

})();
