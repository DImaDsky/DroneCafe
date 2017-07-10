cafeApp.factory('AccountService', function($resource) {
    var link = 'http://127.0.0.1:5000/account/';
    return $resource(link + ':email/:name', {
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