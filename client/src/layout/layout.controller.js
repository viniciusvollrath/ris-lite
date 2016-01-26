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
        var height = $(window).height() - 64;
        $(".admin-side-nav").height(height);
        $(".full-height").css('min-height', height);
        $(".full-height").css('min-height', height);
        var next = $state.$current.name;
        var nextTbl = next.split(".");

        return nextTbl[0] == 'app' && nextTbl[1] == 'admin';

    }
}
