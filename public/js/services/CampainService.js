angular.module('CampainService', [])

    // each function returns a promise object
    .factory('Campains', function($http) {
        return {
            get : function() {
                return $http.get('/app/campains'); // voir pour des regroupements et ensuite un lien pour lire
            },
            delete : function(id) {  // uniquement en admin pour faire du nettoyage suite à des bugs
                return $http.delete('/app/campains/' + id);
            }
        }
});