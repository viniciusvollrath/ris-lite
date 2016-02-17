(function() {
    "use strict";

    /**
     * Module: app.exam
     * Controller: ExamMainController
     * Description:
     * 
     */
    angular.module('app.exam')
        .controller('ExamMainController', ExamMainController)
        .controller('ExamNewController', ExamNewController)
        .controller('ExamInterpretationController', ExamInterpretationController)
        .controller('ExamDetailsController', ExamDetailsController)
        .controller('ExamEditController', ExamEditController)
        .controller('ExamPreviewController', ExamPreviewController);

    function ExamMainController(ExamService) {
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

    function ExamNewController(ExamTypeService, PatientService, $timeout, $q, $log, $state, $mdDialog) {
        var vm = this;

        //patient section
        vm.simulateQuery = false;
        vm.isDisabled = false;
        vm.patientSelected = false;
        vm.newPatient = false;
        vm.patient = {};
        vm.patients = [];

        //EXAMS SECTION//
        vm.examTypeId = undefined;
        vm.examTypes = undefined;
        vm.examMethods = [];
        vm.total = 0;
        vm.types = null;
        loadAll();

        vm.selectedExamType = null;
        vm.searchExamType = null;
        //list of selected exams with all the details
        vm.selectedExams = [{}];


        vm.searchTextChange = searchTextChange;
        vm.selectedPatientChange = selectedPatientChange;
        vm.addNewPatient = addNewPatient;
        vm.editPatient = editPatient;

        //EXAMS SECTION//
        //vm.getExamMethods = getExamMethods;
        vm.querySearch = querySearch;

        vm.addNewExam = addNewExam;
        vm.removeThisExam = removeThisExam;

        vm.setPrice = setPrice;
        vm.setTotal = setTotal;
        vm.typeSelected = typeSelected;
        vm.createExams = createExams;
        vm.addPatientAndExams = addPatientAndExams;


        //when the search text changes, query for new results
        function searchTextChange(text) {
            PatientService.findPatient(text).then(function(data) {
                vm.patients = data;
            }, function(error) {

            });
        }

        //updates when the patients name is either selected or entered
        function selectedPatientChange() {
            if (vm.selectedPatient == null) {
                console.log('no selected item create new one');
                vm.patientSelected = false;
                vm.newPatient = false;

                vm.patient = {};
            } else {
                console.log('selected item' + vm.selectedPatient);
                vm.patient = vm.selectedPatient;
                vm.patientSelected = true;
                vm.newPatient = false;


            }
        }
        // add new patient
        function addNewPatient() {
            vm.patientSelected = true;
            vm.newPatient = true;
            //PatientService.addNewPatient(vm.patient);
            //$state.go('app.dashboard.main');
        }

        function editPatient() {
            vm.patientSelected = false;
            vm.newPatient = false;
        }


        //add the price to the selected exams list
        function typeSelected(index) {
            if (vm.selectedExams[index].selectedExamType.remarque != '' && vm.selectedExams[index].selectedExamType.remarque != 'ras') {
                $mdDialog.show(
                    $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('WARNING: This Exam requires a special preparation')
                    .textContent(vm.selectedExams[index].selectedExamType.remarque)
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Got it!')
                );
            };
            setPrice()


        }

        function setPrice() {
            for (var i = vm.selectedExams.length - 1; i >= 0; i--) {

                vm.selectedExams[i].price = vm.selectedExams[i].selectedExamType.dayPrice;
                setTotal();


            };
        }
        // calculate the total price of all the selected exams on every change
        function setTotal() {
            vm.total = 0;
            for (var i = vm.selectedExams.length - 1; i >= 0; i--) {
                vm.total = vm.total + vm.selectedExams[i].price;
            };

        }
        // remove selected exam from list
        function removeThisExam(id) {
            vm.selectedExams.splice(id, 1);
            setTotal();
        }
        //add new row to selected exams
        function addNewExam() {
            vm.selectedExams.push({});
        }

        function querySearch(query) {
            if (query != '') {
                var results = query ? vm.types.filter(createFilterFor(query)) : [];
                // console.log(query);

                return results;
            } else {
                var results = vm.types;

                return results;
            }
        }
        /**
         * Build `types` list of key/value pairs
         */
        function loadAll() {
            ExamTypeService.list.then(function(types) {
                vm.types = types.plain();
                //return types;

            });
        }
        /**
         * To be updated
         */
        function createFilterFor(query) {
            //var lowercaseQuery = angular.lowercase(query);
            return function filterFn(state) {
                if (query != '') {
                    return (state.name.indexOf(query) === 0);

                } else {
                    return true;

                }
            };
        }

        function createExams() {
            console.log(vm.patient);
            console.log(vm.selectedExams);
            //$state.go('app.dashboard.main.quotation.patient');

        }

        function addPatientAndExams() {
            var data = {};
            data.patient = vm.patient;
            data.exams = [];


            for (var i = vm.selectedExams.length - 1; i >= 0; i--) {
                data.exams.push({
                    price: vm.selectedExams[i].price,
                    examTypeId: vm.selectedExams[i].selectedExamType.id,
                    emergencyLevel: vm.emergencyLevel
                });

            }

            console.log(data);
            PatientService.addPatientAndExams(data);

        }


    }

    function ExamInterpretationController(ExamService, $stateParams) {
        var vm = this;
        vm.examId = $stateParams.examId;
        console.log(vm.examId)
        vm.selectedExam = $stateParams.exam;
        activate();

        vm.getExamDetails = getExamDetails;
        vm.saveAndContinue = saveAndContinue;
        vm.saveAndClose = saveAndClose;
        vm.preview = preview;
        vm.deliver = deliver;
        vm.print = print;


        function getExamDetails(id) {
            ExamService.getExamDetails(id).then(function(exam) {
                vm.selectedExam = exam.plain();
                vm.selectedExam = vm.selectedExam[0];
                console.log(vm.selectedExam);
            });
        }

        function activate() {
            getExamDetails(vm.examId);
        }

        function saveAndContinue() {

        }

        function saveAndClose() {

        }

        function preview() {

        }

        function deliver() {

        }

        function print() {

        }


    }

    function ExamDetailsController() {

    }

    function ExamEditController() {

    }

    function ExamPreviewController() {

    }



})();
