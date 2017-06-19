'use strict';

angular.module('myApp').component('authDataComponent', {

    controller: function ($rootScope, AccountService) {
        var that = this;

        this.name = $rootScope.name;
        this.email = $rootScope.email;
        this.credits = $rootScope.credits;

        this.logout = function () {
            sessionStorage.clear();
            $rootScope.authorized = false;
        };
        this.topUp = function () {
            var topUpOn = 100;
            AccountService.update({email: this.email, credits: topUpOn}).$promise.then(function () {
                that.credits = + that.credits + topUpOn;
            });
        };
    },
    templateUrl: './app/AuthDataComponent/AuthData.html'
});