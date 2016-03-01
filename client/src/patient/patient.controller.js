(function() {
    "use strict";

    /**
     * Module: app.patient
     * Controller: PatientMainController
     * Description:
     * 
     */
    angular.module('app.patient')
        .controller('PatientMainController', PatientMainController)
        .controller('PatientNewController', PatientNewController);

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

    function PatientNewController(PatientService, $state) {
        var vm = this;

        vm.patient = {};

        vm.addNewPatient = addNewPatient;

        function addNewPatient() {
            PatientService.addNewPatient(vm.patient).then(function(data) {
                console.log('patient successfully created');
                $state.go('app.patient');
            }, function(err) {

            })
        }

    }
})();
