(function() {
    "use strict";

    angular.module('app', [
        'ui.router',
        'restangular',
        'angular-loading-bar',
        'ngAnimate',
        'cfp.loadingBar',
        'app.layout',
        'app.auth',
        'app.welcome',
        'app.dash'
    ]);
})();
