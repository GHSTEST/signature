angular.module('ClientService', [])

    // each function returns a promise object
    .factory('Clients', function($http) {
        return {
            get : function() {
                return $http.get('/app/clients');
            },
            create : function(todoData) {
                return $http.post('/app/clients', todoData);
            },
            delete : function(id) {
                return $http.delete('/app/clients/' + id);
            }
        }
});