cafeApp.factory('AccountService', function($resource) {
    var link = 'http://127.0.0.1:3333/account/';
    return $resource(link + ':email/:credits', {
        email: '@email',
        credits: '@credits'
    }, {
        query: {
            method: 'GET',
            transformResponse: function(responseData) {
                return angular.fromJson(responseData);
            }
        }
    })
});