/**
 * Module: app.equipment
 * Controller: EquipmentMainController
 * Description:
 * 
 */
angular.module('app.equipment')
    .controller('EquipmentMainController', EquipmentMainController)
    .controller('EquipmentTypeController', EquipmentTypeController)
    .controller('EquipmentTypeNewController', EquipmentTypeNewController);

function EquipmentMainController() {

}


function EquipmentTypeController(EquipmentService) {
    var vm = this;
    vm.equipmentTypeList = EquipmentService.equipmentTypeList;
    console.log(vm.equipmentTypeList);
}

function EquipmentTypeNewController(EquipmentService) {

}
