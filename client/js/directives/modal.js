function Modal($q, $timeout) {
    return {
        restrict: 'EA',
        templateUrl: 'views/templates/modal.html',
        scope: {
            title: '@',
            action: '&',
            actionText: '@',
            show: "="
        },
        transclude: true,
        link: function(scope, elem, attrs) {
            function init() {
                scope.clearBindings = function() {};
                scope.error = false;
                scope.fadeIn = true;
                $timeout(function() {
                    scope.fadeIn = false;
                }, 100);
            }

            init();

            scope.close = function() {
                return $q(function(resolve, reject) {
                    scope.clearBindings();
                    scope.error = false;
                    scope.fadeOut = true;
                    $timeout(function() {
                        scope.show = false;
                        scope.fadeOut = false;
                    }, 100);
                });
            };

            scope.submit = function() {
                scope.error = false;
                scope.errorMessage = null;
                if (typeof scope.action === 'function' && 'action' in attrs) {
                    var promise = scope.action();
                    if (promise && typeof promise.then === 'function') {
                        promise.then(function(res) {
                            if (res.clearBindings) {
                                scope.clearBindings = res.clearBindings;
                            }
                            scope.close();
                        }, function(err) {
                            if (err.clearBindings) {
                                scope.clearBindings = res.clearBindings;
                            }                         
                            scope.errorFlash = true;
                            $timeout(function() {
                                scope.errorFlash = false;
                                scope.error = true;
                                scope.errorMessage = err.message;
                            }, 200);
                        });
                    } else {
                        scope.close();
                    }
                } else {
                    scope.close();
                }
            };
        }
    };
}

angular.module('App')
    .directive('modal', ['$q', '$timeout', Modal]);
