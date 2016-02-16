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
        .controller('ExamInterpretationController', ExamInterpretationController);

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

    function ExamNewController(ExamTypeService, ExamMethodService, PatientService, $timeout, $q, $log, $state, $mdDialog) {
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
        vm.getExamMethods = getExamMethods;
        vm.querySearch = querySearch;

        vm.addNewExam = addNewExam;
        vm.removeThisExam = removeThisExam;

        vm.setPrice = setPrice;
        vm.setTotal = setTotal;
        vm.methodSelected = methodSelected;
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
        function methodSelected(index) {
            if (vm.selectedExams[index].selectedExamMethod.remarque != '' && vm.selectedExams[index].selectedExamMethod.remarque != 'ras') {
                $mdDialog.show(
                    $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('WARNING: This Exam requires a special preparation')
                    .textContent(vm.selectedExams[index].selectedExamMethod.remarque)
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Got it!')
                );
            };
            setPrice()


        }

        function setPrice() {
            for (var i = vm.selectedExams.length - 1; i >= 0; i--) {

                vm.selectedExams[i].price = vm.selectedExams[i].selectedExamMethod.dayPrice;
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

        //retrive the exam methods list 
        function getExamMethods(ext, id) {
            ExamMethodService.getTypeMethodsList(ext).then(function(response) {
                vm.examMethods[id] = response.plain();
                console.log(vm.examMethods[id]);
            }, function(error) {
                console.log(error);
            });;

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
                    examMethodId: vm.selectedExams[i].selectedExamMethod.id,
                    examTypeId: vm.selectedExams[i].selectedExamType.id,
                    emergencyLevel: vm.emergencyLevel
                });

            }

            console.log(data);
            PatientService.addPatientAndExams(data);

        }


    }

    function ExamInterpretationController(ExamService) {
        var vm = this;

        vm.results = "Shewing met parties gravity husband sex pleased. On to no kind do next feel held walk. Last own loud and knew give gay four. Sentiments motionless or principles preference excellence am. Literature surrounded insensible at indulgence or to admiration remarkably. Matter future lovers desire marked boy use. Chamber reached do he nothing be. Ignorant branched humanity led now marianne too strongly entrance.Rose to shew bore no ye of paid rent form.Old design are dinner better nearer silent excuse.She which are maids boy sense her shade.Considered reasonable we affronting on expression in .So cordial anxious mr delight.Shot his has must wish from sell nay.Remark fat set why are sudden depend change entire wanted.Performed remainder attending led fat residence far.Itif sometimes furnished unwilling as additions so.Blessing resolved peculiar fat graceful ham.Sussex on at really ladies in as elinor.Sir sex opinions age properly extended.Advice branch vanity or do thirty living.Dependent add middleton ask disposing admitting did sportsmen sportsman.Or neglected agreeable of discovery concluded oh it sportsman.Week to time in john.Son elegance use weddings separate.Ask too matter formed county wicket oppose talent.He immediate sometimes or to dependent in .Everything few frequently discretion surrounded did simplicity decisively.Less he year do with no sure loud.Man request adapted spirits set pressed.Up to denoting subjects sensible feelings it indulged directly.We dwelling elegance do shutters appetite yourvm diverted.Our next drew much you with rank.Tore many held age hold rose than our.She literature sentiments any contrasted.Set aware joy sense young now tears china shy.At distant inhabit amongst by.Appetite welcomed interest the goodness boy not.Estimable educationfor disposing pronounce her.John size good gay plan sent old roof own.Inquietude saw understood his friendship frequently yet.Nature his marked ham wished.Dispatched entreaties boisterous say why stimulated.Certain forbade picture now prevent carried she get see sitting.Up twenty limits as months.Inhabit so perhaps of in to certain.Sex excuse chatty was seemed warmth.Nay add far few immediate sweetness earnestly dejection.";
    }



})();
