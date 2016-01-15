(function() {
    "use strict";

    /**
     * Configuration for the  module
     * Description:
     * 
     */
    angular
        .module('app.layout')
        .config(configure);

    configure.$inject = ['$stateProvider'];

    function configure($stateProvider) {
        console.info("the layout configuration is runing");

        $stateProvider
            .state('login', {
                url: '/login',
                views: {

                    // the main template will be placed here (relatively named)
                    '': {
                        templateUrl: 'src/layout/templates/login.layout.html'
                    },

                    // the child views will be defined here (absolutely named)
                    'header@login': {
                        template: 'header'
                    },



                    // for column two, we'll define a separate controller 
                    'footer@login': {
                        template: 'footer'
                    },
                }
            });
    }

})();
