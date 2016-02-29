(function() {
    "use strict";

    angular.module('app')
        .factory('Rest', Rest)
        .factory('ProdRestangular', ProdRestangular);

    function Rest(Restangular, BASE_URL) {
        return Restangular.withConfig(function(RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl(BASE_URL);
        });
    }

    function ProdRestangular(Restangular, BASE_URL) {
        return Restangular.withConfig(function(RestangularConfigurer) {
            //var token = window.localStorage.getItem("yourTokenKey");
            RestangularConfigurer.setBaseUrl(BASE_URL);
            RestangularConfigurer.setDefaultHeaders({
                "X-Access-Token": token,
            });
        });
    }


})();
