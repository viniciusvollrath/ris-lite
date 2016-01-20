(function() {
    "use strict";

    angular.module('app.exam-method')
        .service('ExamMethodService', ExamMethodService);

    function ExamMethodService(Rest, $state) {
        var examMethod = Rest.all("examMethodes");

        return {
            addNewExamMethod: function(exm) {
                return examMethod.post(exm).then(function(response) {
                    //examMethod.getList().push(response);
                    // console.log(response);
                    $state.go('dashboard.admin.exam-method');

                }, function(response) {
                    console.log(response);
                });
            }

        }
    }
})();
