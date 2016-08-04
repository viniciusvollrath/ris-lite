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
        $stateProvider
            .state('app.patient', {
                url: '/patient',
                views: {
                    'main@app': {
                        templateUrl: 'src/patient/views/patient.main.view.html',
                        controller: 'PatientMainController',
                        controllerAs: 'patientVm'

                    }
                },
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.doctor]
                },
                ncyBreadcrumb: {
                    label: 'Patient'
                }
            }).state('app.patient.new', {
                url: '/new',
                views: {
                    'main@app': {
                        templateUrl: 'src/patient/views/patient.new.view.html',
                        controller: 'PatientNewController',
                        controllerAs: 'patientVm'

                    }
                },
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.doctor]
                },
                ncyBreadcrumb: {
                    label: 'New'
                }
            }).state('app.patient.exam-history', {
                url: '/history/:patientId',
                views: {
                    'main@app': {
                        templateUrl: 'src/patient/views/patient.exam-history.view.html',
                        controller: 'PatientExamHistoryController',
                        controllerAs: 'patientVm'

                    }
                },
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.doctor]
                },
                ncyBreadcrumb: {
                    label: 'Exams History'
                },
                params: {
                    patientId: ''
                }
            }).state('app.patient.details', {
                            url: '/details',
                            views: {
                                'main@app': {
                                    templateUrl: 'src/patient/views/patient.details.view.html',
                                    controller: 'PatientDetailsController',
                                    controllerAs: 'patientVm'
            
                                }
                            },
                            data: {
                                authorizedRoles: [USER_ROLES.admin, USER_ROLES.doctor]
                            },
                            ncyBreadcrumb: {
                                label: 'Details'
                            }
                        });
    }

})();
