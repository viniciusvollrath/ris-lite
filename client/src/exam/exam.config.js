(function() {
    "use strict";

    /**
     * Configuration for the  module
     * Description:
     * 
     */
    angular
        .module('app.exam')
        .config(configure);

    configure.$inject = ['$stateProvider', 'USER_ROLES'];

    function configure($stateProvider, USER_ROLES) {
        console.info("the exam config is runing");

        $stateProvider
            .state('app.exam', {
                url: '/exam',
                views: {
                    'main@app': {
                        templateUrl: 'src/exam/views/exam.main.view.html',
                        controller: 'ExamMainController',
                        controllerAs: 'examVm'

                    }
                },
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.doctor]
                },
                ncyBreadcrumb: {
                    label: 'Exam'
                }
            })
            .state('app.exam.new', {
                url: '/new',
                views: {
                    'main@app': {
                        templateUrl: 'src/exam/views/exam.new.view.html',
                        controller: 'ExamNewController',
                        controllerAs: 'examVm'
                    }
                },
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.doctor]
                },
                ncyBreadcrumb: {
                    label: 'New'
                }
            })
            .state('app.exam.interpretation', {
                url: '/interpretation',
                views: {
                    'main@app': {
                        templateUrl: 'src/exam/views/exam.interpretation.view.html',
                        controller: 'ExamInterpretationController',
                        controllerAs: 'examVm'
                    }
                },
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.doctor]
                },
                ncyBreadcrumb: {
                    label: 'Interpretation'
                },
                params: {
                    examId: ''
                }
            });
    }

})();
