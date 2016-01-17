(function() {
    "use strict";

    angular.module('app.auth')

    .constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    })

    .constant('USER_ROLES', {
        all: '*',
        admin: 'admin',
        doctor: 'doctor',
        assistant: 'assistant',
        technicien: 'technicien'
    });


})();
