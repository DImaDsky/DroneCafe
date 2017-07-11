cafeApp.factory('OrderService', function($rootScope, $resource) {
    return $resource('/order/:email', {
        email: '@email'
    }, {
        query: {
            method: 'GET',
            isArray: true,
            transformResponse: function(responseData) {
                return angular.fromJson(responseData);
            }
        }
    })
});