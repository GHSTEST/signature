angular.module('CampainController', [])

    .controller('CampainController', function($scope, $http, Campains) {
        $scope.formData = {};
    
        Campains.get()
            .success(function(data) {
                $scope.campains = data;
            });

        $scope.createCampain = function() {
            if(!$.isEmptyObject($scope.formData)){
                Campains.create($scope.formData)
                    .success(function(data){
                        $scope.formData = {};
                        $scope.campains = data;
                });
            };
        };
    });