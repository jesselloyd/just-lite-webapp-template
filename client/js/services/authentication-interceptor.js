function AuthenticationInterceptor($window) {
    return {
        request: function(config) {
            var token = $window.localStorage['token'];
            if (token) {
                config.headers['x-access-token'] = token;
            }
            return config;
        }
    };
}

angular.module('App').factory('AuthenticationInterceptor', ['$window', AuthenticationInterceptor]);
angular.module('App').config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('AuthenticationInterceptor');
}]);
