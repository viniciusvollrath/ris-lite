(function() {
    "use strict";

    angular
        .module('app')
        .run(runBlock);

    runBlock.$inject = ['$rootScope', '$state', '$stateParams', 'AUTH_EVENTS', 'AuthService'];

    function runBlock($rootScope, $state, $stateParams, AUTH_EVENTS, AuthService) {
        console.info("the app's runBlock is runing");
        // $rootScope.$state = $state;
        // $rootScope.$stateParams = $stateParams;
        //$state.transitionTo('login');


        $rootScope.$on('$stateChangeStart', function(event, next, nextParams, fromState) {
            console.log(next);
            if ('data' in next && 'authorizedRoles' in next.data) {
                var authorizedRoles = next.data.authorizedRoles;
                if (!AuthService.isAuthorized(authorizedRoles)) {
                    event.preventDefault();
                    console.log($state.current);
                    if ($state.current.views != null) {
                        $state.go($state.current, {}, {
                            reload: true
                        });
                    } else {
                        $state.go('login', {}, {
                            reload: true
                        });
                    }

                    $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                    console.log("NOT AUTHORIZED");
                }
            }

            if (!AuthService.isAuthenticated()) {
                console.log("NOT AUTHENTICATED");
                if (next.name !== 'login') {
                    event.preventDefault();
                    $state.go('login');
                    console.log("GO TO LOGIN");

                }
            }
        });



    }
})();
