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
                        controllerAs: 'appointmentVm'

                    }
                },
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.doctor]
                },
                ncyBreadcrumb: {
                    label: 'Appointments'
                }
            })
            .state('app.appointment.new', {
                url: '/new',
                views: {
                    'main@app': {
                        templateUrl: 'src/appointment/views/appointment.new.view.html',
                        controller: 'AppointmentNewController',
                        controllerAs: 'appointmentVm'

                    }
                },
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.doctor]
                },
                ncyBreadcrumb: {
                    label: 'New'
                }
            })
    }

})();
