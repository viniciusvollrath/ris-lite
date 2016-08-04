(function() {
    "use strict";
    /**
     * Module: app.appointment
     * Controller: AppointmentMainController
     * Description:
     * 
     */
    angular.module('app.appointment')
        .controller('AppointmentMainController', AppointmentMainController)
        .controller('AppointmentNewController', AppointmentNewController);

    function AppointmentMainController($filter, $q, $timeout, $log, MaterialCalendarData) {
        var vm = this;
        vm.selectedDate = null;
        vm.weekStartsOn = 6;
        vm.dayFormat = "d";
        vm.tooltips = true;
        vm.disableFutureDates = false;


        vm.setDirection = setDirection;
        vm.dayClick = dayClick;
        vm.prevMonth = prevMonth;
        vm.nextMonth = nextMonth;
        vm.setContentViaService = setContentViaService;
        vm.setDayContent = setDayContent;

        function setDirection(direction) {
            vm.direction = direction;
            vm.dayFormat = direction === "vertical" ? "EEEE, MMMM d" : "d";
        };

        function dayClick(date) {
            vm.msg = "You clicked " + $filter("date")(date, "MMM d, y h:mm:ss a Z");
            $log.info(date)
        };

        function prevMonth(data) {
            vm.msg = "You clicked (prev) month " + data.month + ", " + data.year;
            $log.info(vm.msg)

        };

        function nextMonth(data) {
            vm.msg = "You clicked (next) month " + data.month + ", " + data.year;
            $log.info(vm.msg)

        };

        function setContentViaService() {
            var today = new Date();
            MaterialCalendarData.setDayContent(today, '<span> :oD </span>')
        }

        vm.events = {
            "2016-02-20": [{
                name: [
                    { name: "ECHO", number: 4 },
                    { name: "SCAN", number: 7 },
                    { name: "IRM", number: 2 },
                    { name: "X-RAY", number: 0 },

                ]


            }]
        };

        // You would inject any HTML you wanted for
        // that particular date here.
        var numFmt = function(num) {
            num = num.toString();
            if (num.length < 2) {
                num = "0" + num;
            }
            return num;
        };

        var loadContentAsync = false;
        $log.info("setDayContent.async", loadContentAsync);

        function setDayContent(date) {
            var key = [date.getFullYear(), numFmt(date.getMonth() + 1), numFmt(date.getDate())].join("-");
            var data = (vm.events[key] || [{ name: "" }])[0].name;
            if (loadContentAsync) {
                var deferred = $q.defer();
                $timeout(function() {
                    deferred.resolve(data);
                });
                return deferred.promise;
            }

            return data;

        };
    }

    function AppointmentNewController(ExamTypeService, PatientService, $timeout, $q, $log, $state, $mdDialog) {
        var vm = this;
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


        //EXAMS SECTION//
        //vm.getExamMethods = getExamMethods;
        vm.querySearch = querySearch;

        vm.addNewExam = addNewExam;
        vm.removeThisExam = removeThisExam;

        vm.setPrice = setPrice;
        vm.setTotal = setTotal;
        vm.typeSelected = typeSelected;
        vm.createExams = createExams;


        //add the price to the selected exams list
        function typeSelected(index) {
            console.log(vm.selectedExams)
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
    }


})();
