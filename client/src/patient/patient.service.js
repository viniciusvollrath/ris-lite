(function() {
    "use strict";

    angular.module('app.patient')
        .service('PatientService', PatientService);

    function PatientService(Rest, $state, store) {
        var patient = Rest.all("patients");


        return {

            patientList: patientList,
            findPatient: findPatient,
            addNewPatient: addNewPatient,
            addPatientAndExams: addPatientAndExams,
            getPatientHistory: getPatientHistory

        };

        function findPatient(text) {
            return patient.customGET('?filter[where][firstName][like]=' + text).then(function(response) {

                return response;

            }, function(error) {
                console.log(error);
                return error;
            });
        }

        function addNewPatient(ptnt) {
            return patient.post(ptnt).then(function(response) {


            }, function(error) {
                console.log(error);
            });
        }

        function addPatientAndExams(ptnt) {
            console.log(ptnt);
            return patient.customPOST("", "new", ptnt).then(function(response) {
                //examMethod.getList().push(response);
                console.log(response);
                $state.go('app.exam');
                store.remove('examsList');

            }, function(error) {
                console.log(error);
            });
        }

        function patientList() {
            return patient.getList().then(function(response) {
                return response;

            }, function(error) {
                console.log(error);
                return error;
            });
        }

        function getPatientHistory(id) {
            var patient = Rest.one("patients", id).all("exams");
            return patient.customGET('?filter[include][examType]=equipmentType')
                .then(function(response) {
                    return response.plain();
                }, function(error) {
                    return error;
                })
        }
    }
})();
