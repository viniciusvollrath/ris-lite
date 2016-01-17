(function() {
    "use strict";

    angular
        .module('app.welcome')
        .run(runBlock);

    runBlock.$inject = ['$rootScope', '$state', '$stateParams', 'AUTH_EVENTS', 'AuthService'];

    function runBlock($rootScope, $state, $stateParams, AUTH_EVENTS, AuthService) {}

})();
