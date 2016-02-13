/**
 * Module: app.exam-type
 * Controller: ExamTypeMainController
 * Description:
 * 
 */
angular.module('app.exam-method')
    .controller('ExamMethodMainController', ExamMethodMainController)
    .controller('ExamMethodNewController', ExamMethodNewController);

function ExamMethodMainController($scope, ExamMethodService, ExamTypeService) {
    var vm = this;
    var bookmark;
    vm.examMethods = [];
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
        filter: '',
        examTypeId: ''
    };
    vm.onPaginate = onPaginate;
    vm.onReorder = onReorder;
    vm.removeFilter = removeFilter;
    vm.removeexamTypeFilter = removeexamTypeFilter;
    vm.filterByEquipmentType = filterByEquipmentType;
    activate();

    function onPaginate(page, limit) {
        vm.query.limit = limit;
        vm.query.page = page;
        examMethodList();
    }

    function onReorder(order) {
        vm.query.order = order;
        examMethodList();
    }


    function examMethodList() {
        ExamMethodService.examMethodListDetails(vm.query).then(function(data) {
            vm.examMethods = data;
        }, function(error) {

        });

    }

    function examMethodCount() {
        ExamMethodService.count().then(function(data) {
            vm.count = data;
            console.log(data);
        }, function(error) {

        });
    }

    function equipmentTyoeList() {
        ExamTypeService.examTypeList().then(function(data) {
            vm.examTypes = data;
        }, function(error) {

        });

    }

    function filterByEquipmentType() {
        examMethodList();
    }

    function removeFilter() {
        vm.filter.show = false;
        vm.query.filter = '';

        if (vm.filter.form.$dirty) {
            vm.filter.form.$setPristine();
        }
    }

    function removeexamTypeFilter() {
        vm.filter.show = false;
        vm.query.examTypeId = '';

        if (vm.filter.form.$dirty) {
            vm.filter.form.$setPristine();
        }
        examMethodList();
    }

    function activate() {
        examMethodList();
        examMethodCount();
        equipmentTyoeList()
    }

    $scope.$watch('exameMethodVm.query.filter', function(newValue, oldValue) {
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

function ExamMethodNewController(ExamTypeService, ExamMethodService) {
    var vm = this;
    vm.exMethod = {};
    vm.exMethod.resultModels = [{}];
    vm.examTypes = undefined;
    ExamTypeService.examTypeList().then(function(data) {
        vm.examTypes = data;
    }, function(error) {

    });


    vm.addNewExamMethod = addNewExamMethod;

    function addNewExamMethod() {

        ExamMethodService.addNewExamMethod(vm.exMethod);

    }
}
