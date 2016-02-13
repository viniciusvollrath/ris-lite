(function() {
    "use strict";

    angular.module('app.exam-type')
        .service('ExamTypeService', ExamTypeService);

    function ExamTypeService(Rest, $state) {
        var examType = Rest.all("examTypes");

        return {
            examTypeList: examTypeList,
            list: Rest.all("examTypes").getList(),
            examTypeListDetails: examTypeListDetails,
            count: count,
            addNewExamType: function(et) {
                return examType.post(et).then(function(response) {

                    $state.go('app.setting.exam-type');

                }, function(response) {
                    console.log("Error with status code", response.status);
                });
            }
        };

        function examTypeList() {
            return examType.getList().then(function(examTypes) {
                return examTypes;
            }, function(error) {

            });
        }

        function examTypeListDetails(query) {
            if (query != undefined) {
                //console.log(query);
                return examType.customGET('?filter[include]=equipmentType&filter[limit]=' + query.limit + '&filter[skip]=' + (query.limit * (query.page - 1)) + '&filter[order]=' + query.order + '&filter[where][name][options]=i&filter[where][name][like]=' + '.*' + query.filter + '.*').then(function(examTypes) {
                    return examTypes;
                }, function(error) {

                });
            } else {

                return examType.customGET('?filter[limit]=5').then(function(examTypes) {
                    return examTypes;
                }, function(error) {

                });
            }
        }

        function count() {
            return examType.customGET('count').then(function(examType) {
                return examType.count;
            }, function(error) {

            });
        }
    }
})();
