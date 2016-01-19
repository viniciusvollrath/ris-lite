(function() {
    "use strict";

    angular.module('app.exam-type')
        .service('ExamTypeService', ExamTypeService);

    function ExamTypeService(Rest, $state) {
        var examType = Rest.all("examTypes");

        return {
            examTypeList: Rest.all("equipmentTypes").getList(),
            addNewExamType: function(et) {
                    return examType.post(et).then(function(response) {
                        examType.getList().push(response);
                        console.log(response);
                        $state.go('dashboard.admin.exam-type');

                    }, function(response) {
                        console.log("Error with status code", response.status);
                    });
                }
                // ,
                // equipmentList: Rest.all("equipment").getList(),
                // addNewEquipment: function(eq) {
                //     return equipment.post(eq).then(function(response) {
                //         equipment.getList().push(response);
                //         console.log(response);
                //         $state.go('dashboard.admin.equipment');

            //     }, function(response) {
            //         console.log("Error with status code", response.status);
            //     });
            // }

        }
    }
})();
