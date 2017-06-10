'use strict';

angular.module('myApp').component('authDataComponent', {

    controller: function ($rootScope) {
        this.login = sessionStorage.getItem('login');
        this.email = sessionStorage.getItem('email');

        this.logout = function () {
            sessionStorage.clear();
            $rootScope.authorized = false;
        };
        this.topUp = function () {

        };
    },
    templateUrl: './AuthDataComponent/AuthData.html'
});