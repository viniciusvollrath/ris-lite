/**
 * Module: app.patient
 * Controller: PatientMainController
 * Description:
 * 
 */
angular.module('app.patient').controller('PatientMainController', PatientMainController);

function PatientMainController() {
    var vm = this;
    vm.selected = [];
    vm.query = {
        order: 'name',
        limit: 5,
        page: 1
    };
    ExamService.getDetailedList().then(function(list) {
        vm.examList = list;
        console.log(vm.examList);
    });

    vm.onPaginate = function(page, limit) {
        angular.extend({}, $scope.query, {
            page: page,
            limit: limit
        });
    };
}
