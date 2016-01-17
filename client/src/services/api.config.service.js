(function() {
    "use strict";

    angular.module('app')
        .factory('DevRestangular', DevRestangular)
        .factory('ProdRestangular', ProdRestangular);

    function DevRestangular(Restangular) {
        return Restangular.withConfig(function(RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl('http://0.0.0.0:3000/api');
        });
    }

    function ProdRestangular(Restangular) {
        return Restangular.withConfig(function(RestangularConfigurer) {
            //var token = window.localStorage.getItem("yourTokenKey");
            RestangularConfigurer.setBaseUrl('http://0.0.0.0:3000/api');
            RestangularConfigurer.setDefaultHeaders({
                "X-Access-Token": token,
            });
        });
    }


})();
