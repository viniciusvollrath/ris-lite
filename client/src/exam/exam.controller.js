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

    function ExamMainController(ExamService, $state) {
        var vm = this;
        vm.selected = [];
        vm.query = {
            order: 'name',
            limit: 5,
            page: 1
        };
        activate();
        vm.loadAll = loadAll;
        vm.viewExamDetails = viewExamDetails;

        function activate() {
            loadAll();
        }

        function loadAll() {

            ExamService.getDetailedList().then(function(list) {
                vm.examList = list;
                console.log(vm.examList);
            });

        }

        function viewExamDetails(id) {
            $state.go('app.exam.details', { examId: id });
        }

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
            ExamTypeService.list().then(function(types) {
                vm.types = types.plain();
                //return types;

            }, function(error) {

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

    function ExamInterpretationController($scope, ExamService, ExamTypeService, $window, $document, $stateParams, $state, $timeout, $mdToast, store, recorderService, BASE_URL) {
        var vm = this;
        vm.examId = $stateParams.examId;
        vm.selectedExam = $stateParams.exam;
        vm.pathologyModels = [];
        vm.selectedPathology = '';
        vm.audioFileUrl = '';
        vm.displayAudioPlayer = false;
        activate();

        vm.getExamDetails = getExamDetails;
        vm.getPathologyModels = getPathologyModels;
        vm.updateReportModel = updateReportModel;
        vm.saveAudioRecording = saveAudioRecording;
        vm.recordNewAudio = recordNewAudio;
        vm.saveAndContinue = saveAndContinue;
        vm.saveAndClose = saveAndClose;
        vm.markAsExecuted = markAsExecuted;
        vm.preview = preview;
        vm.deliver = deliver;
        vm.print = print;


        function getExamDetails(id) {
            ExamService.getExamDetails(id).then(function(exam) {
                vm.selectedExam = exam;
                // store.set('selectedExamForInterpretation', vm.selectedExam);
                getPathologyModels();
                if (vm.selectedExam.hasAudio == true) {
                    vm.audioFileUrl = BASE_URL + "containers/exam-results-audio/download/" + vm.selectedExam.id + ".mp3";
                    vm.displayAudioPlayer = true;
                    console.log('display Audio Player');
                }

            });
        }

        function getPathologyModels() {
            ExamTypeService.getPathologyModels(vm.selectedExam.examTypeId)
                .then(function(pathologies) {
                    vm.pathologyModels = pathologies;
                }, function(error) {
                    console.log(error);
                });
        }

        function updateReportModel() {
            vm.selectedExam.interpretation = vm.selectedPathology;
        }

        function activate() {
            getExamDetails(vm.examId);

        }

        function saveAudioRecording() {
            console.log("saving audio");
            // var recorder = recorderService.controller('mainAudio');
            // recorder.save();
            vm.selectedExam.hasAudio = true;
            ExamService.saveAudioInterpretation(vm.selectedExam).then(function(ex) {
                vm.selectedExam = ex;
                if (vm.selectedExam.hasAudio == true) {
                    vm.audioFileUrl = BASE_URL + "containers/exam-results-audio/download/" + vm.selectedExam.id + ".mp3";
                    vm.displayAudioPlayer = true;
                    console.log('display Audio Player');
                }
                console.log(ex);
            }, function(err) {

            });
            //need to handle erros
            $mdToast.show(
                $mdToast.simple()
                .textContent('Audio Recording Saved')
                .position('bottom right')
                .hideDelay(1000)
            );



        }

        $scope.$on('audioSaved', function(event, data) {
            saveAudioRecording();

        });

        function recordNewAudio() {
            vm.displayAudioPlayer = false;
        }

        function markAsExecuted() {
            vm.selectedExam.status = "EXECUTED";
            vm.selectedExam.save();
        }

        function saveAndContinue() {
            console.log('save')
            console.log(vm.selectedExam)
            vm.selectedExam.save();



            $mdToast.show(
                $mdToast.simple()
                .textContent('Exam Saved')
                .position('bottom right')
                .hideDelay(1000)
            );

            // ExamService.saveInterpretation(data).then(function(exam) {

            // });


        }

        function saveAndClose() {
            vm.saveAndContinue();
            $state.go('app.exam');
        }

        function preview() {
            $window.open('/print?id=' + vm.selectedExam.id, '_blank');
        }

        function deliver() {
            vm.selectedExam.status = "DELIVERED";
            vm.selectedExam.save();
            $state.go('app.exam');
            $mdToast.show(
                $mdToast.simple()
                .textContent('Exam saved and delivered')
                .position('bottom right')
                .hideDelay(1000)
            );

        }

        function print() {
            $window.open('/print?id=' + vm.selectedExam.id, '_blank');

        }


    }

    function ExamDetailsController() {

    }

    function ExamEditController() {

    }

    function ExamPreviewController() {

    }



})();
