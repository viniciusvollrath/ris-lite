/**
 * Module: app.equipment
 * Controller: EquipmentMainController
 * Description:
 * 
 */
angular.module('app.equipment')
    .controller('EquipmentMainController', EquipmentMainController)
    .controller('EquipmentNewController', EquipmentNewController)
    .controller('EquipmentTypeController', EquipmentTypeController)
    .controller('EquipmentTypeNewController', EquipmentTypeNewController);

function EquipmentMainController(Rest) {
    var vm = this;
    vm.equipments = Rest.all("equipment").getList().$object;
    console.log(vm.equipments);
}

function EquipmentNewController(EquipmentService) {
    var vm = this;
    vm.name = "";
    vm.type = "";
    vm.brand = "";
    vm.year = "";
    vm.equipmentTypes = undefined;
    EquipmentService.equipmentTypeList.then(function(types) {
        vm.equipmentTypes = types;
        console.log(vm.equipmentTypes.length);
        setTimeout(function() {
            $('select').material_select();

        }, 200);

    });


    vm.addNewEquipment = addNewEquipment;

    function addNewEquipment() {
        var eq = {
            name: vm.name,
            type: vm.type,
            brand: vm.brand,
            year: vm.year,
            observation: vm.observation
        };
        EquipmentService.addNewEquipment(eq);

    }
}


function EquipmentTypeController(Rest) {
    var vm = this;
    vm.equipmentTypeList = Rest.all("equipmentTypes").getList().$object;
}

function EquipmentTypeNewController(EquipmentService, $state) {
    var vm = this;
    vm.name = "";
    vm.number = null;
    vm.observation = "";
    vm.selected = [];
    vm.query = {
        order: 'name',
        limit: 5,
        page: 1
    };

    vm.onPaginate = function(page, limit) {
        angular.extend({}, $scope.query, {
            page: page,
            limit: limit
        });
    };


    vm.addNewEquipmentType = addNewEquipmentType;

    function addNewEquipmentType() {
        var et = {
            name: vm.name,
            number: vm.number,
            observation: vm.observation
        };
        EquipmentService.addNewEquipmentType(et);

    }
}
