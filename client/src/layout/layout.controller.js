/**
 * Module: app.layout
 * Controller: LayoutController
 * Description:
 * 
 */
angular.module('app.layout').controller('LayoutController', LayoutController);

function LayoutController($state, AuthService) {
    var vm = this;

    vm.logout = logout;
    vm.hasSideNav = hasSideNav;
    vm.username = "ZAK";

    function logout() {
        AuthService.logout();
    }

    function hasSideNav() {
        console.log($state.$current.name);
        return $state.$current.name == 'dashboard.admin'
    }
}
