angular
.module('myApp')
.factory('MenuService', function($resource) {
    var link = './menu.json';
    return $resource(link, {
        query: {
            method: 'GET',
            isArray: true,
            transformResponse: function(responseData) {
                //console.log(responseData)
                return angular.fromJson(responseData);
            }
        }
    })
});
