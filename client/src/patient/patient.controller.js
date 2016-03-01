/**
 * Module: app.patient
 * Controller: PatientMainController
 * Description:
 * 
 */
angular.module('app.patient').controller('PatientMainController', PatientMainController);

function PatientMainController(PatientService) {
    var vm = this;
    vm.patientList = [];
    vm.selectedPatient = {};
    vm.query = {
        order: 'firstName',
        limit: 5,
        page: 1
    };
    activate();

    vm.getPatientList = getPatientList;

    function activate() {
        getPatientList();
    }

    function getPatientList() {

        PatientService.patientList().then(function(list) {
            vm.patientList = list;
            console.log(vm.patientList);
        });
    }

    vm.onPaginate = function(page, limit) {
        angular.extend({}, $scope.query, {
            page: page,
            limit: limit
        });
    };
}
