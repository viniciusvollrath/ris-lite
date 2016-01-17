(function() {
    "use strict";

    /**
     * Configuration for the  module
     * Description:
     * 
     */
    angular
        .module('app.welcome')
        .config(configure);


    configure.$inject = ['$stateProvider', 'USER_ROLES'];

    function configure($stateProvider, USER_ROLES) {
        console.info("the welcome configuration is runing");

        $stateProvider
            .state('welcome', {
                url: '/welcome',
                views: {
                    '': {
                        templateUrl: 'src/layout/templates/welcome.layout.html'
                    },
                    'form@welcome': {
                        templateUrl: 'src/common/welcome/welcome.view.html'
                    }
                }
            });
    }

})();
