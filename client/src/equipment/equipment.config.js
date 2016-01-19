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
            .state('dashboard.admin.equipment', {
                url: '/equipment',
                views: {
                    'main@dashboard': {
                        templateUrl: 'src/equipment/views/equipment.main.view.html',
                        controller: 'EquipmentMainController'
                    }
                },
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.doctor, USER_ROLES.assistant]
                },
                ncyBreadcrumb: {
                    label: 'Equipment'
                }
            })
            .state('dashboard.admin.equipment-type', {
                url: '/equipment-type',
                views: {
                    'main@dashboard': {
                        templateUrl: 'src/equipment/views/equipment.type.view.html',
                        controller: 'EquipmentTypeController'
                    }
                },
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.doctor, USER_ROLES.assistant]
                },
                ncyBreadcrumb: {
                    label: 'Equipment-type'
                }
            });
    }

})();
