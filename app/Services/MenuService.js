cafeApp.factory('MenuService', function($resource) {
    return $resource('./menu.json', {
        query: {
            method: 'GET',
            isArray: true,
            transformResponse: function(responseData) {
                return angular.fromJson(responseData);
            }
        }
    })
});
