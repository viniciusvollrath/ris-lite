angular.module('app.reporting')
    .service('ReportingService', ReportingService);

function ReportingService(Rest, $state) {
    var reporting = Rest.all("reporting");



    return {
        reportingList: Rest.all("reporting").getList(),
        addNewReport: function(rpt) {
            return reporting.post(rpt).then(function(response) {



            }, function(error) {
                console.log(error);

            });
        }



    }
}
