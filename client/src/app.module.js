(function() {
    "use strict";

    angular.module('app', [
        'ui.router',
        'restangular',
        'angular-loading-bar',
        'ngAnimate',
        'cfp.loadingBar',
        'ncy-angular-breadcrumb',
        'app.layout',
        'app.auth',
        'app.welcome',
        'app.admin',
        'app.dash',
        'app.equipment',
        'app.exam-type',
        'app.exam-method'


    ]);
})();
