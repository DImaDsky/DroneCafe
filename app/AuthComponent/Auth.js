'use strict';

angular.module('myApp').component('authComponent', {
    controller: function ($rootScope, AccountService) {
        this.auth = function () {
            var accountPromise = AccountService.query({email:this.email, name: this.name});
            accountPromise.$promise.then(function (data) {

                sessionStorage.setItem('name', this.name);
                sessionStorage.setItem('email', this.email);
                sessionStorage.setItem('credits', data.credits);
                $rootScope.authorized = !!this.email;
            }.bind(this));
        };
    },
    templateUrl: './AuthComponent/Auth.html'
});