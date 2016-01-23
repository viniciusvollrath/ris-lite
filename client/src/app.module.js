(function() {
    "use strict";

    angular.module('app', [
        'ui.router',
        'ngMaterial',
        'ngMessages',
        'restangular',
        'angular-loading-bar',
        'angular-storage',
        'ngAnimate',
        'cfp.loadingBar',
        'ncy-angular-breadcrumb',
        'ui.select',
        'md.data.table',
        'ngSanitize',
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
