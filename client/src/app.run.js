(function() {
    "use strict";

    angular
        .module('app')
        .run(runBlock);

    runBlock.$inject = ['$rootScope', '$state', '$stateParams'];

    function runBlock($rootScope, $state, $stateParams) {
        console.info("the app's runBlock is runing");
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $state.transitionTo('login');
    }
})();
