(function() {
    "use strict";

    /**
     * Module: app.setting
     * Controller: SettingController
     * Description:
     * 
     */
    angular.module('app.setting').controller('SettingController', SettingController);

    function SettingController($scope, $timeout, $mdSidenav, $log) {
        $scope.close = function() {
            $mdSidenav('left').close()
                .then(function() {
                    $log.debug("close LEFT is done");
                });
        };
    }


})();
