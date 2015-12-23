angular.module('ClientController', [])

    .controller('ClientController', function($scope, $http, Clients) {
        $scope.formData = {};
    
        Clients.get()
            .success(function(data) {
                $scope.clients = data;
            });

        $scope.createClient = function() {
            if(!$.isEmptyObject($scope.formData)){
                Clients.create($scope.formData)
                    .success(function(data){
                        $scope.formData = {};
                        $scope.clients = data;
                });
            };
        };

        $scope.deleteClient = function(id) {
           Clients.delete(id)
                .success(function(data) {
                    $scope.clients = data;
                });
        };
    });