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
            .state('app.setting.equipment', {
                url: '/equipment',
                views: {
                    'main@app': {
                        templateUrl: 'src/equipment/views/equipment.main.view.html',
                        controller: 'EquipmentMainController',
                        controllerAs: 'equipment'

                    }
                },
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.doctor, USER_ROLES.assistant]
                },
                ncyBreadcrumb: {
                    label: 'Equipment'
                }
            })
            .state('app.setting.equipment.new', {
                url: '/new',
                views: {
                    'main@app': {
                        templateUrl: 'src/equipment/views/equipment.new.view.html',
                        controller: 'EquipmentNewController',
                        controllerAs: 'eq'
                    }
                },
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.doctor, USER_ROLES.assistant]
                },
                ncyBreadcrumb: {
                    label: 'New'
                }
            })
            .state('app.setting.equipment-type', {
                url: '/equipment-type',
                views: {
                    'main@app': {
                        templateUrl: 'src/equipment/views/equipment.type.main.view.html',
                        controller: 'EquipmentTypeController',
                        controllerAs: 'EquipmentType'
                    }
                },
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.doctor, USER_ROLES.assistant]
                },
                ncyBreadcrumb: {
                    label: 'Equipment-type'
                }
            })
            .state('app.setting.equipment-type.new', {
                url: '/new',
                views: {
                    'main@app': {
                        templateUrl: 'src/equipment/views/equipment.type.new.view.html',
                        controller: 'EquipmentTypeNewController',
                        controllerAs: 'et'
                    }
                },
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.doctor, USER_ROLES.assistant]
                },
                ncyBreadcrumb: {
                    label: 'New'
                }
            });
    }

})();
