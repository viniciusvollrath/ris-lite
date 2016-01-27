(function() {
    "use strict";

    angular.module('app.exam-method')
        .service('ExamMethodService', ExamMethodService);

    function ExamMethodService(Rest, $state) {
        var examMethod = Rest.all("examMethodes");

        function getTypeMethodsList(ext) {
            return examMethod.customGET('?filter[where][examTypeId]=' + ext);
        }

        return {
            examMethodList: Rest.all("examMethodes").getList(),
            getTypeMethodsList: getTypeMethodsList,
            addNewExamMethod: function(exm) {
                return examMethod.post(exm).then(function(response) {
                    //examMethod.getList().push(response);
                    // console.log(response);
                    $state.go('app.setting.exam-method');

                }, function(error) {
                    console.log(error);
                });
            }

        }
    }
})();
