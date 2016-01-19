(function() {
    "use strict";

    /**
     * Configuration for the  module
     * Description:
     * 
     */
    angular
        .module('app.equipment')
        .config(configure);

    configure.$inject = ['$stateProvider', 'USER_ROLES'];

    function configure($stateProvider, USER_ROLES) {
        console.info("the equipment config is runing");

        $stateProvider
            .state('dashboard.admin.exam-type', {
                url: '/exam-type',
                views: {
                    'main@dashboard': {
                        templateUrl: 'src/exam-type/views/exam-type.main.view.html',
                        controller: 'ExamTypeMainController',
                        controllerAs: 'ext'

                    }
                },
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.doctor]
                },
                ncyBreadcrumb: {
                    label: 'Exam Type'
                }
            })
            .state('dashboard.admin.exam-type.new', {
                url: '/new',
                views: {
                    'main@dashboard': {
                        templateUrl: 'src/exam-type/views/exam-type.new.view.html',
                        controller: 'ExamTypeNewController',
                        controllerAs: 'ext'
                    }
                },
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.doctor]
                },
                ncyBreadcrumb: {
                    label: 'New'
                }
            });
    }

})();
