(function() {
    "use strict";
    /**
     * Configuration for the  module app.doctor
     * Description:
     * 
     */
    angular
        .module('app.doctor')
        .config(configure);

    configure.$inject = ['$stateProvider', 'USER_ROLES'];

    function configure($stateProvider, USER_ROLES) {
        $stateProvider.state('app.doctor', {
            url: '/doctor',
            views: {
                'main@app': {
                    templateUrl: 'src/doctor/views/doctor.main.view.html',
                    controller: 'DoctorMainController',
                    controllerAs: 'doctor'

                }
            },
            data: {
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.doctor]
            },
            ncyBreadcrumb: {
                label: 'Doctors'
            }
        })
    }



})();
