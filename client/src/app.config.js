(function() {
    "use strict";

    /**
     * Configuration for the  module
     * Description:
     * 
     */
    angular
        .module('app')
        .config(configure);

    configure.$inject = [];

    function configure() {
        console.info("the main app's configuration is runing");
    }

})();
