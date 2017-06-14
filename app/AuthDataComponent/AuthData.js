'use strict';

angular.module('myApp').component('authDataComponent', {

    controller: function ($rootScope, AccountService) {

        this.login = $rootScope.login;
        this.email = $rootScope.email;
        this.credits = $rootScope.credits;

        this.logout = function () {
            sessionStorage.clear();
            $rootScope.authorized = false;
        };
        this.topUp = function () {
            AccountService.query({email: this.email, credits: 100});
        };
    },
    templateUrl: './AuthDataComponent/AuthData.html'
});