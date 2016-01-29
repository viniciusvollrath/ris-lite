(function() {
    "use strict";

    angular.module('app.exam-type')
        .service('ExamTypeService', ExamTypeService);

    function ExamTypeService(Rest, $state) {
        var examType = Rest.all("examTypes");

        return {
            examTypeList: Rest.all("examTypes").getList(),
            addNewExamType: function(et) {
                return examType.post(et).then(function(response) {
                    examType.getList().push(response);
                    console.log(response);
                    $state.go('app.setting.exam-type');

                }, function(response) {
                    console.log("Error with status code", response.status);
                });
            }


        }
    }
})();
