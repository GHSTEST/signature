// scope global, routeur sauvegarder un scope

angular.module('UserController', [])

    .controller('UserController', function($scope, $http, Users) {
        $scope.formData = {};
        console.log("controler");
    
        //$scope.users undefined @ the controller's start

        Users.get()
            .success(function(data) {
                $scope.users = data;
            });

        $scope.createUser = function() {
            $('#myModal').modal('hide');
            console.log("create");
            
            if(!$.isEmptyObject($scope.formData)){
                console.log("create 2");
                Users.create($scope.formData)
                    .success(function(data){
                        $scope.formData = {};
                        $scope.users = data;
                });
            };
        };

        $scope.deleteUser = function(user, event) {
            
            // faire un stop propagation ??
            event.stopPropagation();
            
           Users.delete(user._id)
                .success(function(data) {
                    $scope.users = data;
                });
        };
    
        $scope.updateUser = function(user) {
                $scope.formData = user;
                $('#myModal').modal('show');
        }
        
        
    });