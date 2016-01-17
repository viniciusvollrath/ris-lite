(function() {
    "use strict";

    angular.module('app', [
        'ui.router',
        'restangular',
        'app.auth',
        'app.welcome',
        'app.dash'
    ]);
})();
