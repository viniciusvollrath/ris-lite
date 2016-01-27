/**
 * Module: app.exam-type
 * Controller: ExamTypeMainController
 * Description:
 * 
 */
angular.module('app.exam-method')
    .controller('ExamMethodMainController', ExamMethodMainController)
    .controller('ExamMethodNewController', ExamMethodNewController);

function ExamMethodMainController(Rest) {
    var vm = this;
    vm.examMethods = undefined;
    Rest.all("examMethodes").customGET("?filter[include][examType]").then(function(methods) {
        vm.examMethods = methods;
        console.log(vm.examMethods);
    });


}

function ExamMethodNewController(ExamTypeService, ExamMethodService) {
    var vm = this;
    vm.name = "";
    vm.examTypeId = "";
    vm.remarque = "";
    vm.reportModel = "";
    vm.conclusionModel = "";
    vm.price = undefined;
    vm.examTypes = undefined;
    ExamTypeService.examTypeList.then(function(types) {
        vm.examTypes = types;
        //console.log(vm.equipmentTypes.length);
        setTimeout(function() {
            $('select').material_select();

        }, 200);

    });


    vm.addNewExamMethod = addNewExamMethod;

    function addNewExamMethod() {
        var examMethod = {
            name: vm.name,
            remarque: vm.remarque,
            reportModel: vm.reportModel,
            conclusionModel: vm.conclusionModel,
            examTypeId: vm.examTypeId,
            price: vm.price
        };
        console.log(examMethod);
        ExamMethodService.addNewExamMethod(examMethod);

    }
}
