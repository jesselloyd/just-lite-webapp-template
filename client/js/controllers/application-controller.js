function ApplicationController($http) {
	var _this = this; 

	_this.sendRequest = function() {
		$http.get('/test').then(function(res) {
			_this.isSuccessfulRequest = res.data;
		});
	}
}

angular.module('App')
.controller('ApplicationController', ['$http', ApplicationController]);