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
        .controller('PatientNewController', PatientNewController)
        .controller('PatientExamHistoryController', PatientExamHistoryController)
        .controller('PatientDetailsController', PatientDetailsController);

    function PatientMainController(PatientService, $state) {
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
        vm.viewPatientDetails = viewPatientDetails;

        function activate() {
            getPatientList();
        }

        function getPatientList() {

            PatientService.patientList().then(function(list) {
                vm.patientList = list;
                console.log(vm.patientList);
            });
        }

        function viewPatientDetails(id){
            $state.go('app.patient.details', { patientId: id });
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

    function PatientExamHistoryController(PatientService, $stateParams) {
        var vm = this;
        vm.patientId = $stateParams.patientId;
        vm.examsList = [];
        activate();
        vm.getExamHistory = getExamHistory;

        function getExamHistory() {
            PatientService.getPatientHistory(vm.patientId)
                .then(function(examsList) {
                    vm.examsList = examsList;
                    console.log(examsList);
                }, function(error) {
                    console.log(error);
                })
        }

        function activate() {
            getExamHistory();
        }
    }

    function PatientDetailsController() {

    }
})();
