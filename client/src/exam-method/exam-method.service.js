(function() {
    "use strict";

    angular.module('app.exam-method')
        .service('ExamMethodService', ExamMethodService);

    function ExamMethodService(Rest, $state) {
        var examMethod = Rest.all("examMethods");


        return {
            count: count,
            examMethodList: Rest.all("examMethods").getList(),
            getTypeMethodsList: getTypeMethodsList,
            examMethodListDetails: examMethodListDetails,
            addNewExamMethod: addNewExamMethod
        };

        function addNewExamMethod(exm) {
            return examMethod.post(exm).then(function(response) {
                //examMethod.getList().push(response);
                // console.log(response);
                $state.go('app.setting.exam-method');

            }, function(error) {
                console.log(error);
            });
        }

        function getTypeMethodsList(ext) {
            return examMethod.customGET('?filter[where][examTypeId]=' + ext);
        }

        function examMethodListDetails(query) {
            if (query != undefined) {
                if (query.examTypeId != '') {
                    console.log(query);
                    return examMethod.customGET('?filter[where][examTypeId]=' + query.examTypeId + '&filter[include][examType]=equipmentType&filter[limit]=' + query.limit + '&filter[skip]=' + (query.limit * (query.page - 1)) + '&filter[order]=' + query.order + '&filter[where][name][options]=i&filter[where][name][like]=' + '.*' + query.filter + '.*').then(function(examMethods) {
                        return examMethods;
                    }, function(error) {

                    });
                } else {
                    return examMethod.customGET('?filter[include][examType]=equipmentType&filter[limit]=' + query.limit + '&filter[skip]=' + (query.limit * (query.page - 1)) + '&filter[order]=' + query.order + '&filter[where][name][options]=i&filter[where][name][like]=' + '.*' + query.filter + '.*').then(function(examMethods) {
                        return examMethods;
                    }, function(error) {

                    });
                }

            } else {

                return examMethod.customGET('?filter[limit]=5').then(function(examMethods) {
                    return examMethods;
                }, function(error) {

                });
            }
        }

        function count() {
            return examMethod.customGET('count').then(function(examMethod) {
                return examMethod.count;
            }, function(error) {

            });
        }
    }
})();
