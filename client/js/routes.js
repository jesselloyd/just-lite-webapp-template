function config($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            resolve: {

            }
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            resolve: {
                
            }
        })
        .otherwise({
            redirectTo: '/'
        });

    // use the HTML5 History API
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}

angular.module('App')
.config(config);
