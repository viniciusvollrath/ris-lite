(function() {
    "use strict";

    angular.module('app.exam')
        .service('ExamService', ExamService);

    function ExamService(Rest, $state) {
        var exam = Rest.all("exams");
        var patient = Rest.all("patients");


        return {
            examList: Rest.all("exams").getList(),
            getExamDetails: getExamDetails,
            getDetailedList: getDetailedList,
            addNewExam: addNewExam,
            addMultipleExams: addMultipleExams,
            saveInterpretation: saveInterpretation

        };

        function getDetailedList() {

            return exam.customGET('?filter[include]=examType&filter[include]=patient')
        }

        function getExamDetails(id) {
            var ex = Rest.one("exams", id);
            return ex.customGET('?filter[where][id]=' + id + '&filter[include]=examType&filter[include]=patient')

        }

        function addNewExam(ex) {
            return patient.post(ex).then(function(response) {
                //examMethod.getList().push(response);
                // console.log(response);
                //$state.go('dashboard');


            }, function(error) {
                console.log(error);
            });
        }

        function addMultipleExams(ex) {
            return patient.customPOST('createMultiple', ex).then(function(response) {
                //examMethod.getList().push(response);
                // console.log(response);
                //$state.go('dashboard');


            }, function(error) {
                console.log(error);
            });
        }

        function saveInterpretation(exam) {
            return exam.customPOST('saveInterpretation', exam).then(function(response) {

            }, function(error) {


            });
        }
    }
})();
