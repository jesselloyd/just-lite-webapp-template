function ApplicationController($http, $q) {
	var _this = this;

	// delete this in actual applications - test function for demo purposes
	_this.sendRequest = function() {
		$http.get('/test').then(function(res) {
			_this.testRequest = res.data;
		});
	};

	// delete this in actual applications - test function for demo purposes
	_this.requestService = function() {
		return $http.get('/test');
	};

	_this.modalShown = false;
	_this.toggleModal = function() {
		_this.modalShown = !_this.modalShown;
	};

	_this.errorModalShown = false;
	_this.toggleErrorModal = function() {
		_this.errorModalShown = !_this.errorModalShown;
	};

	_this.sendError = function() {
		return $q(function(resolve, reject) {
			var error = {
				message: "Error! You did something that won't work. Try again, or contact someone!"
			};
			reject(error);
		});
	};
}

angular.module('App')
.controller('ApplicationController', ['$http', '$q', ApplicationController]);
