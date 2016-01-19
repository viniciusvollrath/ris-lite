/**
 * Module: app.exam-type
 * Controller: ExamTypeMainController
 * Description:
 * 
 */
angular.module('app.exam-type')
    .controller('ExamTypeMainController', ExamTypeMainController)
    .controller('ExamTypeNewController', ExamTypeNewController);

function ExamTypeMainController(Rest) {
    var vm = this;
    vm.examTypes = undefined;
    Rest.all("examTypes").customGET("?filter[include][equipmentType]").then(function(types) {
        vm.examTypes = types;
        console.log(vm.examTypes);
    });
    // Rest.all("examTypes").customGET("findAll", "filter[include][equipmentType]");

}

function ExamTypeNewController(ExamTypeService, EquipmentService) {
    var vm = this;
    vm.name = "";
    vm.equipmentTypeId = "";
    vm.description = "";
    vm.equipmentTypes = undefined;
    EquipmentService.equipmentTypeList.then(function(types) {
        vm.equipmentTypes = types;
        //console.log(vm.equipmentTypes.length);
        setTimeout(function() {
            $('select').material_select();

        }, 200);

    });


    vm.addNewExamType = addNewExamType;

    function addNewExamType() {
        var examType = {
            name: vm.name,
            equipmentTypeId: vm.equipmentTypeId,
            description: vm.description
        };
        console.log(examType);
        ExamTypeService.addNewExamType(examType);

    }
}
