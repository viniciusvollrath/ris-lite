(function() {
    "use strict";

    angular.module('app', [
        'ui.router',
        'ngMaterial',
        'ngMessages',
        'ngAnimate',
        'ngSanitize',
        'restangular',
        'angular-loading-bar',
        'angular-storage',
        'md.data.table',
        'cfp.loadingBar',
        'ncy-angular-breadcrumb',
        'ui.select',
        'angularTrix',
        'materialCalendar',
        'angularAudioRecorder',
        'app.layout',
        'app.auth',
        'app.welcome',
        'app.admin',
        'app.dash',
        'app.equipment',
        'app.exam-type',
        'app.exam',
        'app.patient',
        'app.appointment',
        'app.doctor',
        'app.reporting',
        'app.room',
        'app.setting'


    ]);
})();
