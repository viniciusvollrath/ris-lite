/**
 * Configuration for the  module app.user
 * Description:
 * 
 */
angular
    .module('app.user')
    .config(configure);

configure.$inject = ['$stateProvider', 'USER_ROLES'];

function configure($stateProvider, USER_ROLES) {
    $stateProvider.state('app.user', {
        url: '/user',
        views: {
            'main@app': {
                templateUrl: 'src/user/views/user.main.view.html',
                controller: 'UserMainController',
                controllerAs: 'userVm'

            }
        },
        data: {
            authorizedRoles: [USER_ROLES.admin]
        },
        ncyBreadcrumb: {
            label: 'Users'
        }
    })
}
