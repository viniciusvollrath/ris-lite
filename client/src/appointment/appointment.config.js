(function() {
    "use strict";

    /**
     * Configuration for the  module app.appointment
     * Description:
     * 
     */
    angular
        .module('app.appointment')
        .config(configure);

    configure.$inject = ['$stateProvider', 'USER_ROLES'];

    function configure($stateProvider, USER_ROLES) {
        $stateProvider
            .state('app.appointment', {
                url: '/appointments',
                views: {
                    'main@app': {
                        templateUrl: 'src/appointment/views/appointment.main.view.html',
                        controller: 'AppointmentMainController',
                        controllerAs: 'appointment'

                    }
                },
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.doctor]
                },
                ncyBreadcrumb: {
                    label: 'Appointments'
                }
            })
    }

})();
