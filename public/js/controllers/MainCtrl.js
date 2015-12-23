angular.module('MainController', [])
    .controller('MainController', function($scope, $location) {
    
        $scope.go = function( path) {
            $location.path( path );
        }
        
        $scope.menu = 'users';
    
        
        
    })