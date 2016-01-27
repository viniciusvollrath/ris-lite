(function() {
    "use strict";

    angular.module('app.appointment')
        .service('AppointmentService', AppointmentService);

    function AppointmentService(Rest) {
        var appointment = Rest.all("appointments");



        return {
            appointmentList: Rest.all("appointments").getList(),
            addNewAppointment: function(appt) {
                return appointment.post(appt).then(function(response) {

                }, function(error) {
                    console.log(error);

                });
            }



        }
    }

})();
