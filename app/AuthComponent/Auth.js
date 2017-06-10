'use strict';

angular.module('myApp').component('authComponent', {
    controller: function ($rootScope) {
        this.auth = function () {
            sessionStorage.setItem('login', this.login);
            sessionStorage.setItem('email', this.email);
            $rootScope.authorized = this.login;
        };
    },
    templateUrl: './AuthComponent/Auth.html'
});