describe('application-controller', function() {
	beforEach(module('App'));

	var $controller;

	beforeEach(inject(function(_$controller_) {
		$controller = _$controller_;
	}));
});