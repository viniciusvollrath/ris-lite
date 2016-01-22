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
        .controller('DashboardQuotationNewController', DashboardQuotationNewController);

    function DashboardMainController($scope, AUTH_EVENTS) {

    }

    function DashboardQuotationNewController(ExamTypeService, ExamMethodService, $log) {
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

        vm.selectedExams = [{}];

        vm.addNewExam = addNewExam;
        vm.removeThisExam = removeThisExam;

        vm.setPrice = setPrice;
        vm.setTotal = setTotal;

        function setPrice() {
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
            for (var i = vm.selectedExams.length - 1; i >= 0; i--) {

                vm.selectedExams[i].price = vm.selectedExams[i].selectedExamMethod.price;
                setTotal();
                // vm.total = vm.total + vm.selectedExams[i].price;

            };

        }

        function setTotal() {
            console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
            console.log(vm.selectedExams);
            vm.total = 0;

            for (var i = vm.selectedExams.length - 1; i >= 0; i--) {

                // vm.selectedExams[i].price = vm.selectedExams[i].selectedExamMethod.price
                vm.total = vm.total + vm.selectedExams[i].price;

            };

        }

        function removeThisExam(id) {
            vm.selectedExams.splice(id, 1);
            setTotal();

        }

        function addNewExam() {
            vm.selectedExams.push({});
            //setTotal();

        }

        function newState(state) {
            alert("Sorry! You'll need to create a Constituion for " + state + " first!");
        }

        function getExamMethods(ext, id) {
            console.log(ext)
                //vm.examTypes = types;
            ExamMethodService.getTypeMethodsList(ext).then(function(response) {
                vm.selectedExams[id].examMethods = response;
                //vm.types = response;
                //console.log(vm.examMethods);

            }, function(error) {
                console.log(error);
            });;



        }

        // ******************************
        // Internal methods
        // ******************************
        /**
         * Search for types... use $timeout to simulate
         * remote dataservice call.
         */
        function querySearch(query) {
            console.log(query);
            var results = query ? vm.types.filter(createFilterFor(query)) : [];
            console.log(results);
            return results;
        }
        /**
         * Build `types` list of key/value pairs
         */
        function loadAll() {
            // var alltypes = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
            //   Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
            //   Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
            //   Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
            //   North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
            //   South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
            //   Wisconsin, Wyoming';
            console.log("loaaaaaaaaaaaaading");
            ExamTypeService.examTypeList.then(function(types) {
                vm.types = types;
                //return types;
                console.log(types);

            });
            // return alltypes.split(/, +/g).map(function(state) {
            //     return {
            //         value: state.toLowerCase(),
            //         display: state
            //     };
            // });
        }
        /**
         * To be updated
         */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(state) {
                return (state.name.indexOf(query) === 0);
            };
        }

    }

})();
