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

function EquipmentMainController($scope, EquipmentService) {
    var vm = this;
    var bookmark;
    vm.equipments = [];
    vm.selected = [];
    vm.filter = {
        options: {
            debounce: 500
        }
    };
    vm.query = {
        order: 'name',
        limit: 5,
        page: 1,
        filter: ''
    };
    vm.onPaginate = onPaginate;
    vm.onReorder = onReorder;
    vm.removeFilter = removeFilter;
    activate();

    function onPaginate(page, limit) {
        vm.query.limit = limit;
        vm.query.page = page;
        equipmentList(vm.query);
    }

    function onReorder(order) {
        vm.query.order = order;
        equipmentList(vm.query);
    }


    function equipmentList() {
        EquipmentService.equipmentListDetails(vm.query).then(function(data) {
            vm.equipments = data;
        }, function(error) {

        });

    }

    function equipmentCount() {
        EquipmentService.count().then(function(data) {
            vm.count = data;
        }, function(error) {

        });
    }

    function removeFilter() {
        vm.filter.show = false;
        vm.query.filter = '';

        if (vm.filter.form.$dirty) {
            vm.filter.form.$setPristine();
        }
    }

    function activate() {
        equipmentList();
        equipmentCount();
    }

    $scope.$watch('equipmentVm.query.filter', function(newValue, oldValue) {
        if (!oldValue) {
            bookmark = vm.query.page;
        }

        if (newValue !== oldValue) {
            vm.query.page = 1;
        }

        if (!newValue) {
            vm.query.page = bookmark;
        }

        activate();
    });
}

function EquipmentNewController(EquipmentService, RoomService) {
    var vm = this;
    vm.name = "";
    vm.type = "";
    vm.roomId = "";
    vm.brand = "";
    vm.year = "";
    vm.types = undefined;
    vm.rooms = undefined;
    vm.addNewEquipment = addNewEquipment;

    EquipmentService.equipmentTypeList.then(function(types) {
        vm.types = types;
        console.log(vm.types.length);

    });
    RoomService.roomList.then(function(rooms) {
        vm.rooms = rooms;
        console.log(vm.rooms.length);

    });



    function addNewEquipment() {
        var eq = {
            name: vm.name,
            equipmentTypeId: vm.type,
            roomId: vm.roomId,
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
