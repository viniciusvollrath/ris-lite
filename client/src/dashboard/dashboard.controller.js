(function() {
    "use strict";

    /**
     * Module: app.dash
     * Controller: DashController
     * Description:
     * 
     */
    angular.module('app.dash')
        .controller('DashboardMainController', DashboardMainController)
        .controller('DashboardQuotationNewController', DashboardQuotationNewController);

    function DashboardMainController($scope, AUTH_EVENTS) {

    }

    function DashboardQuotationNewController(ExamTypeService, ExamMethodService) {
        var vm = this;
        vm.examTypeId = undefined;
        vm.examTypes = undefined;
        vm.examTMethods = undefined;
        ExamTypeService.examTypeList.then(function(types) {
            vm.examTypes = types;
            setTimeout(function() {
                $('#quotationSelectType').material_select();

            }, 200);

        });

        vm.getExamMethods = getExamMethods;

        function getExamMethods(ext) {
            console.log(ext)
                //vm.examTypes = types;
            ExamMethodService.getTypeMethodsList(ext).then(function(response) {
                vm.examTMethods = response
                console.log(vm.examTMethods);
                setTimeout(function() {
                    $('#quotationSelectMethod').material_select();

                }, 1500);
            }, function(error) {
                console.log(error);
            });;



        }

    }

})();
