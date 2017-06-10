'use strict';

angular
.module('myApp').controller('ClientCtrl', function($rootScope) {
    var that = this;
    $rootScope.$watch('authorized', function (newVal,oldVal) {
        that.authorized = sessionStorage.getItem('login');
    });
});
