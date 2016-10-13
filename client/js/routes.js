function config($routeProvider, $locationProvider, $httpProvider) {
    $httpProvider.interceptors.push(function($q, $location) {
        return {
            response: function(response) {
                return response;
            },
            responseError: function(response) {
                if (response.status === 401) {
                    $location.url('/login');
                }
                return $q.reject(response);
            }
        };
    });

    var checkLoggedin = function($q, $http, $location) {
        // Initialize a new promise
        var deferred = $q.defer();
        $http.get('/loggedin').success(function(user) {
            // Authenticated
            console.log('user check', user);
            if (user !== false)
            deferred.resolve();

            // Not Authenticated
            else {
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            resolve: {
                loggedin: checkLoggedin
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
