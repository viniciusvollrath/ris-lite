(function() {
    "use strict";

    /**
     * Configuration for the  module
     * Description:
     * 
     */
    angular
        .module('app.exam-type')
        .config(configure);

    configure.$inject = ['$stateProvider', 'USER_ROLES'];

    function configure($stateProvider, USER_ROLES) {
        console.info("the equipment config is runing");

        $stateProvider
            .state('app.setting.exam-type', {
                url: '/exam-type',
                views: {
                    'main@app': {
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
            .state('app.setting.exam-type.new', {
                url: '/new',
                views: {
                    'main@app': {
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
