(function() {
    "use strict";

    /**
     * Configuration for the  module app.room
     * Description:
     * 
     */
    angular
        .module('app.room')
        .config(configure);

    configure.$inject = ['$stateProvider', 'USER_ROLES'];

    function configure($stateProvider, USER_ROLES) {
        $stateProvider
            .state('app.setting.room', {
                url: '/room',
                views: {
                    'main@app': {
                        templateUrl: 'src/room/views/room.main.view.html',
                        controller: 'RoomMainController',
                        controllerAs: 'room'

                    }
                },
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.doctor]
                },
                ncyBreadcrumb: {
                    label: 'Rooms'
                }
            })
    }

})();
