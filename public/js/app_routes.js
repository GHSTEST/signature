angular.module('appRoutes', [])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        //  will use the ClientController
        .when('/user', {
            templateUrl: 'views/user.html', 
            controller: 'UserController'
        })

        //  will use the ClientController
        .when('/client', {
            templateUrl: 'views/client.html',
            controller: 'ClientController'
        })
        //  will use the CampainController
        .when('/campain', {
            templateUrl: 'views/campain.html',
            controller: 'CampainController'
        })
        .otherwise({
            templateUrl: 'views/user.html', 
            controller: 'UserController'
        });

        // mauvais car surcharge les href
 //   $locationProvider.html5Mode({
   //   enabled: true,
     // requireBase: false
    //});

  
}]);