cafeApp.factory('AccountService', function($rootScope, $resource) {
    return $resource($rootScope.appUrl + 'account/:email/:name', {
        email: '@email',
        name: '@name',
        credits: '@credits'
    }, {
        query: {
            method: 'GET',
            isArray:false,
            transformResponse: function(responseData) {
                return angular.fromJson(responseData);
            }
        },
        update: {
            method: 'PUT',
            transformResponse: function(responseData) {
                return angular.fromJson(responseData);
            }
        }
    })
});