(function() {
    "use strict";

    angular.module('app.exam')
        .service('ExamService', ExamService);

    function ExamService(Rest, $state) {
        var exam = Rest.all("exams");

        function getTypeMethodsList(ext) {

            return patient.customGET('?filter[where][examTypeId]=' + ext);
        }

        return {
            examList: Rest.all("exams").getList(),
            getTypeMethodsList: getTypeMethodsList,
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
