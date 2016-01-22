(function() {
    "use strict";

    /**
     * Module: app.admin
     * Controller: AdminController
     * Description:
     * 
     */
    angular.module('app.admin').controller('AdminController', AdminController);

    function AdminController($scope, $timeout, $mdSidenav, $log) {
        $scope.close = function() {
            $mdSidenav('left').close()
                .then(function() {
                    $log.debug("close LEFT is done");
                });
        };
    }


})();
