/**
 * Module: app.layout
 * Controller: LayoutController
 * Description:
 * 
 */
angular.module('app.layout').controller('LayoutController', LayoutController);

function LayoutController(AuthService) {
    var vm = this;

    vm.logout = logout;
    vm.username = "ZAK";

    function logout() {
        AuthService.logout();
    }
}
