(function() {
    "use strict";

    /**
     * Module: app.dash
     * Controller: DashController
     * Description:
     * 
     */
    angular.module('app.dash')
        .controller('DashboardMainController', DashboardMainController)
        .controller('DashboardQuotationNewController', DashboardQuotationNewController)
        .controller('DashboardQuotationPatientController', DashboardQuotationPatientController);

    function DashboardMainController($scope) {

    }
    // MOVE ALL THE LOGIQUE TO A SERVICE
    function DashboardQuotationNewController(ExamTypeService, ExamMethodService, store, $state) {
        var vm = this;
        vm.simulateQuery = false;
        vm.isDisabled = false;
        vm.examTypeId = undefined;
        vm.examTypes = undefined;
        vm.examTMethods = undefined;
        vm.total = 0;


        vm.getExamMethods = getExamMethods;
        vm.types = null;
        loadAll();
        vm.selectedExamType = null;
        vm.searchExamType = null;
        vm.querySearch = querySearch;
        //list of selected exams with all the details
        vm.selectedExams = [{}];

        vm.addNewExam = addNewExam;
        vm.removeThisExam = removeThisExam;

        vm.setPrice = setPrice;
        vm.setTotal = setTotal;
        vm.goToNextStep = goToNextStep;
        //add the price to the selected exams list
        function setPrice() {

            for (var i = vm.selectedExams.length - 1; i >= 0; i--) {

                vm.selectedExams[i].price = vm.selectedExams[i].selectedExamMethod.price;
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
                vm.selectedExams[id].examMethods = response;
            }, function(error) {
                console.log(error);
            });;

        }

        function querySearch(query) {
            if (query != '') {
                var results = query ? vm.types.filter(createFilterFor(query)) : [];
                console.log(query);
                console.log(results);
                return results;
            } else {
                var results = vm.types;
                console.log(query);
                console.log(results);
                return results;
            }
        }
        /**
         * Build `types` list of key/value pairs
         */
        function loadAll() {
            ExamTypeService.examTypeList.then(function(types) {
                vm.types = types;
                //return types;

            });
        }
        /**
         * To be updated
         */
        function createFilterFor(query) {
            //var lowercaseQuery = angular.lowercase(query);
            return function filterFn(state) {
                console.log(state)
                console.log(state.name.indexOf(query) === 0)
                if (query != '') {
                    return (state.name.indexOf(query) === 0);

                } else {
                    return true;

                }
            };
        }

        function goToNextStep() {
            store.set('examsList', vm.selectedExams);
            $state.go('dashboard.quotation.patient');

        }

    }

    function DashboardQuotationPatientController($state, store, PatientService) {
        var vm = this;
        vm.patient = {};
        vm.selectedExamsTotal = 0;
        vm.selectedExams = store.get('examsList');
        console.log(vm.selectedExams);
        for (var i = vm.selectedExams.length - 1; i >= 0; i--) {
            vm.selectedExamsTotal = vm.selectedExamsTotal + vm.selectedExams[i].price;
        };

        vm.addNewPatient = addNewPatient;
        vm.addPatientAndExams = addPatientAndExams;

        function addNewPatient() {
            PatientService.addNewPatient(vm.patient);
            $state.go('dashboard.main');
        }

        function addPatientAndExams() {
            var data = {};
            data.patient = vm.patient;
            data.exams = [];


            for (var i = vm.selectedExams.length - 1; i >= 0; i--) {
                data.exams.push({
                    price: vm.selectedExams[i].price,
                    examMethodeId: vm.selectedExams[i].selectedExamMethod.id,
                    examTypeId: vm.selectedExams[i].selectedExamType.id
                });

            }


            PatientService.addPatientAndExams(data);
            $state.go('dashboard.main');
        }


    }

})();
