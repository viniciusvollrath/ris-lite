/**
 * Module: app.exam-type
 * Controller: ExamTypeMainController
 * Description:
 * 
 */
angular.module('app.exam-type')
    .controller('ExamTypeMainController', ExamTypeMainController)
    .controller('ExamTypeNewController', ExamTypeNewController);

function ExamTypeMainController($scope, ExamTypeService) {
    var vm = this;
    var bookmark;
    vm.examTypes = [];
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
        examTypeList(vm.query);
    }

    function onReorder(order) {
        vm.query.order = order;
        examTypeList(vm.query);
    }


    function examTypeList() {
        ExamTypeService.examTypeListDetails(vm.query).then(function(data) {
            vm.examTypes = data;
        }, function(error) {

        });

    }

    function examTypeCount() {
        ExamTypeService.count().then(function(data) {
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
        examTypeList();
        examTypeCount();
    }

    $scope.$watch('examTypeVm.query.filter', function(newValue, oldValue) {
        console.log("changed");
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

function ExamTypeNewController(ExamTypeService, EquipmentService) {
    var vm = this;
    vm.exType = {};
    vm.exType.resultModels = [];
    vm.equipmentTypes = undefined;
    EquipmentService.equipmentTypeList.then(function(types) {
        vm.equipmentTypes = types;

    });


    vm.addNewExamType = addNewExamType;
    vm.addNewModel = addNewModel;
    vm.removeModel = removeModel;

    function addNewExamType() {
        ExamTypeService.addNewExamType(vm.exType);

    }

    function addNewModel() {
        vm.exType.resultModels.push({});
    }

    function removeModel(id) {
        vm.exType.resultModels.splice(id, 1);
    }

}
