// pas pertinent/erroné

angular.module('MainDirective', [])

    .directive('clickLink', ['$location', function($location) {
        
        return {
            link : function(scope, element, attrs) {
                element.on('click', function(){
                    scope.$apply(function() {
                        $location.path(attrs.clickLink);
                    })
                })
            }
        }
        
    }]);