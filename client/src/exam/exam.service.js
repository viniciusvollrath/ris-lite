(function() {
    "use strict";

    angular.module('app.exam')
        .service('ExamService', ExamService);

    function ExamService(Rest, $state) {
        var exam = Rest.all("exams");

        function getDetailedList() {

            return exam.customGET('?filter[include]=examType&filter[include]=examMethode&filter[include]=patient')
        }

        return {
            examList: Rest.all("exams").getList(),
            getDetailedList: getDetailedList,
            addNewExam: function(ex) {
                return patient.post(ex).then(function(response) {
                    //examMethod.getList().push(response);
                    // console.log(response);
                    //$state.go('dashboard');


                }, function(error) {
                    console.log(error);
                });
            },
            addMultipleExams: function(ex) {
                return patient.customPOST('createMultiple', ex).then(function(response) {
                    //examMethod.getList().push(response);
                    // console.log(response);
                    //$state.go('dashboard');


                }, function(error) {
                    console.log(error);
                });
            }

        }
    }
})();
