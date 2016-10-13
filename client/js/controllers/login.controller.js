function LoginController($http) {
    var _this = this;

    // delete this in actual applications - test function for demo purposes
    _this.login = function() {
        $http.post('/login', {email: 'jesse', password: 'password'});
    };


    // delete this in actual applications - test function for demo purposes
    _this.logout = function() {
        $http.post('/logout');
    };

    // delete this in actual applications - test function for demo purposes
    _this.authenticatedRoute = function() {
        $http.get('/api/private').then(function(data) {
            console.log(data);
            _this.isThrough = 'true';
        }, function(data) {
            console.log('failed');
            _this.isThrough = 'false';
        });
    };

    // delete this in actual applications - test function for demo purposes
    _this.checkCsrfProtection = function() {
        $http.post('/postendpoint').then(function(res) {
            _this.isProtected = res.data;
        });
    };
}

angular.module('App')
.controller('LoginController', ['$http', LoginController]);
