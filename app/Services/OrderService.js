cafeApp.factory('OrderService', function($resource) {
    var link = 'http://127.0.0.1:3333/order/';
    return $resource(link + ':email', {
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