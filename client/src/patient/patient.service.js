(function() {
    "use strict";

    angular.module('app.patient')
        .service('PatientService', PatientService);

    function PatientService(Rest, $state, store) {
        var patient = Rest.all("patients");

        function getTypeMethodsList(ext) {

            return patient.customGET('?filter[where][examTypeId]=' + ext);
        }

        return {
            examPatientList: Rest.all("patients").getList(),
            getTypeMethodsList: getTypeMethodsList,
            addNewPatient: function(ptnt) {
                return patient.post(ptnt).then(function(response) {
                    //examMethod.getList().push(response);
                    // console.log(response);
                    //$state.go('dashboard');


                }, function(error) {
                    console.log(error);
                });
            },
            addPatientAndExams: function(ptnt) {
                console.log(ptnt);
                return patient.customPOST("", "new", ptnt).then(function(response) {
                    //examMethod.getList().push(response);
                    console.log(response);
                    $state.go('app.dashboard.main');
                    store.remove('examsList');

                }, function(error) {
                    console.log(error);
                });
            }

        }
    }
})();
